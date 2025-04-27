import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api, { getReviews, upsertReview } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SubmissionDetail = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const load = async () => {
      const me = await api.get('/submissions/me');
      setSubmission(me.data.find((s) => s._id === id));
      const rev = await getReviews(id);
      setReviews(rev.data);
    };
    load();
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    await upsertReview(id, { rating, comment });
    const rev = await getReviews(id);
    setReviews(rev.data);
    setComment('');
  };

  if (!submission) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Submission Detail</h2>
      <p><strong>URL:</strong> <a className="text-blue-600" href={submission.url} target="_blank" rel="noopener noreferrer">{submission.url}</a></p>
      <p><strong>Prediction:</strong> {submission.prediction}</p>
      <p><strong>Confidence:</strong> {(submission.confidence * 100).toFixed(2)}%</p>

      <h3 className="font-semibold mt-6">Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      <ul className="space-y-2">
        {reviews.map((r) => (
          <li key={r._id} className="border p-3 rounded">
            <p className="font-medium">{'★'.repeat(r.rating)}</p>
            <p>{r.comment}</p>
            <p className="text-xs text-gray-500">— {r.user.name}</p>
          </li>
        ))}
      </ul>

      {token && (
        <>
          <h4 className="font-semibold mt-4">Leave / edit your review</h4>
          <form onSubmit={handleReview} className="space-y-2">
            <select
              value={rating}
              onChange={(e) => setRating(+e.target.value)}
              className="border p-2 rounded w-full"
            >
              {[5,4,3,2,1].map((n) => (
                <option key={n} value={n}>{`${n} ★`}</option>
              ))}
            </select>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Write something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              type="submit"
            >
              Submit review
            </button>
          </form>
        </>
      )}
    </div>
  );
};
export default SubmissionDetail;
