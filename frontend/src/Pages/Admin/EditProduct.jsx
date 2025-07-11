import React, { useEffect, useState } from 'react';
import './CSS/edit_product.css'
import config from "../../config";
const TAG_OPTIONS = ['Promotion', 'Manga', 'Figure', 'Clothes', 'Novel'];

export const EditProduct = ({ popIsOpen, setPopIsOpen,  formData, setFormData }) => {

  const [selectedTags, setSelectedTags] = useState(formData.tags);
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleExtraImagesChange = (e) => {
    setExtraImages([...e.target.files]);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    console.log(e.target)
    setSelectedTags(prev =>
      checked ? [...prev, value] : prev.filter(tag => tag !== value)
    );
  };

  const handlePopupClose = () => {
    setMessage(null);
    if (!isError) {
      window.location.reload();  // only reload if it was successful
    }
  };

  useEffect(()=>{
    setSelectedTags(formData.tags)

  },[setSelectedTags, formData])

  const handleSubmit = async (e) => {


    e.preventDefault();
    const data = new FormData();
    console.log('aqui')
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    data.append('tags', JSON.stringify(selectedTags));

    if (mainImage) {
      data.append('image', mainImage);
    }

    extraImages.forEach((file, index) => {
      data.append(`image_list_${index}`, file);
    });

    try {
      const response = await fetch(config.API_URL + 'products/create', {
        method: 'PUT',
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const result = await response.json();
      setMessage('✅ Product uploaded successfully!');
      setIsError(false);
      console.log('Upload Success:', result);

      // Optionally clear the form
      setFormData({
        id:"",
        category: '',
        name: '',
        description: '',
        price: '',
        old_price: '',
        in_stock: '',
        tags:[]
      });
      setSelectedTags([]);
      setMainImage(null);
      setExtraImages([]);

    } catch (err) {
      console.error('Upload Failed:', err);
      setMessage(`❌ Upload failed: ${err.message}`);
      setIsError(true);
    }

  };
  if (!popIsOpen) return null;

  return (

    <div className='add-product-container' onClick={() => { setPopIsOpen(false) }}>

      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h1>Editar Produto</h1>
        <button className='close-button' onClick={() => { setPopIsOpen(false) }}>X</button>
        <div className='input-first-row'>
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="category" type="text" placeholder="Category" value={formData.category} onChange={handleChange} required />

        </div>

        <div className='input-first-row'>
          <input name="price" value={formData.price} type="number" step="0.01" placeholder="Price" onChange={handleChange} required />
          <input name="old_price" value={formData.old_price} type="number" step="0.01" placeholder="Old Price" onChange={handleChange} />
        </div>

        <input name="in_stock" value={formData.in_stock} type="number" placeholder="Stock Quantity" onChange={handleChange} required />
        <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />

        <div className="tag-checkboxes">
          <label>Tags:</label>
          <div className="checkbox-group">
            {TAG_OPTIONS.map(tag => (
              <label key={tag} className="checkbox-label">
                <input
                  type="checkbox"
                  value={tag.toLowerCase()}
                  checked={selectedTags.includes(tag.toLowerCase())}
                  onChange={handleTagChange}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <label>Main Image</label>
        <input type="file" accept="image/*" onChange={handleMainImageChange} />
        {mainImage && (
          <div className="image-preview">
            <p>Main Image Preview:</p>
            <img src={URL.createObjectURL(mainImage)} alt="Main Preview" />
          </div>
        )}

        <label>Extra Images</label>
        <input type="file" multiple accept="image/*" onChange={handleExtraImagesChange} />
        {extraImages.length > 0 && (
          <div className="image-preview">
            <p>Extra Images Preview:</p>
            <div className="thumbnail-grid">
              {extraImages.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt={`Extra ${index}`} />
              ))}
            </div>
          </div>
        )}
        <button className='submit-button' type="submit">Save</button>

        {message && (
          <div className={`popup-message ${isError ? 'error' : 'success'}`}>
            <button onClick={() => handlePopupClose()} className="close-btn">×</button>
            <div className='message'>
              {message}
            </div>

            <button onClick={() => handlePopupClose()} className="ok-btn">CLOSE</button>

          </div>
        )}

      </form>
    </div>
  );
};