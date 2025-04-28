
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage       from './pages/LandingPage';
import Login             from './pages/Login';
import Register          from './pages/Register';
import Dashboard         from './pages/Dashboard';
import SubmissionDetail  from './pages/SubmissionDetail';
import Profile           from './pages/Profile';
import AdminPanel        from './pages/AdminPanel';
import About             from './pages/About';
import Contact           from './pages/Contact';

import Header            from './components/Header';
import Footer            from './components/Footer';

import { AuthProvider, useAuth } from './context/AuthContext';
import TableuDashboard from './pages/TableuDashboard';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      {/* ---------- sticky nav ---------- */}
      <Header />

      {/* ---------- routed pages ---------- */}
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/about"      element={<About />} />
        <Route path="/contact"    element={<Contact />} />

        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />

        <Route path="/analytics" element={<TableuDashboard/>}/>

        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submission/:id"
          element={
            <ProtectedRoute>
              <SubmissionDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ---------- footer ---------- */}
      <Footer />
    </AuthProvider>
  );
}

export default App;
