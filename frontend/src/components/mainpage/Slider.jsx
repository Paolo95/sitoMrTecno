import React from 'react'
import SlideCard from './SlideCard'
import { useNavigate } from 'react-router-dom';

const SliderHome = ({ tab }) => {

  const navigate = useNavigate();
  const section = tab;

  return (
    <>
        <section className='homeSlide contentWidth'>
            <div className="container" onClick={() => {              
              section === 'Ricondizionati' ? navigate('/shop/ricondizionati') :
                  section === 'Nuovo' ? navigate('/shop/nuovo') : navigate('/')}}>
                <SlideCard tab={tab}/>
            </div>
        </section>
    </>
  )
}

export default SliderHome
