
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Header = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);          
    navigate('/login');
  };

  const links = ['/', '/dashboard', '/about', '/contact'];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-40 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Transit Help
        </Link>

        {/* nav links */}
        <nav className="space-x-6 text-sm font-medium">
          {links.map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                (isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600') + ' transition'
              }
            >
              {path === '/' ? 'Home' : path.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}
            </NavLink>
          ))}
        </nav>

        {/* right‑hand controls */}
        <div className="flex items-center space-x-4">
          {/* <DarkModeToggle /> */}

          {/* show Log Out only when signed in */}
          {token && (
            <button
              onClick={handleLogout}
              className="border px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
