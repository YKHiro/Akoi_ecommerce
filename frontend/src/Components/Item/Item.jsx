import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Item = (props) => {
  return (
    
    <Link className='link' to={`/Product/${props.id}`}>
      <div className='item'>
        <div className="item-tag">
          {props.tags ? capitalizeFirstLetter(props.tags[0]) : ""}
        </div>
        <img src={props.image} alt="" />
        <div className="item-description">
          <p>{props.name}</p>
        </div>
        <div className='item-prices'>
          <div className='item-price-old'>
            {props.old_price ? 'R$' + props.old_price : ""}
          </div>
          <div className='item-price-new'>
            R${props.new_price}
          </div>
          <div className="item-vista">
            À vista no PIX

          </div>
          <div className="item-cartao">
            ou em 3x no cartão
          </div>


        </div>
        <div className="item-button">
          <button>COMPRAR</button>
        </div>
      </div>
    </Link>

  )
}
