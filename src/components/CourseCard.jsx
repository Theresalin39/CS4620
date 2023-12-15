import React from 'react';
import { useRouter } from 'next/router';

const CourseCard = ({ course, onSaveCourse }) => {
    const router = useRouter();

    const navigateToCourseDetail = () => {
        router.push(`/courses/${course.id}`);
    };

    return (
        <div 
          className="bg-stone-100 rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col justify-between"
          onClick={navigateToCourseDetail}
        >
            <div className="p-6">
                
                <h2 className="text-2xl font-bold mb-3 text-orange-600 font-inter">{course.title}</h2>

                <p className="text-lg text-gray-700 mb-4">{course.description}</p>

                <p className="font-semibold text-gray-800">Price: ${course.price}</p>
            </div>

            {onSaveCourse && (
                <div className="flex justify-end p-4">
                    <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveCourse(course);
                        }}
                        className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
