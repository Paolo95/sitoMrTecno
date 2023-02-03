import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpg'
import axios from '../../api/axios'
import { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Search = ({ cartItem }) => {

  const [loading, setLoading] = useState(false);

  window.addEventListener("scroll", function(){
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  })

  const [wordSearched, setWordSearched] = useState('');
  const [itemList, setItemList] = useState([]);

  const handleFilter = (e) => {
    
    const searchString = e.target.value;
    setWordSearched(searchString);
  }

  const FILTERED_ITEMS_URL = '/api/product/getProductByName';

  const getFilteredItems = async () => {

    setLoading(true);

    try {

      const response = await axios.post(FILTERED_ITEMS_URL, 
        { 
          prod_name: wordSearched,
        },
        {
            headers: { 'Content-Type': 'application/json'},
        }
      )

      setLoading(false);
      setItemList(response.data);    

    } catch (err) {
      if(!err?.response){
        console.error('Server non attivo!');
      }else if(err.response?.status === 500){
        console.error(err.response?.data);
      }else{
        console.error('Recupero elementi fallito!');
      }
    }    

  }

  useEffect(() => {

    if(wordSearched.length > 0) getFilteredItems();
    setItemList([]);  
    // eslint-disable-next-line
  }, [wordSearched]);
  
  return (
    
    <>
        <section className='search'>
          <div className="container c_flex">
            <div className="logo width">
              <Link to='/'>
                <img src={logo} alt='MrTecno Logo'/>
              </Link>
            </div>

            <div className="search-box">
              <i className='fa fa-search'></i>
              <input type='text' 
                     placeholder='Digita il prodotto che desideri...'
                     onChange={handleFilter}/>
              {
                loading ?  (
                  <>
                      <div className="dataResult">
                        <ClipLoader
                        
                          color={'#0f3460'}
                          loading={loading}
                          size={30}
                        />
                      </div>
                  </>
                  
              ): (
                  itemList.length !== 0 && (
                    <div className="dataResult">
                      {
                        itemList.map((item, index) => {
                          return (
                            <a key={index} href={"/product/" + item.id} className="dataitem"> 
                              <p>{item.product_name}</p>
                            </a>
                          )
                        })
                      }
                    </div>
                  ))
            }

            </div>
            <div className="icon f_flex width">
              <div className='user'>
                <Link to='/login'>
                  <i className="fa fa-user icon-circle"></i>
                </Link>
              </div>
              
              <div className="cart">
                <Link to='/cart'>
                  <i className="fa fa-shopping-cart icon-circle"></i>
                  <span>{cartItem.length === 0 ? "0" : cartItem.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Search
