import React from 'react'
import ShopCart from './ShopCart'
import RangeSlider from 'react-range-slider-input';
import Sdata from './Sdata';
import 'react-range-slider-input/dist/style.css';
import Select from 'react-select';
import "./Style.css";

export const Shop = ({ addToCart }) => {

  /*Fare chiamata al db per questa sezione*/

  const { shopItems } = Sdata;
  const shopItems2 = JSON.parse(JSON.stringify(shopItems));
  const uniqueBrands = shopItems.filter((elem, index) => shopItems.findIndex(obj => obj.brandName === elem.brandName) === index);
  const uniqueCategories = shopItems.filter((elem, index) => shopItems.findIndex(obj => obj.category === elem.category) === index);
  
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(1000);

  const [categoryOpen, setCategoryOpen] = React.useState(true);
  const [brandOpen, setBrandOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  const [brandCheckedState, setBrandCheckedState] = React.useState(
    new Array(uniqueBrands.length).fill(false)
  );

  const [brandCheckedList, setBrandCheckedList] = React.useState([]);
  const [categoryChecked, setCategoryChecked] = React.useState('Smartphone');

  const categoryHandleOpen = () => {
    setCategoryOpen(!categoryOpen);
  }

  const brandHandleOpen = () => {
    setBrandOpen(!brandOpen);
  }

  const priceHandleOpen = () => {
    setPriceOpen(!priceOpen);
  }

  const handleChangeMin = event => {
    if(catMobileMenu){
      setCatMobileMenu(true);
    }else{
      setCatMobileMenu(false);
    }
    setMin(event.target.value);
    
  };

  const handleChangeMax = event => {
    if(catMobileMenu){
      setCatMobileMenu(true);
    }else{
      setCatMobileMenu(false);
    }
    setMax(event.target.value);
    
  };

  const handleOnBrandCheckBoxChange = (position) => {
    
    if(catMobileMenu){
      setCatMobileMenu(true);
    }else{
      setCatMobileMenu(false);
    }

    setNumProdListed(6);
    const updatedBrandCheckedState = brandCheckedState.map((item, index) =>
      index === position ? !item : item
    );

    setBrandCheckedState(updatedBrandCheckedState);

    const brandCheckedList = updatedBrandCheckedState.map(
      (value, index) => {
        if (value === true) {
          return uniqueBrands[index].brandName;
        }else{
          return '';
        }
      }
    );
    

    setBrandCheckedList(brandCheckedList);
  }

  const handleOnCategoryRadioChange = e => {
    if(catMobileMenu){
      setCatMobileMenu(true);
    }else{
      setCatMobileMenu(false);
    }
    setNumProdListed(6);
    setCategoryChecked(e.target.value);   
  }

  const [orderChoice, setUserOrderChoice] = React.useState(0);
    
  const userOrderChoiceHandler = (options) => {
    setNumProdListed(6);
    setUserOrderChoice(options.value);
  }

  const [numProdListed, setNumProdListed] = React.useState(6);

  const handleMoreProdListed = () => {
   
    setNumProdListed(numProdListed + 6);
 
  }

  const [catMobileMenu , setCatMobileMenu] = React.useState(false);

  const shopOptions = [
    { value: 0, label: 'Migliori' },
    { value: 1, label: 'Crescente' },
    { value: 2, label: 'Decrescente' },
    { value: 3, label: 'A-Z' },
    { value: 4, label: 'Z-A' },
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

  return (
    <>
      <section className="shop">
        <div className="container d_flex">
        <>
        <div className={catMobileMenu ? "categoryMobile" : "category"} onClick={() => setCatMobileMenu(false)}>
          {catMobileMenu ? <i className='fas fa-times cat_close home-bth'></i> : null}
          <div className='chead'>
            <div className='tab'>
            
              <button onClick={categoryHandleOpen}><h3>Categorie</h3>{categoryOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              }</button>            
                                
                {
                      uniqueCategories.map((value, index) => {
                          return (
                            <div className="dropdown" key={index}>
                              {categoryOpen ? (
                                <ul className="menu">
                                  <div className="container">
                                  <label>                                  
                                    <input 
                                      type="radio" 
                                      id={`custom-radio-${index}`}
                                      name={value}
                                      value={value.category}
                                      defaultChecked={index === 0}
                                      onChange={handleOnCategoryRadioChange}
                                      />
                                    <span>{value.category}</span>
                                  </label>
                                  </div>
                                </ul>
                              ) : null}
                            </div>   
                          )
                      })}
            </div>
            
            <div className='tab'>
            
              <button onClick={brandHandleOpen}><h3>Brand</h3>{brandOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              }</button>            
                                
                {
                      uniqueBrands.filter(item => item.category === categoryChecked).map((value, index) => {
                          return (
                            <div className="dropdown" key={index}>
                              {brandOpen ? (
                                <ul className="menu">
                                  <div className="container">
                                  <label>                                  
                                    <input 
                                      type="checkbox" 
                                      id={`custom-checkbox-${index}`}
                                      name={value}
                                      value={value}
                                      checked={brandCheckedState[index]}
                                      onChange={() => handleOnBrandCheckBoxChange(index)}
                                      />
                                    <span>{value.brandName}</span>
                                  </label>
                                  </div>
                                </ul>
                              ) : null}
                            </div>   
                          )
                      })}
            </div>
            
            <div className="tab">
              <button onClick={priceHandleOpen}><h3>Prezzo</h3>{priceOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              } </button>          

              <div className="dropdown">
                {priceOpen ? (
                  <div>
                    
                    <RangeSlider 
                      id={'rangeInput'}
                      min={0}
                      max={1000}
                      defaultValue={[0,1000]}
                      onInput={([min, max]) => {
                        setMin(min);
                        setMax(max);
                      }
                      }
                      value={[min,max]}
                    />
                  <div className='range-values'>
                    <div className="container">
                      <input id='min_input' type="number" min={0} value={min} onChange={handleChangeMin}/>
                      <input id='max_input' type="number" min={min+1} value={max} onChange={handleChangeMax}/>
                    </div>                    
                  </div>                
                </div>                       
                ) : null}
              </div>
            </div>                         
          </div>        
        </div>
    </>
          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row f_flex">
                <button className='toggle' onClick={() => setCatMobileMenu(!catMobileMenu)}>
                    <h3>Filtri<i className='fa fa-chevron-down'></i></h3>
                </button>
                
              </div>

              <Select 
                options={shopOptions}
                onChange={userOrderChoiceHandler}
                styles={styles}
                isClearable={false}
                isSearchable={false}
                defaultValue={shopOptions[0]}/>
            </div>
            <div className="product-content grid1">
              <ShopCart addToCart={addToCart} 
                        shopItems={shopItems2.sort(orderChoice === 0 ? (a,b) => b.stars-a.stars : (a,b) => b.price-a.price )
                                             .filter(item => item.category === categoryChecked)
                                             .filter(item => item.price >= min)
                                             .filter(item => item.price<= max)
                                             .filter(brandCheckedList.filter(n => n).length !== 0 ? (item => brandCheckedList.filter(n => n).includes(item.brandName)) : item => item)
                                             .slice(0, numProdListed)}
              />
            </div>
            <div className="container f_flex">
              <button 
                      id='btn-moreProd'
                      className='btn-moreProd'
                      onClick={handleMoreProdListed}
                      style={{
                        display: numProdListed <= shopItems.filter(item => item.category === categoryChecked)
                        .filter(item => item.price >= min)
                        .filter(item => item.price<= max)
                        .filter(brandCheckedList.filter(n => n).length !== 0 ? (item => brandCheckedList.filter(n => n).includes(item.brandName)) : item => item)
                        .slice(0, numProdListed).length ? 'inline' : 'none'
                      }}
                      >Mostra altro</button>
            </div>
            
          </div>
        </div>
      </section>
    </>
    
  )
}

export default Shop