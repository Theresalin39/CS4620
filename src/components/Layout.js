import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/signin');
  };

  return (
    <div>
      {/* Navbar or Header */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-semibold">My App</span>
          {user ? (
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign Out
            </button>
          ) : (
            <button onClick={() => router.push('/signin')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-gray-200 text-center text-sm p-4 absolute bottom-0 w-full">
        © {new Date().getFullYear()} My App
      </footer>
    </div>
  );
};

export default Layout;
