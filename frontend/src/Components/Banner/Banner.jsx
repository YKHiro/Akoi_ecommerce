import React from 'react'
import './Banner.css'
import logo from '../Assets/logo.png'

export const Banner = () => {
    return (
        <div className='banner'>
            <div className='banner-left'>
                <img src={process.env.PUBLIC_URL + "/Imagens/banner-background.svg"} alt="" />
            </div>
            <div className='banner-right'>
                <h2>direita</h2>
                
            </div>
        </div>

    )
}
