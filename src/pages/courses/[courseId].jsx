import supabase from '../../lib/supabase';
import Layout from '@/components/Layout';
import Image from 'next/image';

export async function getServerSideProps(context) {
  const { courseId } = context.params;

  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      title,
      description,
      price,
      thumbnail_url,
      category:category_id (name),
      instructor:instructor_id (name)
    `)
    .eq('id', courseId)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return { props: { course: null } };
  }

  return { props: { course } };
}

const CourseDetailPage = ({ course }) => {
  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-xl">Course not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">

          <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
          <p className="mb-4">{course.description}</p>
          <p className="font-bold">Price: ${course.price}</p>
          <p>Category: {course.category?.name}</p>
          <p>Instructor: {course.instructor?.name}</p>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailPage;
