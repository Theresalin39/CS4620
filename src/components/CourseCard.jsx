import React from 'react';

const CourseCard = ({ course }) => {
    //random color for the course title on the thumbnail
    const colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="bg-black text-white rounded-lg p-6 flex items-center justify-center">
                <h2 className={`text-2xl font-bold ${randomColor}`}>{course.title}</h2>
            </div>
            <div className="mt-4">
                <p className="text-lg">{course.description}</p>
                <p className="mt-2 font-semibold">Price: ${course.price}</p>
            </div>
        </div>
    );
};

export default CourseCard;
