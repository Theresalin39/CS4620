import React from 'react';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react'; 
import { ThemeSupa } from '@supabase/auth-ui-shared'; 
import { useSearch } from '../context/SearchContext';

const Header = () => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  const isUserLoggedIn = !!session;
  const { resetSearch } = useSearch();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500">EDUFUN</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses">
                <button onClick={resetSearch}>Courses</button>
              </Link>
            </li>
            {isUserLoggedIn ? (
              <>
                <li>
                  <Link href="/savedcourses">
                    Saved Courses
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Sign Out
                  </button>
                </li>
            </>
            ) : (
              <li>
                  <span className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Sign In
                  </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;