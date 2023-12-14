import React, { useState } from 'react';

const PageLayout = ({ title, showSearchBar, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        // Trigger the search when the user presses the Enter key
        onSearch(term);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            {showSearchBar && (
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        className="w-2/5 px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            )}
            <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
        </div>
    );
};

export default PageLayout;
