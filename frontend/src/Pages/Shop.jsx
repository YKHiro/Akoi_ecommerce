import React from 'react'
import { Banner } from '../Components/Banner/Banner'
import { Popular } from '../Components/Popular/Popular'
import { Offers } from '../Components/Offers/Offers'
import { NewCollections } from '../Components/NewCollections/NewCollections'
import './CSS/shop.css'
import { SearchBar } from '../Components/SearchBar/SearchBar'

export const Shop = () => {
    return (
        <div className='shop'>
            <Banner/>
            <SearchBar/>
            <Popular/>
            <Offers/>
            <NewCollections/>
        </div>
    )
}
