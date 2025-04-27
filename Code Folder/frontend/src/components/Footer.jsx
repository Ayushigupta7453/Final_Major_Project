import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 mt-16">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-6 text-sm">
      <p className="text-gray-500">© {new Date().getFullYear()} Transit Help. All rights reserved.</p>

      <a
        href="https://github.com/your‑repo"   // TODO: replace with real repo
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
      >
        <FaGithub size={24} />
      </a>
    </div>
  </footer>
);

export default Footer;
