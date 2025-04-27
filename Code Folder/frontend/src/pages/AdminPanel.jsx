
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Spinner from '../components/Spinner';      

const Td = ({ children }) => <td className="border-t px-3 py-2">{children}</td>;
const Th = ({ children }) => <th className="text-left font-semibold px-3 py-2">{children}</th>;

//users
const UsersList = () => {
  const [users, setUsers]   = useState([]);
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    api.get('/admin/users')
       .then(r => setUsers(r.data))
       .finally(() => setLoad(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <Th>Email</Th>
          <Th>Name</Th>
          <Th>Role</Th>
          <Th>Joined</Th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <Td>{u.email}</Td>
            <Td>{u.name}</Td>
            <Td className={u.role === 'admin' ? 'text-red-600' : ''}>{u.role}</Td>
            <Td>{new Date(u.createdAt).toLocaleDateString()}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//SUBMISSIONS 
const SubsList = () => {
  const [subs, setSubs]   = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    api.get('/admin/submissions')
       .then(r => setSubs(r.data))
       .finally(() => setLoad(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <Th>URL</Th>
          <Th>User</Th>
          <Th>Prediction</Th>
          <Th>Confidence</Th>
          <Th>Date</Th>
        </tr>
      </thead>
      <tbody>
        {subs.map(s => (
          <tr key={s._id}>
            <Td className="max-w-xs truncate">{s.url}</Td>
            <Td>{s.user?.email || '–'}</Td>
            <Td className={s.prediction === 'Real' ? 'text-green-600' : 'text-red-600'}>
              {s.prediction}
            </Td>
            <Td>{(s.confidence * 100).toFixed(1)}%</Td>
            <Td>{new Date(s.createdAt).toLocaleDateString()}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// REVIEWS 
const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoad]    = useState(true);

  useEffect(() => {
    api.get('/admin/reviews')
       .then(r => setReviews(r.data))
       .finally(() => setLoad(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <Th>URL</Th>
          <Th>User</Th>
          <Th>Rating</Th>
          <Th>Comment</Th>
          <Th>Date</Th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(rv => (
          <tr key={rv._id}>
            <Td className="max-w-xs truncate">{rv.url}</Td>
            <Td>{rv.user?.email || '–'}</Td>
            <Td>{'★'.repeat(rv.rating)}</Td>
            <Td className="max-w-sm truncate">{rv.comment}</Td>
            <Td>{new Date(rv.createdAt).toLocaleDateString()}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ADMIN PANEL SHELL 
const AdminPanel = () => (
  <div className="flex">
    <aside className="w-52 bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <nav className="space-y-2 text-sm">
        <Link to=""           className="block text-blue-600 dark:text-blue-400">Home</Link>
        <Link to="users"      className="block text-blue-600 dark:text-blue-400">Users</Link>
        <Link to="submissions"className="block text-blue-600 dark:text-blue-400">Submissions</Link>
        <Link to="reviews"    className="block text-blue-600 dark:text-blue-400">Reviews</Link>
      </nav>
    </aside>

    <main className="flex-grow p-6 overflow-x-auto">
      <Routes>
        <Route path="/"           element={<p>Welcome, Admin!</p>} />
        <Route path="users"       element={<UsersList />} />
        <Route path="submissions" element={<SubsList />} />
        <Route path="reviews"     element={<ReviewsList />} />
      </Routes>
    </main>
  </div>
);

export default AdminPanel;
