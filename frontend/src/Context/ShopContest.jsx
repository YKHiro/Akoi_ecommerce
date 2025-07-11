import { createContext, useContext, useState, useEffect } from 'react';



const ShopContext = createContext(null);


export default function ShopContextProvider(props) {

    const contextValue = { UserName: "", cartNumber: 0, IsAdmin: false };
    const [storeContext, setStoreContext] = useState(contextValue)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingContext, setLoadingContext] = useState(true);
    
    useEffect(() => {
        const access = localStorage.getItem('access');
        if (access) {
            // Only fetch if no username loaded yet
            if (!storeContext.UserName) {
                fetch('http://localhost:8000/user/me/', {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                })
                    .then(res => {
                        if (res.status === "200") {
                            setIsLoggedIn(true);
                            res.json().then(data => {
                                setStoreContext(prev => ({
                                    ...prev,
                                    UserName: data.username,
                                    IsAdmin: data.is_staff, // if you return that too
                                }));
                                setLoadingContext(false)
                            })
                        }
                        else{
                            localStorage.removeItem('access')
                            setIsLoggedIn(false);
                            setLoadingContext(false)
                        }
                    }

                    )

                    .catch(err => {
                        console.error("Failed to restore user from token:", err);
                        setIsLoggedIn(false);
                        setLoadingContext(false)
                    });
            }
        } else {
            setIsLoggedIn(false);
            setLoadingContext(false)
        }

    }, [storeContext.UserName]);
    return (
        <ShopContext.Provider value={{ storeContext, setStoreContext, isLoggedIn, setIsLoggedIn, loadingContext }}>
            {props.children}
        </ShopContext.Provider>
    )
}



export const useStoreContext = () => useContext(ShopContext);