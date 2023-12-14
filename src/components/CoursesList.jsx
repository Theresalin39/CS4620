
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase'; 

const CoursesList = () => {
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
        <div>
            {courses.length === 0 ? (
                <div>No courses available.</div>
            ) : (
                courses.map(course => (
                    <div key={course.id} className="course">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Price: ${course.price}</p>
                        {course.thumbnail_url && <img src={course.thumbnail_url} alt={course.title} />}
                        {/* add more course details */}
                    </div>
                ))
            )}
        </div>
    );
};

export default CoursesList;
