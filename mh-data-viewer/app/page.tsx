import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">
        Monster Hunter Data Viewer
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Link href="/normal-skills" className="block">
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Normal Skills</h2>
            <p className="text-gray-600 mb-4">
              Browse all normal skills (สกิลทั่วไป) and their effects at different levels.
            </p>
            <div className="bg-mh-secondary py-2 text-center text-white rounded-md">
              View Normal Skills
            </div>
          </div>
        </Link>
        
        <Link href="/set-skills" className="block">
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Set Skills</h2>
            <p className="text-gray-600 mb-4">
              Browse all set skills (สกิลชุดเซ็ท) and their requirements.
            </p>
            <div className="bg-mh-secondary py-2 text-center text-white rounded-md">
              View Set Skills
            </div>
          </div>
        </Link>
        
        <Link href="/i-frame-data" className="block">
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">I-Frame Data</h2>
            <p className="text-gray-600 mb-4">
              Check the invincibility frame data for different weapons and actions.
            </p>
            <div className="bg-mh-secondary py-2 text-center text-white rounded-md">
              View I-Frame Data
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 