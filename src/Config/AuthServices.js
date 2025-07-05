import supabase from './SupabaseClient';

// 🔐 Sign up with email and password
export const signUpWithEmailPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};

// 🔐 Sign in with email and password
export const signInWithEmailPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};

// 🚪 Sign out the current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

// In AuthServices.js

export const updateUserProfile = async (metadata) => {
  const { data, error } = await supabase.auth.updateUser({ data: metadata });
  if (error) throw error;
  return data;
};
