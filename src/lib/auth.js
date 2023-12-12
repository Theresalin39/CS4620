import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase'; // Adjust the import path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Asynchronously check and set the current session
        const checkSession = async () => {
            if (supabase) {
                try {
                    const { data, error } = await supabase.auth.getSession();
                    if (error) {
                        console.error('Error getting session:', error);
                        return;
                    }
                    setUser(data?.session?.user || null);
                } catch (error) {
                    console.error('Error in getSession:', error);
                }
            }
        };

        checkSession();

        // Set up a listener for auth state changes, if supabase is available
        let authListener = null;
        if (supabase) {
            authListener = supabase.auth.onAuthStateChange((event, session) => {
                setUser(session?.user || null);
            });
        }

        // Clean up the listener when the component unmounts
        return () => {
            if (authListener) {
                authListener.unsubscribe();
            }
        };
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Sign-in function
export const signIn = async (email, password) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
};

// Sign-up function
export const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return user;
};

// Sign-out function
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

// Reset password function
export const resetPasswordForEmail = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
};
