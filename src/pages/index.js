import Image from 'next/image';
import { useState } from 'react';
import Layout from '../components/Layout'; // Assuming you have a Layout component with a header
import backgroundImg from '../../public/bgimage.jpeg'; // Replace with the path to your background image

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    // Implement your search logic here
    console.log("Searching for:", term);
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <Image
          src={backgroundImg}
          alt="Education Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />

        {/* Search Bar Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <div className="w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-t"
              placeholder="Search courses"
            />
            <button
              onClick={() => handleSearch(searchTerm)}
              className="w-full p-2 bg-blue-500 text-white rounded-b"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
