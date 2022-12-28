import React from 'react';
import './Style.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../api/axios'
import useAuth from "../../hooks/useAuth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Checkout = ({ cleanCart, cartItem }) => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const totalPrice = cartItem.reduce((price, item) => price + item.qty * item.price, 20);
    const ORDER_URL = '/api/order/newOrder';
    const PRODUCT_URL = '/api/product/checkAvailability';
    const [availability, setAvailability] = React.useState('false');

    const { auth } = useAuth();

    useEffect(() => {

        const getAvailability = async () => {

            const response = await axios.post(PRODUCT_URL, 
                { 
                cart: JSON.parse(localStorage.getItem('cartItem') || '[]'),
                
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

        const response = await axios.post(ORDER_URL, 
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
        console.log(response)
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
                    totalPrice === 20 || availability === 'false' ? 
                  
                    <div className="notAvailable-div">                
                        <section>
                            <h1>Attenzione!</h1>
                            
                            <div>
                                <i className="fas fa-times-circle"></i> 
                            </div>   
                            
                            <p className='notAvailable-p'>
                                Uno dei prodotti non è più disponibile!<br/>  
                                             
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
                                                value: totalPrice - 20
                                            },
                                            shipping: {
                                                value: 20.00,
                                                currency_code: "EUR",
                                            },
                                        },
                                    }, "items": getItemArray(),
                                },
                            ],
                        });
                    }}

                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            newOrder(details);
                            localStorage.removeItem('cartItem');
                            cleanCart();
                            navigate('/orderSuccess', { replace: true });
                        })
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

