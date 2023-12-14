import supabase from '../../lib/supabase';
import Layout from '@/components/Layout';

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
    return <div>Course not found</div>;
  }

  return (
    <Layout>
        <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>Price: {course.price}</p>
        <p>Category: {course.category?.name}</p>
        <p>Instructor: {course.instructor?.name}</p>
        {/* Render thumbnail or other details as needed */}
        </div>
    </Layout>
  );
};

export default CourseDetailPage;
