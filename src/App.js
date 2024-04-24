import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Contacts from './components/pages/Contacts';
import Prices from './components/pages/Prices';
import Login from './components/pages/Login';
import AboutUs from './components/pages/AboutUs';
import Profile from './components/pages/Profile';
import ManagerProfile from './components/pages/ManagerProfile';
import AddProfile from './components/pages/AddProfile';
import UsersList from './components/pages/UsersList';
import { UserTypeProvider } from './components/UserTypeContext';

import PriceOne from './components/pages/PriceOne';
import PriceTwelve from './components/pages/PriceTwelve';
import PriceSixteen from './components/pages/PriceSixteen';
import PriceMonth from './components/pages/PriceMonth';
import PriceThree from './components/pages/PriceThree';
import PriceYear from './components/pages/PriceYear';
import UserRegistrationInfo from './components/UserRegistrationInfo';

function App() {
  return (
    <div className='App'>
      <Router>
        <UserTypeProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/prices' element={<Prices />} />
          <Route
            path='/login'
            element={<Login />} 
          />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/managerProfile' element={<ManagerProfile />} />
          <Route path='/addProfile' element={<AddProfile />} />
          <Route path='/usersList' element={<UsersList />} />
          <Route path='/priceOne' element={<PriceOne />} />
          <Route path='/priceTwelve' element={<PriceTwelve />} />
          <Route path='/priceSixteen' element={<PriceSixteen />} />
          <Route path='/priceMonth' element={<PriceMonth />} />
          <Route path='/priceThree' element={<PriceThree />} />
          <Route path='/priceYear' element={<PriceYear />} />
          <Route path='/userRegInfo' element={<UserRegistrationInfo />} />
        </Routes>
       </UserTypeProvider>
      </Router>
    </div>
  );
}

export default App;
