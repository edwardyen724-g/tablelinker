import React from 'react';

const TutorialsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
      <p className="mb-4">
        Simplify complex data relationships for database analysts with ease. Our tutorials guide you in mastering TableLinker.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Tutorials</h2>
      <ul className="list-disc pl-5">
        <li>
          <a href="#creating-relationships" className="text-blue-500 hover:underline">
            Creating Relationships Between Tables
          </a>
        </li>
        <li>
          <a href="#drag-and-drop" className="text-blue-500 hover:underline">
            Utilizing Drag-and-Drop Functionality
          </a>
        </li>
        <li>
          <a href="#automated-tutorials" className="text-blue-500 hover:underline">
            Automated Tutorials for Quick Setup
          </a>
        </li>
        <li>
          <a href="#exporting-data" className="text-blue-500 hover:underline">
            Exporting Data Views in Various Formats
          </a>
        </li>
        <li>
          <a href="#reporting-tools" className="text-blue-500 hover:underline">
            Basic Reporting Tools to Analyze Relationships
          </a>
        </li>
      </ul>

      <div id="creating-relationships" className="mt-10">
        <h3 className="text-xl font-semibold">Creating Relationships Between Tables</h3>
        <p>
          Learn how to visualize and establish relationships between your data tables using our intuitive interface.
        </p>
      </div>

      <div id="drag-and-drop" className="mt-10">
        <h3 className="text-xl font-semibold">Utilizing Drag-and-Drop Functionality</h3>
        <p>
          Discover how to rearrange your data views easily for better analysis and presentation.
        </p>
      </div>

      <div id="automated-tutorials" className="mt-10">
        <h3 className="text-xl font-semibold">Automated Tutorials for Quick Setup</h3>
        <p>
          Get started quickly with guided workflows and automated tutorials that walk you through the setup process.
        </p>
      </div>

      <div id="exporting-data" className="mt-10">
        <h3 className="text-xl font-semibold">Exporting Data Views in Various Formats</h3>
        <p>
          Learn to export your data views seamlessly in formats like CSV and JSON for external use or sharing.
        </p>
      </div>

      <div id="reporting-tools" className="mt-10">
        <h3 className="text-xl font-semibold">Basic Reporting Tools to Analyze Relationships</h3>
        <p>
          Understand the tools available for analyzing your data relationships and generating insightful reports.
        </p>
      </div>
    </div>
  );
};

export default TutorialsPage;