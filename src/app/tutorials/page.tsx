import React from 'react';
import Link from 'next/link';

const TutorialsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
      <p className="text-lg mb-6">
        Simplify complex data relationships for database analysts with ease. Explore our tutorials to get started.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Tutorials</h2>
      <ul className="list-disc ml-5">
        <li>
          <Link href="/tutorials/creating-relationships" className="text-blue-600 hover:underline">
            Creating Relationships Between Tables
          </Link>
        </li>
        <li>
          <Link href="/tutorials/drag-drop-functionality" className="text-blue-600 hover:underline">
            Using Drag-and-Drop to Rearrange Views
          </Link>
        </li>
        <li>
          <Link href="/tutorials/automated-tutorials" className="text-blue-600 hover:underline">
            Automated Tutorials for Setup
          </Link>
        </li>
        <li>
          <Link href="/tutorials/exporting-data" className="text-blue-600 hover:underline">
            Exporting Data Views in Various Formats
          </Link>
        </li>
        <li>
          <Link href="/tutorials/basic-reporting" className="text-blue-600 hover:underline">
            Basic Reporting Tools for Analyzing Data Relationships
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Getting Started</h3>
        <p className="mt-2">
          Check out our comprehensive documentation for step-by-step guides to help you make the most of TableLinker.
        </p>
        <Link href="/docs" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
          View Documentation
        </Link>
      </div>
    </div>
  );
};

export default TutorialsPage;