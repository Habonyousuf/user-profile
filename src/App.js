import React, { useEffect, useState } from 'react';
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the mock API
    fetch('/user.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>User Profile</h1>
      </header>
      <main>
        {loading ? (
          <p>Loading user profile...</p>
        ) : (
          <div id="profile">
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="profile-picture"
            />
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2025  &nbsp;User Profile App</p>
      </footer>
    </div>
  );
}

export default App;