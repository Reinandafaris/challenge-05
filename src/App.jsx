import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import NoTokenAccess from './components/NoTokenAccess';
import Home from './pages/Home';
import Protected from './components/Protected';
import Dashboard from './pages/users/Dashboard';
import { ToastContainer } from 'react-toastify';
import './App.css';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <NoTokenAccess>
                  <Login />
                </NoTokenAccess>
              }
            />
            <Route
              path="/register"
              element={
                <NoTokenAccess>
                  <Register />
                </NoTokenAccess>
              }
            />

            <Route
              path="/users/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/MovieDetail/:id" element={<MovieDetail />} />
          </Routes>

          <ToastContainer theme="colored" />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
