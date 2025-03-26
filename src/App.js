import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        
        setUser({
          name: data.name,
          email: data.email,
          profilePicture: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          bio: `Works at ${data.company.name}. Lives in ${data.address.city}.`,
          phone: data.phone,
          website: data.website
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>User Profile</h1>
      </header>
      <main>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <div className="profile-card">
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="profile-img"
            />
            <h2>{user.name}</h2>
            <p className="bio">{user.bio}</p>
            
            <div className="contact-info">
              <p><span>📧</span> {user.email}</p>
              <p><span>📱</span> {user.phone}</p>
              <p><span>🌐</span> {user.website}</p>
            </div>
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