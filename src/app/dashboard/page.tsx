import React from 'react';
import { useSupabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { TableRelationship } from '../../components/TableRelationship';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { supabase } = useSupabase();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tablesData, error } = await supabase.from('tables').select('*');
        if (error) throw error;

        setData(tablesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
      <p className="mb-6">Simplify complex data relationships for database analysts with ease.</p>
      {data && <TableRelationship tables={data} />}
    </div>
  );
};

export default DashboardPage;