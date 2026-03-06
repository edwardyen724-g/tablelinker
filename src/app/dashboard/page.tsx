import React from 'react';
import { useSession } from '@supabase/supabase-auth-helpers/react';
import { supabase } from '../../lib/supabaseClient';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const { session, error } = useSession();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('data_relationships')
        .insert(data);

      if (error) throw error;
      alert('Data relationship created successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  if (error) {
    return <div>Error loading dashboard: {error.message}</div>;
  }

  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <Link href="/login">Login to access your dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Create New Data Relationship</h2>
        <input {...register('source_table')} placeholder="Source Table" className="border p-2 mb-4 w-full" required />
        <input {...register('target_table')} placeholder="Target Table" className="border p-2 mb-4 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Relationship</button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl">Your Existing Relationships</h2>
        {/* Future implementation to list existing relationships goes here */}
      </div>
    </div>
  );
};

export default DashboardPage;