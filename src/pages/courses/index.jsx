import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase'; 
import CourseCard from '../../components/CourseDisplayCard';
import Layout from '../../components/Layout';
import PageLayout from '@/components/PageLayout';
import { useSearch } from '../../context/SearchContext';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm, setSearchTerm } = useSearch();

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSaveCourse = async (course) => {
        console.log("Saving course:", course);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
    
        if (user) {
            const { data, error } = await supabase
                .from('saved_courses')
                .insert([{ user_id: user.id, course_id: course.id }]);
    
            if (error) {
                console.error('Error saving course:', error);
            } else {
            }
        } else {
            
        }
    };
    

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);

            let query = supabase
                .from('courses')
                .select('*');

            if (searchTerm) {
                query = query
                    .ilike('title', `%${searchTerm}%`)
                    .or(`description.ilike.%${searchTerm}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching courses:', error);
            } else {
                setCourses(data);
            }

            setLoading(false);
        };

        fetchCourses();
    }, [searchTerm]);

    if (loading) {
        return <Layout><div>Loading courses...</div></Layout>;
    }

    return (
        <Layout>
            <PageLayout title="All Courses" showSearchBar onSearch={handleSearch} />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard 
                            key={course.id} 
                            course={course} 
                            onSaveCourse={handleSaveCourse} 
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CoursesPage;