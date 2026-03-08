import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatsProvider } from './contexts/StatsContext';
import { AuthProvider } from './contexts/AuthContext';

import Navigation from './components/Navigation';

import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import SavedStatsPage from './pages/SavedStatsPage';
import LoginPage from './pages/LoginPage';
import BodyMap from './pages/BodyMapPage';   // NEW IMPORT

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <StatsProvider>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />

            <Route
              path="/saved"
              element={
                <PrivateRoute>
                  <SavedStatsPage />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<LoginPage />} />

            {/* NEW BODYMAP PAGE */}
            <Route path="/bodymap" element={<BodyMap />} />

          </Routes>

        </BrowserRouter>
      </StatsProvider>
    </AuthProvider>
  );
}

export default App;