import React from 'react';
import './Style.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../api/axios'
import useAuth from "../../hooks/useAuth";
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Checkout = ({ cleanCart, cartItem }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => navigate(-1);
    const ORDER_URL = '/api/order/newOrder';
    const PRODUCT_URL = '/api/product/checkAvailability';
    const [availability, setAvailability] = React.useState('false');
    
    const cookies = new Cookies();

    let shipping_cost = 9.99;

    cartItem.forEach(element => {
        if(element.category === 'PC' || element.category === 'Notebook') {
        shipping_cost = 19.99;
        }
    });  

    const totalWithoutCommissions = cartItem.reduce((price, item) => price + item.qty * item.price, shipping_cost);
    const netTotal = Math.round((totalWithoutCommissions - shipping_cost) * 100) / 100;
    const payPalCommissions = Math.round(((totalWithoutCommissions * 3) / 100) * 100) / 100;
    const totalPrice = Math.round((payPalCommissions + totalWithoutCommissions) * 100) / 100;

    const { auth } = useAuth();

    useEffect(() => {

        const getAvailability = async () => {

            const response = await axios.post(PRODUCT_URL, 
                { 
                    cart: JSON.parse(JSON.stringify(cookies.get('cartItem')) || '[]'),
                
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            setAvailability(response.data.toString());            
            
        }

        getAvailability();

        return () => {
            
          }    

    })

       

    const newOrder = async (orderDetails) => {

        await axios.post(ORDER_URL, 
            { 
              paypalDetails: orderDetails,
              userInfo: auth?.accessToken,
              
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );
    }

    const getItemArray = () => {
        return cartItem.map((item, index) => {
            return {
                name: item.product_name,
                unit_amount: {
                    currency_code: "EUR",
                    value: item.price
                },
                quantity: item.qty
            };
        })
    }

    return (
        <section className='checkout'>
            <div className="container">
                {
                    cartItem.lenght === 0 || availability === 'false' ? 
                  
                    <div className="notAvailable-div">                
                        <section>
                            <h1>Attenzione!</h1>
                            
                            <div>
                                <i className="fas fa-times-circle"></i> 
                            </div>   
                            
                            <p className='notAvailable-p'>
                                Uno dei prodotti non è più disponibile o il carrello è vuoto!<br/>  
                                             
                                <span className='notAvailable-login-link'>                            
                                    <button className='notAvailable-goBack-btn' onClick={goBack}>Torna indietro</button>                            
                                </span>
                                
                            </p>
                            
                        </section>         
                    </div>
                    
                : (
                        <div className="paypal-button-container">
                            <div className="checkout-txt">
                                <h1 className='checkout-span'>Scegli il metodo di pagamento</h1>
                            </div>                
            <PayPalScriptProvider options={
                    {
                        "client-id": "ATZNHaB7fylPEKToWL-_Cnzb2WIdfxNHMK7JFACI0K48o6vV2UukiwQ72XFU-fG7dKK3I9bi6RT1_qzy",
                        currency: "EUR"
                    }}>
                <PayPalButtons
                    style={{ 
                        layout: "vertical",
                        shape: "pill",
                     }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: 'Ordine MrTecno',
                                    amount: {
                                        value: totalPrice,
                                        breakdown: {
                                            item_total: {
                                                currency_code: "EUR",
                                                value: netTotal,
                                            },
                                            shipping: {
                                                value: shipping_cost,
                                                currency_code: "EUR",
                                            },
                                            tax_total: {
                                                value: payPalCommissions,
                                                currency_code: "EUR",
                                            }
                                        },
                                    }, "items": getItemArray(),
                                },
                            ],
                        });
                    }}

                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            newOrder(details);
                            cookies.remove('cartItem');
                            cleanCart();
                            navigate('/orderSuccess', { replace: true });
                        })
                    }}

                    onClick={async () => {

                        const response = await axios.post(PRODUCT_URL, 
                            { 
                                cart: JSON.parse(JSON.stringify(cookies.get('cartItem')) || '[]')
                            
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${auth?.accessToken}`
                                },
                                withCredentials: true
                            }
                        );

                        if (!response.data) { 
                            const from = location.state?.from?.pathname || "/cart";
                            navigate(from, { replace: true }); 
                            alert("Un prodotto non è più disponibile")
                        }
                        
                    }}

                />
            </PayPalScriptProvider>
        </div>
                    
            )
        }
            
        </div>
            
    </section>
        
    )
}

export default Checkout

