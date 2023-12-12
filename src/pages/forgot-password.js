import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      console.error('Error in password reset:', error);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return <div>Check your email for the password reset link.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
}
