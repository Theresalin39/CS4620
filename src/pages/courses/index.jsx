import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase'; 
import CourseCard from '../../components/CourseCard';
import Layout from '../../components/Layout';
import PageLayout from '@/components/PageLayout';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        // Update the searchTerm state to trigger the useEffect below
        setSearchTerm(term);
      };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      let query = supabase
        .from('courses')
        .select('*');

      // If there is a search term, modify the query to include the filter
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

    // Call the function to fetch courses
    fetchCourses();
  }, [searchTerm]);  // Dependency array includes searchTerm to refetch when it changes

    if (loading) {
        return <Layout><div>Loading courses...</div></Layout>;
    }

    return (
        <Layout>
            <PageLayout title="All Courses" showSearchBar onSearch={handleSearch} />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CoursesPage;
