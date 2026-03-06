import React from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';
import 'tailwindcss/tailwind.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface FormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw new Error(error.message);
      
      alert('Sign up successful! Check your email for verification.');
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
      <p className="text-lg mb-6">Simplify complex data relationships for database analysts with ease.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Features:</h2>
        <ul className="list-disc list-inside">
          <li>Visual interface for creating relationships between multiple tables</li>
          <li>Drag-and-drop functionality for rearranging data views</li>
          <li>Automated tutorials and guided workflows for setup</li>
          <li>Exportable data views in various formats (CSV, JSON)</li>
          <li>Basic reporting tools to analyze data relationships</li>
        </ul>
      </div>
    </div>
  );
};

export default Page;