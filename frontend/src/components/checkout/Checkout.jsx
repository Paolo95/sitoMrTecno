import React from 'react';
import './Style.css';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from '../../api/axios'
import useAuth from "../../hooks/useAuth";
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ClipLoader from 'react-spinners/ClipLoader';


const Checkout = ({ cleanCart, cartItem }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => navigate(-1);
    const ORDER_URL = '/api/order/newOrder';
    const ORDER_BANK_TRANSFER_URL = '/api/order/newOrderBT';
    const PRODUCT_AVAILABILITY_URL = '/api/product/checkAvailability';
    const [availability, setAvailability] = React.useState('false');
    const [showDisclamer, setShowDisclamer] = React.useState(false);
    const cookies = new Cookies();
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const [cap, setCap] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [hnumber, setHNumber] = React.useState();

    let shipping_cost = location.state?.shipping_cost;

    const totalWithoutCommissions = cartItem.reduce((price, item) => price + item.qty * item.price, shipping_cost);
    const netTotal = Math.round((totalWithoutCommissions - shipping_cost) * 100) / 100;
    const payPalCommissions = Math.round(((totalWithoutCommissions * 3) / 100) * 100) / 100;
    const totalPrice = Math.round((payPalCommissions + totalWithoutCommissions) * 100) / 100;

    const { auth } = useAuth();

    useEffect(() => {

        const getAvailability = async () => {

            try {

                const response = await axios.post(PRODUCT_AVAILABILITY_URL, 
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

            } catch (err) {
                if (err.response?.status === 500){
                    alert(err.response.data);
                } else {
                    alert('Impossibile verificare la disponibilità!')
                }
            }                     
            
        }

        getAvailability();  

    })

    useEffect(()=> {

        if(!(typeof(shipping_cost) === 'number')) navigate('/cart', { replace: true });

    },[shipping_cost, cartItem, navigate])

    const newOrder = async (orderDetails) => {

        try {

            await axios.post(ORDER_URL, 
                { 
                  paypalDetails: orderDetails,
                  pickup: location.state.pickup,
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
    
    const ButtonWrapper = () => {

        const [{ isPending }] = usePayPalScriptReducer();

        return (
            <>            
                {                  
                    
                    isPending ?                        
                
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                <ClipLoader
                                color={'#0f3460'}
                                loading={isPending}
                                size={50}
                                />
                            </div>  
                                
                        : <PayPalButtons
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
        
                            const response = await axios.post(PRODUCT_AVAILABILITY_URL, 
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
                        
                }
            
            </>
        )
    }

    const bankTransferDisclamer = () => {
        
        setShowDisclamer(true);
    
    } 

    const newOrderBankTransfer = async () => {

        setLoading(true);
        
        try {
            
            await axios.post(ORDER_BANK_TRANSFER_URL, 
                { 
                    cartItem: cartItem,
                    shipping_address: address,
                    cap: cap,
                    hnumber: hnumber,
                    city: city,
                    province: province,
                    pickup: location.state.pickup,
                    shipping_cost: shipping_cost,
                    paypal_fee: 0,
                    totalWithoutCommissions: totalWithoutCommissions,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );
    
            setLoading(false);

        } catch (err) {

            if (!err?.response) {
                alert(err.response.data);
            } else if (err.response?.status === 500){
                alert(err.response.data);
            } else {
                alert('Impossibile registrare l\'ordine!')
            }
        }

        

    }

    const handleNewOrderBankTransfer = (e) => {

        e.preventDefault();

        const ADDRESS_REGEX = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
        const CAP_REGEX = new RegExp(/\b\d{5}\b/); 
        const HMNUMBER_REGEX = new RegExp(/^[1-9]$|^[1-9][0-9]$|^(1000)$/);
        const CITY_REGEX = new RegExp(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/);

        const v1 = ADDRESS_REGEX.test(address);
        const v2 = CAP_REGEX.test(cap);
        const v3 = HMNUMBER_REGEX.test(hnumber);
        const v4 = CITY_REGEX.test(city);

        if(!v1 || !v2 || !v3 || !v4) {
            alert('I dati inseriti non solo validi, riprova')
        }else{
            newOrderBankTransfer();
            cookies.remove('cartItem');
            cleanCart();
            navigate('/orderSuccess', { replace: true });
        }
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
                    
                    : (!showDisclamer) ? (
                        <div className="paypal-button-container">
                            <div className="checkout-txt">
                                <h1 className='checkout-span'>Scegli il metodo di pagamento</h1>
                            </div> 
                            
                            <PayPalScriptProvider options={
                                    {
                                        "client-id": "ATZNHaB7fylPEKToWL-_Cnzb2WIdfxNHMK7JFACI0K48o6vV2UukiwQ72XFU-fG7dKK3I9bi6RT1_qzy",
                                        currency: "EUR"
                                    }}>
                                <ButtonWrapper/>
                            </PayPalScriptProvider>
                             
                            <div className='bank-transfer'>
                                <h4>Oppure:</h4>
                                <button onClick={bankTransferDisclamer}>Paga con bonifico bancario</button>
                            </div>
                        </div>
                    
                    ) : (
                        <div className='bank-transfer-container'>
                            <div className="bank-transfer-heading">
                                <h1>Istruzioni per il bonifico</h1>
                            </div>
                            <div className='bank-transfer-body'>
                                <p>
                                    Cliccando sul bottone in basso, si procede alla creazione di un nuovo ordine.
                                </p>

                                <p>
                                    Riceverai via mail tutte le informazioni (intestatario del bonifico, causale) per 
                                    effettuare il bonifico.
                                </p>

                                <form id='checkoutForm' onSubmit={handleNewOrderBankTransfer}>

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

                                    {
                                        loading ? 
                                            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                                <ClipLoader
                                                color={'#0f3460'}
                                                loading={loading}
                                                size={50}
                                                />
                                            </div>
                                            :
                                            <div className='btnDiv'>
                                                <button onClick={() => setShowDisclamer(false)}>Torna indietro</button>
                                                <button form='checkoutForm' type='submit'>Conferma ordine</button>    
                                            </div>  
                                    }
                                    

                                </form>
                                
                            </div>   

                                                   
    
                        </div>
                    )
                }
            
        </div>
            
    </section>
        
    )
}

export default Checkout

