import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const randomId = Math.floor(Math.random() * 10) + 1; // Random user ID 1-10
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`);
      
      if (!response.ok) throw new Error('Failed to fetch user');
      
      const data = await response.json();
      
      setUser({
        name: data.name,
        email: data.email,
        profilePicture: `https://i.pravatar.cc/300?img=${randomId}`, // Higher quality image
        bio: `${data.company.catchPhrase}. Lives in ${data.address.city}.`,
        phone: data.phone,
        website: data.website.replace('http://', '') // Clean URL
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Random User Profile</h1>
      </header>
      
      <main>
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading user data...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>⚠️ {error}</p>
            <button onClick={fetchRandomUser}>Retry</button>
          </div>
        ) : (
          <div className="profile-container">
            <div className="profile-card">
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="profile-img"
                onError={(e) => e.target.src = 'https://i.pravatar.cc/300?img=0'} // Fallback
              />
              <h2>{user.name}</h2>
              <p className="bio">{user.bio}</p>
              
              <div className="contact-info">
                <p><span>📧</span> {user.email}</p>
                <p><span>📱</span> {user.phone}</p>
                <p><span>🌐</span> {user.website}</p>
              </div>
            </div>
            
            <button 
              onClick={fetchRandomUser}
              className="refresh-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get New User'}
            </button>
          </div>
        )}
      </main>
      
      <footer>
      <p>&copy; 2025 User Profile App</p>
      </footer>
    </div>
  );
}

export default App;