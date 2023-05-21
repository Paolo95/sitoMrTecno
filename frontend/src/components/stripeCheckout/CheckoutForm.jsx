import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import './checkoutForm.css'
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ( {totalWithoutCommissions, commissions, cleanCart, shipping_cost, pickup, cartItem, type, barterCode, barterEvaluation, barterRecap, formStepSetPayDone, barterInfo} ) => {

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const ORDER_STRIPE_URL = '/api/order/newOrderStripe';
  const BARTER_APPROVED_URL= '/api/barter/barterAcceptedStripe';
  const { auth } = useAuth();
  const [address, setAddress] = useState('');
  const [cap, setCap] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [hnumber, setHNumber] = useState();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const ADDRESS_REGEX = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
    const CAP_REGEX = new RegExp(/\b\d{5}\b/); 
    const HMNUMBER_REGEX = new RegExp(/^[1-9]$|^[1-9][0-9]$|^(1000)$/);
    const CITY_REGEX = new RegExp(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/);

    const v1 = ADDRESS_REGEX.test(address);
    const v2 = CAP_REGEX.test(cap);
    const v3 = HMNUMBER_REGEX.test(hnumber);
    const v4 = CITY_REGEX.test(city);

    if(!v1 || !v2 || !v3 || !v4) {

        alert('I dati inseriti non solo validi, riprova');

    }else{

      setIsProcessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {        
        },
        redirect: 'if_required'
      });

      if( paymentIntent && paymentIntent.status === "succeeded" ){
        
        if(type === 'order'){
          
          try {

            await axios.post(ORDER_STRIPE_URL, 
                { 
                  shipping_address: address,
                  cap: cap,
                  city: city,
                  province: province,
                  hnumber: hnumber,
                  payment_fee: commissions,
                  shipping_cost: shipping_cost,
                  pickup: pickup,
                  cartItem: cartItem,
                  total: totalWithoutCommissions + commissions,
                },
                {
                  headers: {
                      'Authorization': `Bearer ${auth?.accessToken}`
                  },
                  withCredentials: true
                }
            );
            
          } catch (err) {
              if (!err?.response) {
                  alert(err.response.data);
              } else if (err.response?.status === 500){
                  alert(err.response.data);
              } else {
                  alert('Impossibile registrare l\'ordine!')
              }
          }

        }else if(type === 'barter'){
          
          try {
         
            await axios.post(BARTER_APPROVED_URL, 
                { 
                   barterCode: barterCode,
                   barterRecap: barterRecap,
                   barterInfo: barterInfo,
                   barterEvaluation: barterEvaluation,
                   address: address,
                   cap: cap,
                   city: city,
                   province: province,
                   hnumber: hnumber,
                   shipping_cost: shipping_cost,
                   payment_fee: commissions,
                   totalWithoutCommissions: totalWithoutCommissions,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            formStepSetPayDone();

        
          } catch (err) {
            console.log(err)
            if(!err?.response){
              console.error('Server non attivo!');
            }else if(err.response?.status === 500){
              console.error(err.response?.data);
            }else{
              console.error('Impossibile registrare la permuta!');
            }
          }    
        }

        
      }
    
      if (error) {
        setMessage(error.message);
        setIsProcessing(false);
      }else{
        setIsProcessing(false);
        cookies.remove('cartItem');
        cleanCart();
        if (type === 'order') navigate('/orderSuccess', { replace: true });
        if (type === 'barter') cookies.remove('barterCode');
      }
    }

    
  };

  return (
    <section className='stripePayment'>
      <div className='container stripeGrid'>
        <form id="payment-form" onSubmit={handleSubmit}>
        
          <h2>Totale ordine: {totalWithoutCommissions + commissions} €</h2>

          <h2>Dati spedizione:</h2>

          <div className="txt_field">
                                        
              <label htmlFor='address'>Indirizzo di spedizione:</label>
              <input type="text" 
                  id='address'
                  autoComplete='off' 
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required/>
              
          </div>

          <div className="txt_field">
              
              <label htmlFor='cap'>CAP:</label>
              <input type="text" 
                  id='cap'
                  autoComplete='off' 
                  onChange={(e) => setCap(e.target.value)}
                  value={cap}
                  required/>
              
          </div>

          <div className="txt_field">
              
              <label htmlFor='hnumber'>N° civico:</label>
              <input type="text" 
                  id='hnumber'
                  autoComplete='off' 
                  onChange={(e) => setHNumber(e.target.value)}
                  value={hnumber}
                  required/>
              
          </div>

          <div className="txt_field">
              
              <label htmlFor='cap'>Città:</label>
              <input type="text" 
                  id='city'
                  autoComplete='off' 
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  required/>
              
          </div>

          <div className="txt_field">
              
              <label htmlFor='cap'>Provincia:</label>
              <select 
                  id='province'
                  autoComplete='off' 
                  onChange={(e) => setProvince(e.target.value)}
                  value={province}
                  required>
              
              <option value="">--Scegli una provincia--</option>
              <option value="AG">Agrigento</option>
              <option value="AL">Alessandria</option>
              <option value="AN">Ancona</option>
              <option value="AO">Aosta</option>
              <option value="AR">Arezzo</option>
              <option value="AP">Ascoli Piceno</option>
              <option value="AT">Asti</option>
              <option value="AV">Avellino</option>
              <option value="BA">Bari</option>
              <option value="BT">Barletta-Andria-Trani</option>
              <option value="BL">Belluno</option>
              <option value="BN">Benevento</option>
              <option value="BG">Bergamo</option>
              <option value="BI">Biella</option>
              <option value="BO">Bologna</option>
              <option value="BZ">Bolzano</option>
              <option value="BS">Brescia</option>
              <option value="BR">Brindisi</option>
              <option value="CA">Cagliari</option>
              <option value="CL">Caltanissetta</option>
              <option value="CB">Campobasso</option>
              <option value="CE">Caserta</option>
              <option value="CT">Catania</option>
              <option value="CZ">Catanzaro</option>
              <option value="CH">Chieti</option>
              <option value="CO">Como</option>
              <option value="CS">Cosenza</option>
              <option value="CR">Cremona</option>
              <option value="KR">Crotone</option>
              <option value="CN">Cuneo</option>
              <option value="EN">Enna</option>
              <option value="FM">Fermo</option>
              <option value="FE">Ferrara</option>
              <option value="FI">Firenze</option>
              <option value="FG">Foggia</option>
              <option value="FC">Forl&igrave;-Cesena</option>
              <option value="FR">Frosinone</option>
              <option value="GE">Genova</option>
              <option value="GO">Gorizia</option>
              <option value="GR">Grosseto</option>
              <option value="IM">Imperia</option>
              <option value="IS">Isernia</option>
              <option value="AQ">L'aquila</option>
              <option value="SP">La spezia</option>
              <option value="LT">Latina</option>
              <option value="LE">Lecce</option>
              <option value="LC">Lecco</option>
              <option value="LI">Livorno</option>
              <option value="LO">Lodi</option>
              <option value="LU">Lucca</option>
              <option value="MC">Macerata</option>
              <option value="MN">Mantova</option>
              <option value="MS">Massa-Carrara</option>
              <option value="MT">Matera</option>
              <option value="ME">Messina</option>
              <option value="MI">Milano</option>
              <option value="MO">Modena</option>
              <option value="MB">Monza e Brianza</option>
              <option value="NA">Napoli</option>
              <option value="NO">Novara</option>
              <option value="NU">Nuoro</option>
              <option value="OR">Oristano</option>
              <option value="PD">Padova</option>
              <option value="PA">Palermo</option>
              <option value="PR">Parma</option>
              <option value="PV">Pavia</option>
              <option value="PG">Perugia</option>
              <option value="PU">Pesaro e Urbino</option>
              <option value="PE">Pescara</option>
              <option value="PC">Piacenza</option>
              <option value="PI">Pisa</option>
              <option value="PT">Pistoia</option>
              <option value="PN">Pordenone</option>
              <option value="PZ">Potenza</option>
              <option value="PO">Prato</option>
              <option value="RG">Ragusa</option>
              <option value="RA">Ravenna</option>
              <option value="RC">Reggio Calabria</option>
              <option value="RE">Reggio Emilia</option>
              <option value="RI">Rieti</option>
              <option value="RN">Rimini</option>
              <option value="RM">Roma</option>
              <option value="RO">Rovigo</option>
              <option value="SA">Salerno</option>
              <option value="SS">Sassari</option>
              <option value="SV">Savona</option>
              <option value="SI">Siena</option>
              <option value="SR">Siracusa</option>
              <option value="SO">Sondrio</option>
              <option value="SU">Sud Sardegna</option>
              <option value="TA">Taranto</option>
              <option value="TE">Teramo</option>
              <option value="TR">Terni</option>
              <option value="TO">Torino</option>
              <option value="TP">Trapani</option>
              <option value="TN">Trento</option>
              <option value="TV">Treviso</option>
              <option value="TS">Trieste</option>
              <option value="UD">Udine</option>
              <option value="VA">Varese</option>
              <option value="VE">Venezia</option>
              <option value="VB">Verbano-Cusio-Ossola</option>
              <option value="VC">Vercelli</option>
              <option value="VR">Verona</option>
              <option value="VV">Vibo valentia</option>
              <option value="VI">Vicenza</option>
              <option value="VT">Viterbo</option>
              
              </select>
              
          </div>

          </form>
        
          <form id="payment-form" onSubmit={handleSubmit}>

          <PaymentElement />
          
          <div className='stripeBtn'>
            <button disabled={isProcessing} id='submit' form='payment-form'>
              <span id='button-text'>
                {isProcessing ? "Pagamento in corso..." : "Paga adesso"}
              </span>
            </button>
          </div>
          
          {
            message && 
              <div id="payment-message">
                {message}
              </div>
          }
        </form>
      </div>
    </section>
    
  )
}

export default CheckoutForm