import '../styles/globals.css';
import supabase from '../lib/supabase'; 
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
