import { Link } from 'react-router-dom';

const imgs = [
  'https://images.unsplash.com/photo-1521790797524-b2497295b8b4',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
];

const LandingPage = () => (
  <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 flex flex-col">
    <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 dark:text-white">
        Check Any Job Posting<br className="hidden md:block" />
        <span className="text-blue-600 dark:text-blue-400">Before You Apply</span>
      </h1>
      <p className="max-w-2xl text-gray-700 dark:text-gray-300 mb-8 text-lg">
        Drop a URL and let our AI tell you instantly whether it’s legit or a scam.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition"
      >
        Get Started
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4 pb-16">
      {imgs.map((src) => (
        <img
          key={src}
          src={`${src}?auto=format&fit=crop&w=600&q=60`}
          alt="illustrative"
          className="rounded-2xl shadow-lg h-60 object-cover"
          loading="lazy"
        />
      ))}
    </div>
  </section>
);

export default LandingPage;
