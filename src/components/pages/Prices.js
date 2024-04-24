import React from "react";
import CardItem from "../CardItem";
import '../../App.css'
import image from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';

export default function Prices(){
return(
<div className='cards'>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
            src={image}
            text='6 лв.'
            label='Еднократно посещение'
            path='/priceOne'
            />

             <CardItem 
            src={image2}
            text='30 лв.'
            label='12 тренировки за месец'
            path='/priceTwelve'
            />

             <CardItem 
            src={image}
            text='40 лв.'
            label='16 тренировки за месец'
            path='/priceSixteen'
            />
          </ul>
          <ul className="cards__items">
            <CardItem 
            src={image2}
            text='50 лв.'
            label='Месечна карта'
            path='/priceMonth'
            />

             <CardItem 
            src={image}
            text='100 лв.'
            label='Тримесечна карта'
            path='/priceThree'
            />

             <CardItem 
            src={image2}
            text='500 лв.'
            label='Годишна карта'
            path='/priceYear'
            />
          </ul>
        </div>
      </div>
    </div>
)
    }

