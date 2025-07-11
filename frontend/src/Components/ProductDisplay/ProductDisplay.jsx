import React from 'react'
import './ProductDisplay.css'

export const ProductDisplay = (props) => {
    const {product} = props

  return (
    <div className='product'>
        {product.imaage}
      <div className="product-left">
        <div className="product-img-list">
          <img src={process.env.PUBLIC_URL + "/Imagens/" + product.image + ".jpg"} alt="" />
          <img src={process.env.PUBLIC_URL + "/Imagens/" + product.image + ".jpg"} alt="" />
          <img src={process.env.PUBLIC_URL + "/Imagens/" + product.image + ".jpg"} alt="" />
          <img src={process.env.PUBLIC_URL + "/Imagens/" + product.image + ".jpg"} alt="" />

        </div>
        <div className="product-img">
          <img src={process.env.PUBLIC_URL + "/Imagens/" + product.image + ".jpg"} alt="" />
        </div>
      </div>
      <div className="product-right">
        <div className="product-prices">
          <div className="product-price-old">
            R${product.old_price}
          </div>
          <div className="product-price-new">
            R${product.new_price}
          </div>
          <div className="product-description">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  )
}
