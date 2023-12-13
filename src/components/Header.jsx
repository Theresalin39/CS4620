import React from 'react';
import Link from 'next/link';
import { useSession } from '@supabase/auth-helpers-react';

const Header = () => {
  const session = useSession();

  const handleSignOut = async (supabaseClient) => {
    await supabaseClient.auth.signOut();
    // Handle post-sign-out logic here, like redirecting to the home page
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
            <li>
              <Link href="/categories">
                Categories
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/account">
                    Saved Courses
                  </Link>
                </li>
                <li>
                  <Link href="/account">
                    Account
                  </Link>
                </li>
                <li>
                  <button onClick={() => handleSignOut(useSupabaseClient())} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/signin">
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    Sign In
                  
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
