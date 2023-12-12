import { supabase } from '../lib/supabase';

export const signUp = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return { user, session };
};

export const signIn = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return { user, session };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
