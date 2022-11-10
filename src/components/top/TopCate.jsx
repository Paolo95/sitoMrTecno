import React from 'react'
import TopCart from './TopCart'
import './Style.css'

const TopCate = () => {
  return (
    <>
        <section className="topCat background">
          <div className="container">
            <div className="heading d_flex">
              <div className="heading-left row f_flex">
                <i className="fa fa-border-all"></i>
                <h2>Categorie più acquistate</h2>
              </div>
              <div className="heading-right row">
                <span>Mostra tutto</span>
                <i className="fa fa-caret-right"></i>
              </div>
            </div>
            <TopCart />
          </div>
        </section>
    </>
  )
}

export default TopCate