import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className='footer'>
        <div className="redes-text">
          Siga nossas redes sociais:
        </div>
        <div className="redes-icons">
          <FaInstagram className='icon'/>
          <FaFacebookSquare className='icon'/>
        </div>
        <p>By: Thomas Siqueira Pereira</p>
    </div>
  )
}
