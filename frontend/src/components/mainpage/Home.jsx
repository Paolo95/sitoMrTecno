import React from 'react'
import SliderHome from './Slider'
import "./Home.css"
import CategoryTab from './CategoryTab'

const Home = () => {
  return (
    <>
        <section className='home'>
            <div className="container d_flex">
                <CategoryTab tab={'Permuta'}/>
                <SliderHome tab={'Permuta'}/>
            </div>
            <div className="container d_flex">
                <CategoryTab tab={'Ricondizionati'}/>
                <SliderHome tab={'Ricondizionati'}/>
            </div>
            <div className="container d_flex">
                <CategoryTab tab={'Nuovo'}/>
                <SliderHome tab={'Nuovo'}/>
            </div>
        </section>
    </>
  )
}

export default Home