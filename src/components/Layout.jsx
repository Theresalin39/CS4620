import React from 'react';  
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'


const Layout = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className='flex flex-col min-h-screen'>
      <nav className='bg-gray-800'></nav>
      
      {!session ? (
        <Auth
          supabaseClient = {supabase}
          appearance = {{ theme: ThemeSupa}}
          theme = "dark"
          />
      ) : (
        <main className='flex-grow'>{children}</main>
      )}
    </div>
  );
};

export default Layout;