import React from 'react';  
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa,} from '@supabase/auth-ui-shared'
import Header from './Header';


const Layout = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className='flex flex-col min-h-screen'>
      <Header /> 
      {!session ? (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden px-4">
            <Auth
              supabaseClient = {supabase}
              appearance = {{ theme: ThemeSupa}}
              theme = "white"
              />
          </div>
        </div>
      ) : (
        <main className='flex-grow'>{children}</main>
      )}
    </div>
  );
};

export default Layout;