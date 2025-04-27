import { useEffect, useState } from 'react';
import api from '../services/api';

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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
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
      <div className="overflow-x-auto">
        <ul className="min-w-full">
          {submissions.map((s) => (
            <li key={s._id} className="border-b py-2">
             <a  className="text-blue-600 hover:underline break-words whitespace-normal"
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
