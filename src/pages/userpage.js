import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ugabanner from '../assets/images/ugabanner.png';
import { BASE_URL } from '../utils/BASE_URL';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        console.log(data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Users</h1>
      </header>
      <main className="main-content">
        <section className="user-list">
          <h2>Users List</h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user.username}</li>
              ))}
            </ul>
          ) : (
            <p>No users available.</p>
          )}
          <button onClick={goToHomepage}>Go to Homepage</button>
        </section>
      </main>
      <aside className="sidebar">
        <img src={ugabanner} alt="Sidebar content" />
      </aside>
    </div>
  );
}

export default UsersPage;
