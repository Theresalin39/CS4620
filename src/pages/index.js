import Image from 'next/image'
import { Inter } from 'next/font/google'
import classList from "../components/CoursesList";
import CoursesList from '../components/CoursesList';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <CoursesList /> 
    </main>
  )
}
