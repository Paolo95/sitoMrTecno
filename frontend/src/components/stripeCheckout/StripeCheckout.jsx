import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';

const StripeCheckout = ({cartItem, cleanCart}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const PUBKEY_URL = '/api/stripe/config';
    const PAYMENT_INTENT_URL = '/api/stripe/createPaymentIntent';
    const { auth } = useAuth();

    const getPubKey = async () => {

      try {
       
        const response = await axios.post(PUBKEY_URL, 
          { 
            
          },
          {
            headers: {
              'Authorization': `Bearer ${auth?.accessToken}`
            },
              withCredentials: true
          }
          );

        setStripePromise(loadStripe(response.data.publishableKey));    
  
      } catch (err) {
        if(!err?.response){
          console.error('Server non attivo!');
        }else if(err.response?.status === 500){
          console.error(err.response?.data);
        }else{
          console.error('Recupero pubkey fallito!');
        }
      }    
  
    }

    const createPaymentIntent = async () => {

      try {
       
        const response = await axios.post(PAYMENT_INTENT_URL, 
          { 
            total: location?.state?.totalWithoutCommissions + 
              Math.round(((location?.state?.totalWithoutCommissions * 1.5) / 100) * 100) / 100 + 0.25,
          },
          {
            headers: {
              'Authorization': `Bearer ${auth?.accessToken}`
            },
              withCredentials: true
          }
          );

        setClientSecret(response.data);    
  
      } catch (err) {
        if(!err?.response){
          console.error('Server non attivo!');
        }else if(err.response?.status === 500){
          console.error(err.response?.data);
        }else{
          console.error('Recupero intent fallito!');
        }
      }    
  
    }

    useEffect(() => {


      if(location?.state?.totalWithoutCommissions === undefined)
        navigate('/cart');
      
      getPubKey();
      createPaymentIntent();

      // eslint-disable-next-line
    },[])

  return (
    <>
      {
        !stripePromise && !clientSecret ? 
          <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
              <ClipLoader
              color={'#0f3460'}
              loading={!stripePromise && !clientSecret }
              size={50}
              />
          </div>: <>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={ {clientSecret} }>
                <CheckoutForm totalWithoutCommissions={location?.state?.totalWithoutCommissions} 
                              commissions={Math.round(((location?.state?.totalWithoutCommissions * 1.5) / 100) * 100) / 100 + 0.25}
                              shipping_cost={location?.state?.shipping_cost}
                              pickup={location?.state?.pickup}
                              cartItem={cartItem}
                              cleanCart={cleanCart}/>
              </Elements>
            )}  
          </> 
      }
      
      
    </>
    
    
  )
}

export default StripeCheckout