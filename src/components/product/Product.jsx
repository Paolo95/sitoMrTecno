import React from 'react'
import { useParams } from 'react-router-dom'
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import uuid from 'react-uuid'
import Sdata from '../shop/Sdata'
import Reviews from './reviews'
import Select from 'react-select'

import './Style.css'

const Product = ({ addToCartProduct }) => {
  
  const params = useParams(); 
  const { shopItems } = Sdata;
  const { reviews } = Reviews;
  const product = shopItems.find(item => item.id === parseInt(params.id));
  const [numItems, setNumItems] = React.useState(1);
  const [orderRevChoice, setRevOrderChoice] = React.useState(0);
  const [numRevs, setNumRevs] = React.useState(6);

  const handleImgClick = (imgId) => {
    const imgs = document.querySelectorAll('.img-select img');
    const imgBtns = [...imgs];
    imgBtns.forEach(() => {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
      })
  }  

  const handleNumItems = (event) => {
    setNumItems(event.target.value);
  }

  const handleOrderRev = (options) => {
    setRevOrderChoice(options.value);
    setNumRevs(6);
  }

  const revOptions = [
    { value: 0, label: 'Migliori' },
    { value: 1, label: 'Peggiori' },
  ];

  const styles = {
    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
    }),
    option: (styles) => ({
      ...styles,
      cursor: 'pointer',
    })
  }

  const handleMoreRev = () => {
    setNumRevs(numRevs + 6);
  }

  return (
    <section className='single-product'>
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={'.' + product.cover} alt="" />
                <img src={'.' + product.photos[0]} alt="" />
                <img src={'.' + product.photos[1]} alt="" />
                <img src={'.' + product.photos[2]} alt="" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                  <img data-id='1' src={'.' + product.cover} alt="" onClick={() => handleImgClick(1)}/>
              </div>
              <div className="img-item">
                  <img data-id='2' src={'.' + product.photos[0]} alt="" onClick={() => handleImgClick(2)}/>
              </div>
              <div className="img-item">
                  <img data-id='3' src={'.' + product.photos[1]}  alt="" onClick={() => handleImgClick(3)}/>
              </div>
              <div className="img-item">
                  <img data-id='4' src={'.' + product.photos[2]}  alt="" onClick={() => handleImgClick(4)}/>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-rating">
              {Array.from({ length: product.stars }, () => <i key={uuid()} className="fa fa-star"></i>)}
              <span>4.7(21)</span>
            </div>
            <div className="product-price">
              <p className="last-price"><span>€{product.price},00</span></p>
              <p className="new-price"><span>€{product.price},00 <span className='discount-span'>({product.discount}% di sconto)</span></span></p>
            </div>

            <div className="product-details">
              <h2>Descrizione prodotto:</h2>
                <ul>
                  <li>Colore: <span>Black</span></li>
                  <li>Memoria: <span>128GB</span></li>
                  <li>Disponibile: <span className='stock-availability'>in stock</span></li>
                  <li>Categoria: <span>{product.category}</span></li>
                  <li>Area di spedizione: <span>Italia</span></li>
                </ul>
            </div>

            <div className="purchase-info">
              <input type="number" min='0' defaultValue='1' onChange={handleNumItems}/>
              <button type='button' className='btn' onClick={() => addToCartProduct(product, numItems)}>
                Aggiungi al carrello <i className="fas fa-shopping-cart"></i>
              </button>
            </div>

            <div className="social-links">
              <p>Condividi su:</p>
              <div className='share-buttons'>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon round={true} size={32}/>
                </FacebookShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon round={true} size={32}/>
                </WhatsappShareButton>
                <TelegramShareButton url={window.location.href}>
                  <TelegramIcon round={true} size={32}/>
                </TelegramShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="review">
        <div className="review-heading">
          <h1>Recensioni</h1>
        </div>
        <Select 
            options={revOptions}
            onChange={handleOrderRev}
            styles={styles}
            isClearable={false}
            isSearchable={false}
            defaultValue={revOptions[0]}
            />
      </div>
      
          
      <div className="review-box-container">
        {
          reviews.filter(item => item.product_id === parseInt(params.id))
                 .slice(0, numRevs)
                 .sort(orderRevChoice === 0 ? (a,b) => b.stars-a.stars : (a,b) => a.stars-b.stars)
                 .map((review, index) => {
          return (
            
                <div className="review-box" key={index}>
                  <div className="review-box-top">
                    <div className="review-profile">
                      <div className="review-profileImg">
                        <img src={review.user_image} alt="" />
                      </div>
                      <div className="review-user-name">
                        <strong>{review.username}</strong>
                      </div>
                    </div>
                    <div className="reviews">
                      {Array.from({ length: review.stars }, () => <i key={uuid()} className="fa fa-star"></i>)}
                    </div>
                  </div>
        
                  <div className="client-comments">
                    <p>{review.review_text}</p>
                  </div>
                </div>
          )
          })
        }
      </div> 

      <div className="btnMoreRev">
        <button onClick={handleMoreRev}
                style={{
                  display: numRevs <= reviews.filter(item => item.product_id === parseInt(params.id)).length ? 'inline' : 'none'
                }}>Mostra altre recensioni</button>
      </div>     
    </section>
  )
}

export default Product