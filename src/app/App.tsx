import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CitizenDashboard } from './components/CitizenDashboard';
import { PoliticianDashboard } from './components/PoliticianDashboard';
import { ModeratorDashboard } from './components/ModeratorDashboard';

export type UserRole = 'admin' | 'citizen' | 'politician' | 'moderator' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <LandingPage onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            currentUser?.role === 'admin' ? (
              <AdminDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/citizen" 
          element={
            currentUser?.role === 'citizen' ? (
              <CitizenDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/politician" 
          element={
            currentUser?.role === 'politician' ? (
              <PoliticianDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/moderator" 
          element={
            currentUser?.role === 'moderator' ? (
              <ModeratorDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
