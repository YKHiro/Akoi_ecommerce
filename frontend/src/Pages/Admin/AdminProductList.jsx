import React, { useEffect, useState } from 'react';
import './CSS/admin_product_list.css';
import { fetchProducts } from '../../Components/api';
import LoadingScreen from '../LoadingScreen';
import { AddProduct } from './AddProduct'
import { EditProduct } from './EditProduct';


export const AdminProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [popIsOpen, setPopIsOpen] = useState(false)
  const [editPopIsOpen, setEditPopIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    old_price: '',
    in_stock: '',
    tags: ''
  });

  const editProduct = (product) => {

    setFormData({
      id:product.id,
      category: product.category,
      name: product.name,
      description: product.description,
      price: product.price,
      old_price: product.old_price,
      in_stock: product.in_stock,
      tags: product.tags
    })
    setEditPopIsOpen(true)
  }
  useEffect(() => {
    fetchProducts("products/list", {})
      .then(data => {
        setProducts(data.products);
        setLoading(false);
        console.log(data.products)
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  if (loading) return <LoadingScreen />;
  return (
    <div className="admin-main-content">
      <AddProduct popIsOpen={popIsOpen} setPopIsOpen={setPopIsOpen} />
      <EditProduct popIsOpen={editPopIsOpen} setPopIsOpen={setEditPopIsOpen} formData={formData} setFormData={setFormData} />

      <div className="table-actions">
        <button>Filter</button>
        <button className="add-button" onClick={() => { setPopIsOpen(true) }}>+ Add Product</button>
      </div>

      <div className='product-scroll-area'>
        <table className="product-table">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} onClick={() => { editProduct(product) }}>
                <td><input type="checkbox" /></td>
                <td className="product-name">
                  <img src={product.image} alt="" />
                  {product.name}
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.in_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
