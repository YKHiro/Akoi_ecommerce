


const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product); // or handle quantity
  localStorage.setItem('cart', JSON.stringify(cart));
  setStoreContext(prev => ({ ...prev, cartNumber: cart.length }));
};