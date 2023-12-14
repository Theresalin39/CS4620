import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: () => {},
    resetSearch: () => {}
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const resetSearch = () => setSearchTerm('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, resetSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
