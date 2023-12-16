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
      duration,
      level,
      category:category_id (name),
      instructor:instructor_id (name, email)
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
          <div className="text-center text-xl text-gray-800">Course not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 md:p-10 text-gray-800">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
            <p className="mb-4">{course.description}</p>
            
            <div className="bg-stone-100 p-4 rounded-lg">
              <p className="font-semibold text-lg">Course Details:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Price: <span className="font-bold">${course.price}</span></li>
                <li>Times: <span className="font-bold">{course.duration}</span></li>
                <li>Level: <span className="font-bold">{course.level}</span></li>
                <li>Subject: <span className="font-bold">{course.category?.name}</span></li>
                <li>Instructor: <span className="font-bold">{course.instructor?.name}</span></li>
                <li>Email: <span className="font-bold">{course.instructor?.email}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default CourseDetailPage;