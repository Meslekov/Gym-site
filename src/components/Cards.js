import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import image from '../images/image1.jpg';
import image2 from '../images/image2.jpg';

const Cards = () => {
  return (
    <div className='cards'>
      <h1>Тук може да разгледате нашите оферти и да получите повече информация!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
            src={image}
            text='Виж нашите цени и абонаментни планове!'
            label='Цени'
            path='/prices'
            />

             <CardItem 
            src={image2}
            text='Виж повече за нас!'
            label='За нас'
            path='/about-us'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards