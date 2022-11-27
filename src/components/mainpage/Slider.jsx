import React from 'react'
import SlideCard from './SlideCard'

const SliderHome = ({ tab }) => {
  return (
    <>
        <section className='homeSlide contentWidth'>
            <div className="container">
                <SlideCard tab={tab}/>
            </div>
        </section>
    </>
  )
}

export default SliderHome
