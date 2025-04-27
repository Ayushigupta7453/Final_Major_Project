// /frontend/src/pages/About.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBrain, FaChartBar, FaUsers, FaShieldAlt } from 'react-icons/fa';

const stats = [
  { label: 'Jobs analysed', value: '10,473' },
  { label: 'Average accuracy', value: '92%' },
  { label: 'Active users', value: '3,028' },
];

const features = [
  { icon: FaBrain,  title: 'AI‑powered',    desc: 'Transformer‑based model trained on 50k postings.' },
  { icon: FaChartBar,title: 'Instant stats',desc: 'Pie‑charts, trend lines and per‑user history.' },
  { icon: FaUsers,  title: 'Crowd reviews', desc: 'Share ★ ratings & comments with the community.' },
  { icon: FaShieldAlt,title: 'Admin tools', desc: 'Full CRUD and health checks for moderators.' },
];

const faqs = [
  { q: 'How is accuracy measured?', a: 'We use a held‑out test set of 5 000 labelled postings and compute precision + recall.' },
  { q: 'What data do you store?',   a: 'Only the URL, prediction result and optional review—never resumes or personal data.' },
  { q: 'Is the service free?',      a: 'Yes for individual users. Contact us for bulk or enterprise plans.' },
  { q: 'How often is the model retrained?', a: 'Monthly, incorporating newly‑labelled data and feedback.' },
];

const About = () => {
  const [open, setOpen] = useState(null);

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-20">

      {/* hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white">
          Our Mission: <span className="text-blue-600 dark:text-blue-400">Stop Job Scams</span> Before They Spread
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Transit Help empowers job‑seekers to instantly verify postings using state‑of‑the‑art AI and
          transparent community reviews.
        </p>
        <img
          src="https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=60"
          alt="team"
          className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
        />
      </section>

      {/* stats */}
      <section className="grid sm:grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{s.value}</p>
            <p className="text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* how it works */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Paste URL', 'AI scans', 'Instant verdict'].map((step, i) => (
            <div key={step} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 text-center">
              <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{i + 1}</p>
              <p className="text-lg font-semibold dark:text-white">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <Icon size={32} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold dark:text-white">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">FAQ</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow cursor-pointer"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <div className="flex justify-between p-4">
                <p className="font-medium dark:text-white">{q}</p>
                <span>{open === idx ? '−' : '+'}</span>
              </div>
              {open === idx && <p className="px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition"
        >
          Try It Now →
        </Link>
      </section>
    </main>
  );
};

export default About;
