import React from 'react';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const Header = () => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    // Optionally, add any post-sign-out logic here
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
                Courses
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/savedcourses">
                    Saved Courses
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/">
                  <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Sign In
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;