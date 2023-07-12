/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { type FormEvent } from 'react';
import {signIn} from 'next-auth/react';


export default function Register() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      }),
    });

    const data = await res.json();
    if (!data.user) return null;
    await signIn('credentials', { 
      email: data.user.email, 
      password: form.get('password'), 
      callbackUrl: '/homeTemp',
    });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor='email'>email:</label>

        <input type='text' id='email' name='email' required />

        <label htmlFor='password'>Password:</label>

        <input type='password' id='password' name='password' required />

        <button type='submit'>Submit</button>
      </form>
      <p>
        Already registered? <Link href='/login'>Login here</Link>
      </p>
    </div>
  );
}