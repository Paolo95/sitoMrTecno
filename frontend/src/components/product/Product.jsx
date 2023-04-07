import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import uuid from 'react-uuid'
import Select from 'react-select'

import './Style.css'
import axios from '../../api/axios'
import ClipLoader from 'react-spinners/ClipLoader'

const Product = ({ addToCartProduct }) => {
  
  const params = useParams();
  const [numItems, setNumItems] = React.useState(1);
  const [orderRevChoice, setRevOrderChoice] = React.useState('Migliori');
  const [numRevs, setNumRevs] = React.useState(6);
  const [product, setProduct] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const GET_PRODUCT_INFO = '/api/product/getProductShop';
  const GET_REVIEWS = '/api/review/getProdReviews';
  const GET_REVIEW_INFO = '/api/review/getProdReviewStarsByID';

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
    { value: 'Migliori', label: 'Migliori' },
    { value: 'Peggiori', label: 'Peggiori' },
    { value: 'Recenti', label: 'Recenti' },
  ];

  const styles = {
    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
      textAlign: 'center'
    }),
    option: (styles) => ({
      ...styles,
      cursor: 'pointer',
      textAlign: 'center',
    })
  }

  const handleMoreRev = () => {
    setNumRevs(numRevs + 6);
  }

  useEffect(() => {

    const getProduct = async () => {

      try {
       
        const response = await axios.post(GET_PRODUCT_INFO, 
          { 
            prod_id: params.id,
          },
          {
            
          }
        );  

        setProduct(response.data);
  
      } catch (err) {
        if (!err?.response) 
          alert('Server non attivo!');
        else if (err.response.status === 500 ){
          alert(err.response?.data);
        }
        else if (err.response.status === 404 ){
          alert(err.response?.data);
        }else {
          alert('Recupero prodotto fallito!');
        }
  
      }    
      
    }
    
    getProduct();

    const getReviewInfo = async () => {
      
      setLoading(true);

      try {
       
        const response = await axios.post(GET_REVIEW_INFO, 
          { 
            prod_id: params.id,
          },
          {
            
          }
        );  
        
        setLoading(false);
        setReviewInfo(response.data);
  
      } catch (err) {
        if (!err?.response) 
          alert('Server non attivo!');
        else if (err.response.status === 500 ){
          alert(err.response?.data);
        }
        else if (err.response.status === 404 ){
          alert(err.response?.data);
        }else {
          alert('Recupero prodotto fallito!');
        }
  
      }    
      
    }

    getReviewInfo();

    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    const getReviews = async () => {

      setLoadingReview(true);

      try {
       
        const response = await axios.post(GET_REVIEWS, 
          { 
            prod_id: params.id,
            orderRevChoice: orderRevChoice,
          },
          {
            
          }
        );  

        setLoadingReview(false);
        setReviews(response.data);
  
      } catch (err) {
        if (!err?.response) 
          alert('Server non attivo!');
        else if (err.response.status === 500 ){
          alert(err.response?.data);
        }
        else if (err.response.status === 404 ){
          alert(err.response?.data);
        }else {
          alert('Recupero recensione fallito!');
        }
  
      }    
      
    }
    
    getReviews();

    // eslint-disable-next-line
  }, [orderRevChoice])


  return (
    <section className='single-product'>
      <div className="card-wrapper">
        <div className="card">
        <h2 className="product-title-mobile">{product.product_name}</h2>
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={product.cover} alt="" />
                <img src={product.photo_1} alt="" />
                <img src={product.photo_2} alt="" />
                <img src={product.photo_3} alt="" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                  <img data-id='1' src={product.cover} alt="" onClick={() => handleImgClick(1)}/>
              </div>
              <div className="img-item">
                  <img data-id='2' src={product.photo_1} alt="" onClick={() => handleImgClick(2)}/>
              </div>
              <div className="img-item">
                  <img data-id='3' src={product.photo_2}  alt="" onClick={() => handleImgClick(3)}/>
              </div>
              <div className="img-item">
                  <img data-id='4' src={product.photo_3}  alt="" onClick={() => handleImgClick(4)}/>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.product_name}</h2>
            <div className="product-rating">
              {
                loading ? 
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                    <ClipLoader
                    color={'#0f3460'}
                    loading={loading}
                    size={20}
                    />
                  </div> : reviewInfo.length > 0 ?
                  <>
                    {Array.from({ length: Math.round(reviewInfo[0].avgStars) }, () => <i key={uuid()} className="fa fa-star"></i>)}
                    <span>{reviewInfo[0].avgStars}({reviewInfo[0].reviewCount})</span>
                  </>
                  : null

              }
              
              
            </div>
            <div className="product-price">
              <p className="last-price"><span>€{parseFloat((product.price + Math.round((product.discount / 100) * product.price))).toFixed(2)}</span></p>
              <p className="new-price"><span>€{parseFloat(product.price).toFixed(2)} <span className='discount-span'>({product.discount}% di sconto)</span></span></p>
            </div>

            <div className="product-details">
              <h2>Descrizione prodotto:</h2>
                <ul>
                  { product.color !=='' ? <li>Colore: <span>{product.color}</span></li> : null }
                  { product.CPU !=='' ? <li>CPU: <span>{product.CPU}</span></li> : null} 
                  { product.RAM !=='' ? <li>RAM: <span>{product.RAM}</span></li> : null }
                  { product.HDD !=='' ? <li>HDD: <span>{product.HDD}</span></li> : null }
                  { product.graphics_card !== '' ? <li>Scheda Video: <span>{product.graphics_card}</span></li> : null }
                  { product.prod_description !== '' ? <li>Descrizione: <div className='prodDesc-div'>{product.prod_description}</div></li> : null }
                  <li>Stato: 
                    { product.qtyInStock > 0 ?
                      <>
                        <span className='stock-availability'> Disponibile</span>
                      </> :
                        <>
                        <span className='stock-not-available'> Non disponibile</span>
                      </> 
                    }
                  </li>
                    
                  
                </ul>
            </div>
            
            {
              product.qtyInStock > 0 ?
              <>
                <div className="purchase-info">
                  <input type="number" min='0' defaultValue='1' onChange={handleNumItems}/>
                  <button type='button' className='btn' onClick={() => addToCartProduct(product, numItems)}>
                    Aggiungi al carrello <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </> : 
                <>
                </>
            }          

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
          loadingReview ? 
            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
              <ClipLoader
              color={'#0f3460'}
              loading={loadingReview}
              size={50}
              />
            </div>
          :        
          reviews.slice(0, numRevs)
                 .map((review, index) => {
            return (
            
                <div className="review-box" key={index}>
                  <div className="review-box-top">
                    <div className="review-profile">
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
                  {
                    review.review_reply.length !== 0 ? 
                    <>
                      <div className="client-comments">
                        <p><b>Mr.Tecno:</b> {review.review_reply}</p>
                      </div>
                    </> : <></>
                  }
                  
                </div>
          )
          })
        }
      </div> 

      <div className="btnMoreRev">
        <button onClick={handleMoreRev}
                style={{
                  display: numRevs <= reviews.filter(item => item.productId === parseInt(params.id)).length ? 'inline' : 'none'
                }}>Mostra altre recensioni</button>
      </div>     
    </section>
  )
}

export default Product