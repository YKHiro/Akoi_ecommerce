import React, { useState, useEffect } from 'react';
import './CSS/product.css'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../Components/api';
import { useStoreContext } from '../Context/ShopContest';

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export const Product = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState();
  const { setStoreContext } = useStoreContext();
  let navigate = useNavigate()


  const addToCart = (product) => {
    console.log(product)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.find(item => item.id === product.id)) {
      cart = cart.map(item => {
        if (item.id === product.id) {
          item.quantity = 2
        }
        return item
      })
      
    }
    else {
      product.quantity = 1
      cart.push(product);

    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setStoreContext(prev => ({ ...prev, cartNumber: cart.length }));
  };

  const buyNow = (product) => {
    addToCart(product)
    navigate('/cart')
  };

  useEffect(() => {
    fetchProducts("products/item", { id: productId })
      .then(data => {
        setProduct(data.products[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    setMainImage(product.image)
  }, [productId, setMainImage, product.image]);




  if (loading) return <p>Loading...</p>;

  return (

    <div className="amazon-product-page">
      <div className="product-image-section">
        <img src={mainImage} alt="Main product" className="main-product-image" />
        <div className="thumbnail-row">
          <img
            key={0}
            src={product.image}
            alt={`Thumbnail ${1}`}
            className={`thumbnail ${mainImage === product.image ? 'active-thumbnail' : ''}`}
            onClick={() => setMainImage(product.image)}
          />
          {product.image_list.map((img, index) => (
            <img
              key={index + 1}
              src={img.image}
              alt={`Thumbnail ${index + 2}`}
              className={`thumbnail ${mainImage === img.image ? 'active-thumbnail' : ''}`}
              onClick={() => setMainImage(img.image)}
            />
          ))}
        </div>
      </div>

      <div className="product-info-section">
        <h2 className="product-title">{product.name}</h2>
        <div className='tags'>
          {product.tags.map((tag, index) => (
            <a href="/">
              <div
                className={'tag'}
              >
                {capitalizeFirstLetter(tag)}
              </div>
            </a>
          ))}
        </div>

        <p className="product-price">R${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <p className={`stock-status ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
          {product.in_stock ? 'Em estoque: ' + product.in_stock : 'Out of Stock'}
        </p>

        <div className="action-buttons">
          <button className="buy-now" onClick={() => { buyNow(product) }}>Comprar</button>
          <button className="add-to-cart" onClick={() => { addToCart(product) }}>Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
};