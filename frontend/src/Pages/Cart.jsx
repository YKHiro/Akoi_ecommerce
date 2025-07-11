import React, { useState } from 'react';
import './CSS/cart_page.css';
import { useStoreContext } from '../Context/ShopContest';

export const Cart = () => {
  const { setStoreContext } = useStoreContext()

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let cartItemsStart = cart.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity ? item.quantity : 1,
      image: item.image
    }
  })
  const [cartItems, setCartItems] = useState(cartItemsStart);

  const handleQuantityChange = (id, delta) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity = Math.max(1, item.quantity + delta)
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setStoreContext(prev => ({
      ...prev,
      cartItems: updatedCart,
    }));

    setCartItems(updatedCart)
  };

  const handleRemove = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setStoreContext(prev => ({
      ...prev,
      cartItems: updatedCart,
      cartNumber: updatedCart.length
    }));
    setCartItems(updatedCart)
  };

  const handleClearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));

    setStoreContext(prev => ({
      ...prev,
      cartItems: [],
      cartNumber: 0
    }));

    setCartItems([])
  }

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <div className='cart-top'>
        <h1>🛒 Your Shopping Cart</h1>
        <button onClick={handleClearCart}>Clean cart</button>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className='item-container'>
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>{'<'}</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>{'>'}</button>
                    </div>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Subtotal: ${total}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};


