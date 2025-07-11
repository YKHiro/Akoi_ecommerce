import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';

import { Link } from 'react-router-dom'

import './Offers.css'

import image from '../Assets/Imagens/kimetsu-1.jpg'

export const Offers = () => {

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetchProducts("products/list",{ tag: 'manga', page: 1 })
          .then(data => {
            setProducts(data.products);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }, []);
    
      if (loading) return <p>Loading...</p>;

      const item = products[0]

    return (
        <Link to={`/Product/${item.id}`}>
        <div className='offers'>
            
            
            <div className="offers-left">
                <h1>{item.name}</h1>
                <h2>{item.category}</h2>
                <p>{item.description}</p>
            </div>
            <div className="offers-right">
                <img src={item.image} alt="" />
            </div>
            
        </div>
        </Link>
    )
}
