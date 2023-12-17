import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase'; 
import CourseCard from '../components/CourseDisplayCard';
import Layout from '../components/Layout';
import PageLayout from '@/components/PageLayout';

const SavedCoursesPage = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchSavedCourses = async () => {
            setLoading(true);
    
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
    
            if (user) {
                const { data, error } = await supabase
                    .from('saved_courses')
                    .select(`
                        courses (
                            id,
                            title,
                            description,
                            price
                        )
                    `)
                    .eq('user_id', user.id);
    
                if (error) {
                    console.error('Error fetching saved courses:', error);
                } else {
                    setSavedCourses(data.map(item => item.courses)); 
                }
            } else {
                console.error('User is not logged in');
            }
    
            setLoading(false);
        };
    
        fetchSavedCourses();
    }, []);

    if (loading) {
        return <Layout><div>Loading...</div></Layout>;
    }

    return (
        <Layout>
            <PageLayout title="Saved Courses"/>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default SavedCoursesPage;