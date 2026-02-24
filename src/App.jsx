import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatsProvider } from './contexts/StatsContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import SavedStatsPage from './pages/SavedStatsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <StatsProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/saved" element={<SavedStatsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </StatsProvider>
  );
}

export default App;