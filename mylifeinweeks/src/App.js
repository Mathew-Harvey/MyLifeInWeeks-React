import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthContext here

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles.css';


const App = () => {
  // You're attempting to use AuthContext outside of the AuthProvider. 
  // AuthContext should be used within components that are children of AuthProvider.
  // So, let's remove the useContext line and related loading logic from here.
  // Instead, handle the loading state inside components that are already children of AuthProvider.

  return (
    <Router>
      <AuthProvider> {/* AuthProvider should be the outermost component to provide context */}
        <Navbar />
        <Routes>
        <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
