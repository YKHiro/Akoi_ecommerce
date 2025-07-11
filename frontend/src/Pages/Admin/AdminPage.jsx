import React, { useEffect, useState } from 'react';
import './CSS/admin_page.css';
import { Outlet } from 'react-router-dom';
import { AdminProductList } from './AdminProductList';


const menuItems = [
    { name: 'Dashboard', value: 'dashboard', Page: <></> },
    { name: 'Produtos', value: 'produtos', Page: <AdminProductList />  },
    { name: 'Vendas', value: 'vendas', Page: <></> },
    { name: 'Clientes', value: 'clientes', Page: <></> },
    { name: 'Settings', value: 'settings', Page: <></>, Page: <></> }
];



export const AdminPage = () => {
    const [actualPage, setActualPage] = useState('produtos')


    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="logo">ADMIN</div>
                <nav>
                    <ul >
                        {menuItems.map(item => (
                            <li
                                key={item.value}
                                className={actualPage == item.value ? 'option-list-active' : 'option-list'}
                                onClick={()=>setActualPage(item.value)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="main">
                <header className="topbar">
                    <h2>Products</h2>
                    <div className="topbar-actions">

                    </div>
                </header>

                    {menuItems.map(item => {
                        if(item.value === actualPage) return item.Page
                    })}


            </main>
        </div>
    );
}
