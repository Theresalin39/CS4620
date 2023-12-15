import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; 
import backgroundImg from '../../public/bgimage.jpeg'; 

export default function Home() {
  const router = useRouter();

  const navigateToCourses = () => {
    router.push('/courses'); 
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* background image */}
        <Image
          src={backgroundImg}
          alt="Education Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-4">
          <div className="text-center text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to EDUFUN</h1>
            <p className="text-xl mb-6">Explore learning with our online courses. Expand your knowledge, discover new skills, and join a community committed to education.</p>
            <button
              onClick={navigateToCourses}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
