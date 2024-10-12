import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/auth/Login';
import Dashboard from './routes/portal/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/portal/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
