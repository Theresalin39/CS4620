import React from 'react';
import Link from 'next/link';
import { signIn, signUp, useAuth } from '../lib/auth';

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    // Optionally, handle any post-logout logic like redirecting
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
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
            {user ? (
              <>
                <li>
                  <Link href="/account">
                    Account
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-red-500">Sign Out</button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/signin">
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
