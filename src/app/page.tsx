import Image from 'next/image';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const LandingPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('features').select('*');
        if (error) throw error;
        console.log(data);
      } catch (error) {
        console.error(err instanceof Error ? err.message : String(err));
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Effortlessly Manage Multi-Table Relationships with TableLinker
      </h1>
      <p className="text-lg mb-6">
        Simplify complex data relationships for database analysts with ease.
      </p>
      <div className="flex flex-col items-center mb-10">
        <Image src="/images/tablelinker.png" alt="TableLinker Interface" width={600} height={400} />
        <p className="mt-2 text-sm text-gray-500">
          Visual interface for creating relationships between multiple tables
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="font-semibold">Drag-and-Drop Functionality</h2>
          <p>Rearrange data views intuitively.</p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="font-semibold">Automated Tutorials</h2>
          <p>Guided workflows for easy setup.</p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="font-semibold">Exportable Data Views</h2>
          <p>Available in CSV, JSON formats.</p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="font-semibold">Basic Reporting Tools</h2>
          <p>Analyze data relationships efficiently.</p>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;