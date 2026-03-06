import { Metadata } from 'next';
import { Soban } from 'soban';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TableLinker',
  description: 'Simplify complex data relationships for database analysts with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <header className="py-4 px-6 bg-white shadow">
          <h1 className="text-2xl font-bold">Effortlessly Manage Multi-Table Relationships with TableLinker</h1>
          <p className="text-gray-600 mt-1">Simplify complex data relationships for database analysts with ease.</p>
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <footer className="py-4 px-6 bg-white shadow mt-6">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} TableLinker. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}