import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/search_page.css';
import { PriceSlider } from '../Components/PriceSlider/PriceSlider'
import { Item } from '../Components/Item/Item'
import { fetchProducts } from '../Components/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



export const SearchPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = useQuery();
    const query = queryParams.get('query') || '';
    const queryTags = useMemo(() => queryParams.getAll('tag'), [location.search, queryParams]);
    const min = parseInt(queryParams.get('price_min') || '0');
    const max = parseInt(queryParams.get('price_max') || '1000');
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ price_min: min, price_max: max, tags: queryTags })
    const [loading, setLoading] = useState(true);

    const setSearchTags = (queryTags) => {

        const inputsSideBar = ['category'];
        inputsSideBar.map(inp => {
            queryTags.forEach(tag => {
                const checkboxes = document.querySelectorAll(`input[name="${inp}"]`);
                checkboxes.forEach(box => {
                    box.checked = false;
                    if (queryTags.includes(box.value))
                        box.checked = true;

                })

            })
        });
    };


    function getPrices(lower, upper) {
        setForm(prev => ({
            ...prev,
            price_min: lower,
            price_max: upper
        }));
    }



    const searchNewQuery = () => {

        const inputsSideBar = ['category'];
        const newQuery = new URLSearchParams();

        inputsSideBar.map(inp => {
            const checkboxes = document.querySelectorAll(`input[name="${inp}"]`);
            checkboxes.forEach(box => {
                if (box.checked) newQuery.append('tag', box.value);
            })
        });


        // Add price range
        newQuery.append('price_min', form.price_min);
        newQuery.append('price_max', form.price_max);

        // Navigate to new URL
        navigate(`/search?${newQuery.toString()}`);
    };
    useEffect(() => {

        console.log('aqui')
        fetchProducts("products/list", { search: query, tag: queryTags })
            .then(data => {

                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });


    }, [query, queryTags]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTags(form.tags)
        }, 100);
        return () => clearTimeout(timer);
    }, [form.tags])

        useEffect(() => {
        setForm(prev => ({
            ...prev,
            tags: queryTags
        }));
    }, [queryTags]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="search-container">
            <aside className="sidebar">
                <div className='sidebar_box'>
                    <h3>Category</h3>
                    <div>
                        <label>
                            <input type="checkbox" name="category" value="" />
                            All
                        </label>
                        <label>
                            <input type="checkbox" name="category" value="manga" />
                            Manga
                        </label>
                        <label>
                            <input type="checkbox" name="category" value="novel" />
                            Novel
                        </label>
                    </div>
                </div>

                                <div className='sidebar_box'>
                    <h3>Special</h3>
                    <div>
                        <label>
                            <input type="checkbox" name="category" value="" />
                            All
                        </label>
                        <label>
                            <input type="checkbox" name="category" value="popular" />
                            Popular
                        </label>
                        <label>
                            <input type="checkbox" name="category" value="promotion" />
                            Promoção
                        </label>
                    </div>
                </div>

                <div className='sidebar_box'>
                    <h3>Price</h3>
                    <div>
                        <PriceSlider
                            min={0}
                            max={1000}
                            stMinValue={form.price_min}
                            stMaxValue={form.price_max}
                            onChange={(getPrices)}

                        />
                    </div>
                </div>

                <button onClick={searchNewQuery}>
                    Apply
                </button>
                


            </aside>

            <main className="results">
                <h2>Results for "{query}"</h2>

                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="grid">
                        {products.map((item, i) => {
                            return <Item key={i} id={item.id} tags={item.tags} name={item.name} image={item.image} new_price={item.price} old_price={item.old_price} />
                        })}
                    </div>
                )}

            </main>
        </div>
    );
}
