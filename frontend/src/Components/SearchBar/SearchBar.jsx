import React from 'react'
import  './SearchBar.css'

import { IoSearchOutline } from "react-icons/io5";

export const SearchBar = () => {
  return (
    <div className='search-bar'>
      <input rows='1' name="Search" className="search-text"></input>
      <button>
        <IoSearchOutline className='search-icon'/>
      </button>
    </div>
  )
}
