import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/user_page.css'; // Import the CSS file
import { useStoreContext } from '../Context/ShopContest';


const UserPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useStoreContext();
  if(!isLoggedIn) navigate('/login');

  const [user, setUser] = useState({
    name: 'Thomas Siqueira',
    email: 'thomas@example.com',
    address: 'Tokyo, Japan',
    avatar: 'https://via.placeholder.com/100',
  });

  const [orders, setOrders] = useState([
    { id: 1, item: 'Wireless Mouse', date: '2025-07-01', status: 'Delivered', total: '$25.00' },
    { id: 2, item: 'Gaming Keyboard', date: '2025-06-25', status: 'Shipped', total: '$75.00' },
    { id: 3, item: 'Monitor Stand', date: '2025-06-10', status: 'Delivered', total: '$40.00' },
  ]);

  const handleLogout = () => {
    setIsLoggedIn( false)
    localStorage.removeItem('access');
    navigate('/login');
  };

  const handleEdit = () => {
    navigate('/edit-profile');
  };
  
  return (
    <div className="user-container">
      <h1>My Account</h1>

      <div className="profile-section">
        <img className="avatar" src={user.avatar} alt="User Avatar" />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button className="btn primary" onClick={handleEdit}>Edit Profile</button>
        </div>
      </div>

      <div className="orders-section">
        <h2>Order History</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.item}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="wishlist-section">
        <h2>Wishlist</h2>
        <p>You have no items in your wishlist.</p>
      </div>

      <button className="btn danger" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserPage;