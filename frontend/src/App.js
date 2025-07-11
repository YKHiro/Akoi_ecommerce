
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Footer } from './Components/Footer/Footer';
import { AdminPage } from './Pages/Admin/AdminPage';
import { UserLogin } from './Pages/UserLogin';
import { UserRegistration } from './Pages/UserRegistration';
import { SearchPage } from './Pages/SearchPage';
import UserPage from './Pages/UserPage';
import { useStoreContext } from './Context/ShopContest';
import LoadingScreen from './Pages/LoadingScreen';


function LayoutRoutes() {
  const location = useLocation();
  const hideLayoutRoutes = ['/admin'];
  const shouldHideLayout = location.pathname.includes(hideLayoutRoutes)
  const { isLoggedIn, storeContext, loadingContext } = useStoreContext()

  if (loadingContext)
    return (<LoadingScreen></LoadingScreen>)
  else {
    return (

      <div className='background'>
        {!shouldHideLayout && <Navbar />}
        <Routes>

          <Route path='/' element={<Shop />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path='/user' element={<UserPage />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/register' element={<UserRegistration />} />
          <Route path='/mangas' element={<ShopCategory category="mangas" />} />
          <Route path='/novels' element={<ShopCategory category='novels' />} />
          <Route path='/populares' element={<ShopCategory category='populares' />} />
          <Route path='/novos' element={<ShopCategory category='novos' />} />
          <Route path='/outros' element={<ShopCategory category='outros' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<Cart />} />


          {(isLoggedIn && storeContext.IsAdmin) ?
            <Route path='/admin' element={<AdminPage />} />
            :
            <Route path='/admin/*' element={<Navigate to="/login" replace />} />
          }




        </Routes>

        {!shouldHideLayout && <Footer />}

      </div>
    );
  }

}


function App() {
  return (
    <BrowserRouter>
      <LayoutRoutes />
    </BrowserRouter>
  );
}


export default App;
