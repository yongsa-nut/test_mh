import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monster Hunter Data Viewer',
  description: 'View Monster Hunter game data including skills and i-frame data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-mh-background text-mh-text min-h-screen">
        <header className="bg-mh-primary text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Monster Hunter Data Viewer</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-mh-primary text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} Monster Hunter Data Viewer</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 