import React from 'react';
import './UserRegistrationInfo.css';

const UserRegistrationInfo = () => {
  return (
   <section className='user-sec'>
      <div className='h1-u-container'><h1>Какво представлява нашият потребителски акаунт?</h1> </div>
      <div className='p-u-container'><p className='user-p'>
        Ние предлагаме възможност, при която килентите ни да могат да следят абонаментните си планове в сайта, в реално време, чрез нашия потребителски акаунт. <br />
      </p></div>
       <div className='h1-u-container'><h1>Как можете да си направите акаунт?</h1> </div>
       <div className='p-u-container'><p className='user-p'>
        Нужно е само да заплатите абонаментен план, който се заплаща на място, във фитнес залата. Като след заплащането ще ви бъде предоставена възможност да си направите потребителски акаунт, с помощ от наш служител. <br />
      </p></div>
    </section>
  )
}

export default UserRegistrationInfo