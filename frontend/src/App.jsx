// import Register from "./components/Register";
// import Login from "./components/Login"
// function App(){
//   console.log("done and")
//   return(
//     <div>
//       <div>
//         helloss
//       </div>
//     </div>
//   )
// }

// export default App;

// mern-auth-app/frontend/src/App.js
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import api from './api'; // Axios instance
// import './App.css'; // For basic styling

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'
  const [protectedMessage, setProtectedMessage] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchProtectedData();
    }
  }, []);

  const handleAuthSuccess = (token, message) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setAuthMessage(message);
    setProtectedMessage(''); // Clear previous protected message
    fetchProtectedData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setAuthMessage('Logged out successfully!');
    setProtectedMessage('');
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setProtectedMessage('Please log in to view protected content.');
        return;
      }
      const response = await api.get('/api/auth/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProtectedMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching protected data:', error);
      setProtectedMessage('Failed to fetch protected content. Please log in again.');
      localStorage.removeItem('token'); // Token might be invalid
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Authentication App</h1>

        {authMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{authMessage}</span>
          </div>
        )}

        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard</h2>
            <p className="text-gray-600 mb-4">{protectedMessage}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => { setCurrentView('login'); setAuthMessage(''); }}
                className={`px-4 py-2 rounded-l-md font-semibold ${currentView === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Login
              </button>
              <button
                onClick={() => { setCurrentView('register'); setAuthMessage(''); }}
                className={`px-4 py-2 rounded-r-md font-semibold ${currentView === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Register
              </button>
            </div>

            {currentView === 'login' ? (
              <Login onAuthSuccess={handleAuthSuccess} setAuthMessage={setAuthMessage} />
            ) : (
              <Register onAuthSuccess={handleAuthSuccess} setAuthMessage={setAuthMessage} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
//hii
export default App;
