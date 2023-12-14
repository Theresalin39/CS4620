import '../styles/globals.css';
import supabase from '../lib/supabase'; 
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { SearchProvider } from '../context/SearchContext'; 

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <SearchProvider> 
        <Component {...pageProps} />
      </SearchProvider>
    </SessionContextProvider>
  );
}
