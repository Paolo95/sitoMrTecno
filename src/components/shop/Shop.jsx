import React from 'react'
import ShopCart from './ShopCart'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import "./Style.css"

export const Shop = ({ addToCart }) => {

  const data = [
    {
      id: 1,
      brandName: "Apple",
    },
    {
      id: 2,
      brandName: "Samsung",
    },
    {
      id: 3,
      brandName: "Oppo",
    },
    {
      id: 4,
      brandName: "Vivo",
    },
    {
      id: 5,
      brandName: "Redmi",
    },
    {
      id: 6,
      brandName: "Sony",
    },
  ]

  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(500);

  const [brandOpen, setBrandOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  const [checkedState, setCheckedState] = React.useState(
    new Array(data.length).fill(false)
  );

  const [checkedList, setCheckedList] = React.useState(0);

  const brandHandleOpen = () => {
    setBrandOpen(!brandOpen);
  }

  const priceHandleOpen = () => {
    setPriceOpen(!priceOpen);
  }

  const handleChangeMin = event => {
    setMin(event.target.value);
    
  };

  const handleChangeMax = event => {
    setMax(event.target.value);
    
  };

  const handleOnCheckBoxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const checkedList = updatedCheckedState.map(
      (value, index) => {
        if (value === true) {
          return data[index].brandName;
        }else{
          return '';
        }
      }
    );

    setCheckedList(checkedList);
  }



  const [orderChoice, setUserOrderChoice] = React.useState(0);
    
  const userOrderChoiceHandler = (e) => {
    setUserOrderChoice(e.target.value);
  }

  return (
    <>
      <section className="shop">
        <div className="container d_flex">
        <>
        <div className="category">
          <div className='chead'>
            <div className='tab'>
            
              <button onClick={brandHandleOpen}><h3>Brand</h3>{brandOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              }</button>            
                                
                {
                      data.map((value, index) => {
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
                                    checked={checkedState[index]}
                                    onChange={() => handleOnCheckBoxChange(index)}
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
                      max={500}
                      defaultValue={[0,500]}
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
                <h2>Smartphone</h2>
              </div>
              <select id="order-select" name="order" onChange={(choice) => userOrderChoiceHandler(choice)}>
                <option value="0">Migliori</option>
                <option value="1">Crescente</option>
                <option value="2">Decrescente</option>
                <option value="3">A-Z</option>
                <option value="4">Z-A</option>
              </select>
            </div>
            <div className="product-content grid1">
              <ShopCart addToCart={addToCart} orderChoice={orderChoice} checkedList={checkedList} minPriceRange={min} maxPriceRange={max}/>
            </div>
          </div>
        </div>
      </section>
    </>
    
  )
}

export default Shop