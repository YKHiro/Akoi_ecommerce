import React, { useEffect } from 'react'
import { useStoreContext, } from '../../Context/ShopContest'
import './Navbar.css'
import { Link } from 'react-router-dom'

import logo from '../Assets/logo.png'
import { PiShoppingCartSimple } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";

export const Navbar = () => {


    const { isLoggedIn, storeContext } = useStoreContext();

    return (
        <div className='navbar'>
            <div className="navbar-content">
                <div className="nav-logo">
                    <img src={logo} alt='' />

                </div>
                <ul className="nav-menu" >
                    <li><Link to='/'>Home</Link></li>
                    <li ><Link to='/search?tag=manga'>Mangas</Link></li>
                    <li ><Link to='/search?tag=novel'>Novels</Link></li>
                    <li ><Link to='/search'>Outros</Link></li>

                </ul>

                <div className="nav-login-cart">

                    <Link to={isLoggedIn ? '/User' : '/login'}>
                        <div className="nav-account">
                            <VscAccount className='account-icon' />
                            {isLoggedIn ?
                                (<p>{storeContext.UserName.toUpperCase()}</p>
                                ) : (
                                    <p>ENTRAR/CADASTRAR</p>
                                )}
                        </div></Link>
                    <Link to='/cart'><PiShoppingCartSimple className="cart-button" fontSize={30} /> </Link>
                    <div className="nav-cart-count">{storeContext.cartNumber}</div>
                </div>
            </div>


        </div >
    )
}
