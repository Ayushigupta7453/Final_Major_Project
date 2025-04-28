// import { useEffect, useState } from 'react';
// import api from '../services/api';

// const Dashboard = () => {
//   const [url, setUrl] = useState('');
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchSubs = async () => {
//     const res = await api.get('/submissions/me');
//     setSubmissions(res.data);
//   };

//   useEffect(() => {
//     fetchSubs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post('/submissions', { url });
//       setUrl('');
//       fetchSubs();
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Submission failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       <form className="flex mb-6" onSubmit={handleSubmit}>
//         <input
//           className="flex-grow border p-2 rounded-l"
//           placeholder="Paste job posting URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
//         />
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition disabled:opacity-50"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? 'Checking...' : 'Check'}
//         </button>
//       </form>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <h3 className="font-semibold mb-2">Your Recent Checks</h3>
//       <div className="overflow-x-auto">
//         <ul className="min-w-full">
//           {submissions.map((s) => (
//             <li key={s._id} className="border-b py-2">
//              <a  className="text-blue-600 hover:underline break-words whitespace-normal"
//               href={`/submission/${s._id}`}
//             >
//               {s.url}
//             </a>
//             {' – '}
//             <span className={s.prediction === 'Real' ? 'text-green-600' : 'text-red-600'}>
//               {s.prediction}
//             </span>
//           </li>
//         ))}
//        </ul>
//        </div>
//     </div>
//   );
// };
// export default Dashboard;

import { useEffect, useState, useRef } from 'react';
import api from '../services/api';

const TableauEmbed = () => {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[600px] mb-8 flex justify-center items-center">
      <div
        className="tableauPlaceholder w-full h-full"
        id="vizContainer"
        style={{ position: 'relative', width: '900px'}}
        ref={ref}
      >
        <noscript>
          <a href="#">
            <img
              alt="Dashboard"
              src="https://public.tableau.com/static/images/ma/major_project_17456906492150/Dashboard1/1_rss.png"
              style={{ border: 'none', width: '100%', height: '600px' }}
            />
          </a>
        </noscript>
        <object
          className="tableauViz w-full h-full"
          style={{ display: 'none', width: '100%', height: '100%' }}
        >
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="major_project_17456906492150/Dashboard1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/ma/major_project_17456906492150/Dashboard1/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
          <param name="filter" value="publish=yes" />
        </object>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSubs = async () => {
    const res = await api.get('/submissions/me');
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/submissions', { url });
      setUrl('');
      fetchSubs();
    } catch (err) {
      setError(err.response?.data?.msg || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Existing Form and Submissions List */}
      <form className="flex mb-6" onSubmit={handleSubmit}>
        <input
          className="flex-grow border p-2 rounded-l"
          placeholder="Paste job posting URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h3 className="font-semibold mb-2">Your Recent Checks</h3>

      {/* Tableau Dashboard Section */}
      <TableauEmbed />
      <div className="overflow-x-auto">
        <ul className="min-w-full">
          {submissions.map((s) => (
            <li key={s._id} className="border-b py-2">
              <a
                className="text-blue-600 hover:underline break-words whitespace-normal"
                href={`/submission/${s._id}`}
              >
                {s.url}
              </a>
              {' – '}
              <span className={s.prediction === 'Real' ? 'text-green-600' : 'text-red-600'}>
                {s.prediction}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
