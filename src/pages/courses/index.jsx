import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase'; 
import CourseCard from '../../components/CourseCard';
import Layout from '../../components/Layout';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase
                .from('courses')
                .select('*');

            if (error) {
                console.error('Error fetching courses:', error);
                return;
            }

            setCourses(data);
            setLoading(false);
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div>Loading courses...</div>;
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CoursesPage;
