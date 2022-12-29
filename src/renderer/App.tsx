import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowserPage } from './views/Browser';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowserPage />} />
      </Routes>
    </Router>
  );
}
