import React, { useEffect, useState } from 'react';
import './NewCollections.css'

import { Item } from '../Item/Item.jsx'
import { FaChevronRight } from "react-icons/fa";

import { fetchProducts } from '../api';

export const NewCollections = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchProducts("products/list",{ page: -1 , page_size: "10"})
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

  return (
    <div className='new-collections'>
        <h1>Novos</h1>
        <hr />
        <div className="collections">
            {products.map((item, i)=>{
                return <Item key={i} id={item.id} tags={item.tags} name={item.name} image={item.image} new_price={item.price} old_price={item.old_price}/>
            })}
        </div>
        <div className="mais-button">
                  <p>VER MAIS</p>
                  <FaChevronRight/>
                </div>
                <hr className='underline'/>
    </div>
  )
}
