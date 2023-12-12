import React, { useState } from 'react';
import { resetPasswordForEmail } from '../lib/auth';

export default function ForgotPassword() {
    // ...rest of your component setup

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPasswordForEmail(email);
            setSubmitted(true);
        } catch (error) {
            console.error('Error in password reset:', error);
        }
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
