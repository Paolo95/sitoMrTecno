import React from 'react';
import './Style.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Checkout = ({ cartItem }) => {

    const totalPrice = cartItem.reduce((price, item) => price + item.qty * item.price, 20);

    const getItemArray = () => {
        return cartItem.map((item, index) => {
            return {
                name: item.name,
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
                    totalPrice === 20? null : (
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
                                    description: 'Ciao',
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
                            alert(
                                "OK"                                
                            )
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

