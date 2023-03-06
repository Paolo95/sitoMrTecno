import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import './barter.css'
import ClockLoader from 'react-spinners/ClockLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Cookies from 'universal-cookie';


const Barter = () => {

    const cookies = new Cookies();

    const [formStepsNum, setFormStepsNum] = useState(1);
    const [categoryOptions, setCategories] = useState([]);
    const [categoryChoice, setCategoryChoice] = useState('');
    const [statusChoice, setStatusChoice] = useState('');
    const [brandChoice, setBrandChoice] = useState('');
    const [modelChoice, setModelChoice] = useState('');
    const [qty, setQtyChoice] = useState(1);
    const [prodBarterNames, setProdBarterNames] = useState({});
    const [prodBarterDesc, setProdBarterDesc] = useState({});
    const [brandRecharge, setBrandRecharge] = useState(false)
    const [modelRecharge, setModelRecharge] = useState(false);
    const [descriptionsFilled, setDescriptionsFilled] = useState(false)
    const [namesFilled, setNamesFilled] = useState(false);
    const [telephoneFilled, setTelephoneFilled] = useState(false);
    const [barterTelephone, setBarterTelephone] = useState('');
    const [newBarterCode, setNewBarterCode] = useState(0);
    const [barterStatus, setBarterStatus] = useState('In lavorazione');
    const [barterRecap, setBarterRecap] = useState('');
    const [barterTotal, setBarterTotal] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [payPalCommissions, setPayPalCommissions] = useState(0);
    const [shipping_cost, setShippingCost] = useState(9.99);
    const [showDisclamer, setShowDisclamer] = useState(false);
    const [address, setAddress] = useState('');
    const [cap, setCap] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [hnumber, setHNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const CATEGORY_URL = '/api/product/categories';
    const BRANDS_URL = '/api/product/brands';
    const PRODUCT_LIST_URL = '/api/product/getProductOptions';
    const BARTER_STORE_URL = '/api/barter/createBarter';
    const BARTER_STATUS_URL = '/api/barter/barterStatus';
    const BARTER_TOTAL_URL = '/api/barter/barterTotal';
    const BARTER_INFO_URL = '/api/barter/barterInfo';
    const PRODUCT_PRICE_URL = '/api/product/productPrice';
    const BARTER_APPROVED_URL = '/api/barter/barterAccepted';
    const BARTER_BANK_TRANSFER_URL = '/api/barter/barterAcceptedBT';

    const validTelephone = new RegExp(/^(([+])39)?((3[1-6][0-9]))(\d{7})$/);

    const { auth } = useAuth();

    const navigate = useNavigate();
  
    const statusChoiceHandler = (options) => {
        setModelChoice('');
        setStatusChoice(options.value);
    }

    const qtyChoiceHandler = (options) => {
        
        setQtyChoice(options.value);
    }

    const categoryChoiceHandler = (options) => {
  
        setModelChoice('');
        setBrandChoice('');
        setCategoryChoice(options.value);
    }

    const brandChoiceHandler = (options) => {
  
        setModelChoice('');
        setBrandChoice(options.value);
    }

    const modelChoiceHandler = (options) => {
  
        setModelChoice(options.value);
    }

    const handlerProdBarterName = (item, index) => {
        
        setProdBarterNames(prodBarterNames => ({
            ...prodBarterNames,
            [index] : item.target.value
        }));
        
    }

    const handlerProdDescription = (item, index) => {
        
        setProdBarterDesc(prodBarterDesc => ({
            ...prodBarterDesc,
            [index] : item.target.value
        }));
    }

    const handlerBarterTelephone = (e) => {

        setBarterTelephone(e.target.value);

    }

    useEffect(() => {

        setProdBarterDesc({})
        setProdBarterNames({})
        
    },[qty])

    useEffect(() => {

        if (!Object.values(prodBarterNames).includes('') && 
                Object.keys(prodBarterNames).length !== 0 && 
                    Object.keys(prodBarterNames).length === qty) setNamesFilled(true) 
        if (Object.values(prodBarterNames).includes('') || Object.keys(prodBarterNames).length === 0 ) setNamesFilled(false) 
        
    },[prodBarterNames, qty])

    useEffect(() => {
        
        if (!Object.values(prodBarterDesc).includes('') && 
                Object.keys(prodBarterDesc).length !== 0 && 
                    Object.keys(prodBarterDesc).length === qty) setDescriptionsFilled(true) 
        if (Object.values(prodBarterDesc).includes('')) setDescriptionsFilled(false)   
        
    },[prodBarterDesc, qty])

    useEffect(() => {
        
        if (validTelephone.test(barterTelephone)){
            setTelephoneFilled(true);
        }else{
            setTelephoneFilled(false);
        }
        //eslint-disable-next-line
    },[barterTelephone, qty])

    useEffect(() => {
        
        if(categoryChoice === 'PC' || categoryChoice === 'Notebook') {
            setShippingCost(19.99)
        }

        if(formStepsNum === 6){
        
            setPayPalCommissions(Math.round((((shipping_cost + productPrice) * 3) / 100) * 100) / 100);
            setTotalPrice(Math.round((payPalCommissions + productPrice + shipping_cost) * 100) / 100);

        } 

    },[formStepsNum, productPrice, categoryChoice, totalPrice, payPalCommissions, shipping_cost])

    const getFilteredItems = async () => {

        if (!cookies.get('barterCode')){
            try {
    
                const response = await axios.post(PRODUCT_LIST_URL, 
                    { 
                        categoryChecked: categoryChoice,
                        brandChecked: brandChoice,
                        status: statusChoice,
                    },
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                    );
          
                    setModelRecharge(false)
                    return response.data.map((item) => ({
                        "value" : item.product_name, 
                        "label": item.product_name + ' - ' + parseFloat(item.price).toFixed(2) + '€'
                    }))         
          
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
        
        
    
      }
    
      useEffect(() => {
    
        getFilteredItems();
        setModelRecharge(true);

        // eslint-disable-next-line
      }, [categoryChoice, brandChoice, statusChoice]);

        
        
    useEffect(() => {

        if (categoryOptions.length === 0){
            getCategories();
        }

        if(newBarterCode === 0){
            setNewBarterCode(cookies.get('barterCode') || 0)
            if (cookies.get('barterCode') > 0) {
                setFormStepsNum(4);
                barterInfo(cookies.get('barterCode'));
            }
        }
        

    // eslint-disable-next-line
    },[])

    const qtyOptions = [
        {value : 1, label : '1'},
        {value : 2, label : '2'},
        {value : 3, label : '3'},
        {value : 4, label : '4'},
        {value : 5, label : '5'},
        {value : 6, label : '6'},
        {value : 7, label : '7'},
        {value : 8, label : '8'},
        {value : 9, label : '9'},
        {value : 10, label : '10'},
    ]

    const statusOptions = [
        {value : 'Ricondizionato', label : 'Ricondizionato'},
        {value : 'Nuovo', label : 'Nuovo'},
    ]

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

    const getBrands = async () => {

        if(!cookies.get('barterCode')){
            try {
         
                const response = await axios.post(BRANDS_URL, 
                  { 
                      categoryChecked: categoryChoice
                  },
                  {
                      headers: { 'Content-Type': 'application/json'},
                      withCredentials: true
                  }
                  );
      
                  setBrandRecharge(false)
                  setModelRecharge(false)
                  return response.data.map((item) => ({
                      "value" : item.brandName,
                      "label" : item.brandName
                  }))
              
                     
          
              } catch (err) {
                if(!err?.response){
                  console.error('Server non attivo!');
                }else if(err.response?.status === 500){
                  console.error(err.response?.data);
                }else{
                  console.error('Recupero brand fallito!');
                }
              }    
        }
        
    
      }
    
      useEffect(() => {

        getBrands();
        setModelRecharge(true);
        setBrandRecharge(true);

      // eslint-disable-next-line
      }, [categoryChoice]);
    

    const updateFormSteps = (e, btnType) =>{

        e.preventDefault();
        if (btnType === 'prev') setFormStepsNum( formStepsNum - 1 );
        if (btnType === 'next') setFormStepsNum( formStepsNum + 1 );
    }

    const getCategories = async () => {

        if(!cookies.get('barterCode')){
            try {
        
                const response = await axios.get(CATEGORY_URL, 
                    { 
                    
                    },
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                    );
        
                    setCategories(response.data);
                    return response.data.map((item) => ({
                        "value" : item.category,
                        "label" : item.category
                    }));
            
                } catch (err) {
                if(!err?.response){
                    console.error('Server non attivo!');
                }else if(err.response?.status === 500){
                    console.error(err.response?.data);
                }else{
                    console.error('Recupero categorie fallito!');
                }
                }    
        }
        
    
    }

    const barterInfo = async (barterCode) => {

        try {
        
        const response = await axios.post(BARTER_INFO_URL, 
            { 
                id: barterCode
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );

            setBarterStatus(response.data.status);
            setBarterRecap(response.data.barter_items)
            setStatusChoice(response.data['product.status'])
            setModelChoice(response.data['product.product_name'])
                
        } catch (err) {
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Recupero informazioni permuta fallito!');
        }
        }    
    
    }

 
    const storeBarter = async () => {

        let barterItem = {};
        const now = new Date();

        Object.values(prodBarterNames).forEach((itemName, indexName) => {
            Object.values(prodBarterDesc).forEach((itemDesc, indexDesc) => {
                if(indexName === indexDesc){
                    barterItem = ({
                        ...barterItem,
                        [indexName] : {'name': itemName, 'description': itemDesc}
                    })
                }
            })
        })

        setBarterRecap(JSON.stringify(barterItem));

        try {
         
            const response = await axios.post(BARTER_STORE_URL, 
                { 
                    barterItem: JSON.stringify(barterItem),
                    modelChoice: modelChoice,
                    telephone: barterTelephone,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );

            cookies.set('barterCode', response.data.id, {
                path: '/',
                expires: new Date(now.getFullYear(), now.getMonth(), now.getDate()+7)
            })

            setNewBarterCode(response.data.id); 
    
        } catch (err) {
          if(!err?.response){
            console.error('Server non attivo!');
          }else if(err.response?.status === 500){
            console.error(err.response?.data);
          }else{
            console.error('Memorizzazione della permuta fallita!');
          }
        }    
    
    }

    const updateBarter = async (barterCode) => {

        try {
         
            const response = await axios.post(BARTER_STATUS_URL, 
                { 
                    id: barterCode,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );

            setBarterStatus(response.data.status);
    
        } catch (err) {
          if(!err?.response){
            console.error('Server non attivo!');
          }else if(err.response?.status === 500){
            console.error(err.response?.data);
          }else{
            console.error('Recupero informazioni della permuta fallito!');
          }
        }    
    
    }

    const barterValutation = async (barterCode) => {
        
        try {
         
            const response = await axios.post(BARTER_TOTAL_URL, 
                { 
                    id: barterCode,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );
            
            setBarterTotal(response.data.total);
    
        } catch (err) {
          if(!err?.response){
            console.error('Server non attivo!');
          }else if(err.response?.status === 500){
            console.error(err.response?.data);
          }else{
            console.error('Recupero totale della permuta fallito!');
          }
        }    
    
    }

    const ButtonWrapper = () => {
        
        const [{ isPending }] = usePayPalScriptReducer();

        return(
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
                        :  
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
                                                        value: productPrice,
                                                        currency_code: "EUR",
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
                                            }, "items": [
                                                    {
                                                            name: modelChoice,
                                                            unit_amount: {
                                                                currency_code: "EUR",
                                                                value: productPrice
                                                            },
                                                            quantity: 1,
                                                    },
                                            ],                                                         
                                        },
                                    ],
                                });
                            }}

                            onApprove={(data, actions) => {
                                return actions.order.capture().then(function (details) {
                                    setBarterApproved();
                                    setFormStepsNum(formStepsNum + 1);
                                    cookies.remove('barterCode');
                                })
                            }}

                        />
                }
            </>
        )
    }

    const getProductPrice = async (productName) => {
    
        try {
         
            const response = await axios.post(PRODUCT_PRICE_URL, 
                { 
                    prodName: productName,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );

            setProductPrice(response.data.price);
    
        } catch (err) {
          if(!err?.response){
            console.error('Server non attivo!');
          }else if(err.response?.status === 500){
            console.error(err.response?.data);
          }else{
            console.error('Recupero prezzo del prodotto fallito!');
          }
        }    
    
    }

    const setBarterApproved = async () => {

        try {
         
            await axios.post(BARTER_APPROVED_URL, 
                { 
                   barterCode: newBarterCode,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            
    
        } catch (err) {
          if(!err?.response){
            console.error('Server non attivo!');
          }else if(err.response?.status === 500){
            console.error(err.response?.data);
          }else{
            console.error('Recupero prezzo del prodotto fallito!');
          }
        }    
    }

    useEffect(()=>{
        
        const interval = setInterval(() => {

            if(newBarterCode !== 0 && barterStatus === 'In lavorazione') updateBarter(newBarterCode);
        
        }, 60000);
        
        return () => clearInterval(interval); 

        // eslint-disable-next-line
    },[newBarterCode, barterStatus])

    useEffect(() => {
        
        if (newBarterCode !== 0 || barterStatus !== 'In lavorazione') barterValutation(newBarterCode);
        
        // eslint-disable-next-line
    },[newBarterCode, barterStatus])

    const bankTransferDisclamer = () => {
        
        setShowDisclamer(true);
    
    }
    
    const newBarterBankTransfer = async () => {

        setLoading(true);
        
        try {
            
            await axios.post(BARTER_BANK_TRANSFER_URL, 
                { 
                    barterCode: newBarterCode,
                    shipping_address: address,
                    cap: cap,
                    hnumber: hnumber,
                    city: city,
                    shipping_cost: shipping_cost,
                    paypal_fee: 0,
                    product_price: productPrice,
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
                alert('Impossibile registrare la permuta!')
            }
        }

        

    }
    
    const handleNewBarterBankTransfer = (e) => {

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
            newBarterBankTransfer();
            setFormStepsNum(formStepsNum + 1);
            cookies.remove('barterCode');
        }
    }

    return (
        <section className='barter'>
            <div className='container'>
                <div className="barter-div">
                    <form action='#' className='form'>
                        <h1>Permuta</h1>
                        <div className="progressBar">
                            <div className="progress" id='progress' style={{width: `${((formStepsNum - 1) / (6)) * 100 }%`}}></div>
                            <div className={formStepsNum >= 1 ? "progress-step progress-step-active" : "progress-step"} data-title='Intro'></div>
                            <div className={formStepsNum >= 2 ? "progress-step progress-step-active" : "progress-step"} data-title='Scelta prodotto'></div>
                            <div className={formStepsNum >= 3 ? "progress-step progress-step-active" : "progress-step"} data-title='Descrizione oggetti'></div>
                            <div className={formStepsNum >= 4 ? "progress-step progress-step-active" : "progress-step"} data-title='Valutazione'></div>
                            <div className={formStepsNum >= 5 ? "progress-step progress-step-active" : "progress-step"} data-title='Conferma'></div>
                            <div className={formStepsNum >= 6 ? "progress-step progress-step-active" : "progress-step"} data-title='Pagamento'></div>
                            <div className={formStepsNum >= 7 ? "progress-step progress-step-active" : "progress-step"} data-title='Completato'></div>
                        </div>
                        <div className={formStepsNum === 1 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <p>Benvenuto nella sezione permuta!</p>
                                <p>Segui i passaggi per ottenere l'oggetto che desideri ad un prezzo super conveniente!</p>
                                <p>Se non hai ben chiaro come funziona il tutto, visita la pagina <u><a href="/faq"><b>FAQ's</b></a></u> per ulteriori informazioni!</p> 
                                <p><b>DISCLAMER:</b> il processo di permuta richiede una valutazione dei prodotti da permutare effettuata da un operatore. Prosegui solo se sei veramente interessato, grazie!</p>
                            </div>
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'hidden' : ''} 
                                        onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>

                                <button onClick={(e) => updateFormSteps(e, 'next')}>Successivo</button>
                            </div>
                           
                        </div>
                        <div className={formStepsNum === 2 ? "form-step-active": "form-step"}>
                        <h2>Scegli il prodotto che desideri</h2>
                            <div className="txt_field">
                                <label htmlFor='username'>Stato:</label>
                                <Select 
                                    options={statusOptions}
                                    onChange={statusChoiceHandler}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    placeholder='Seleziona lo stato...'
                                    />
                            </div>
                            <div className="txt_field">
                                
                                <label htmlFor='username'>Categoria:</label>
                                <AsyncSelect 
                                    cacheOptions
                                    defaultOptions
                                    noOptionsMessage={() => 'Nessuna categoria'}
                                    onChange={categoryChoiceHandler}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    loadOptions={getCategories}
                                    getOptionLabel={e => e.label}
                                    getOptionValue={e => e.value}
                                    placeholder='Seleziona la categoria...'
                                    />
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Brand:</label>
                                {
                                    brandRecharge ? 
                                        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                            <ClipLoader
                                                color={'#0f3460'}
                                                loading={brandRecharge}
                                                size={50}
                                            />
                                        </div>
                                             :
                                             <AsyncSelect 
                                                cacheOptions
                                                defaultOptions
                                                onChange={brandChoiceHandler}
                                                styles={styles}
                                                isClearable={false}
                                                isSearchable={false}
                                                loadOptions={getBrands}
                                                getOptionLabel={e => e.label}
                                                getOptionValue={e => e.value}
                                                placeholder='Seleziona il brand...'
                                                />
                                }
                                
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Modello:</label>
                                {
                                    modelRecharge ? 
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                        <ClipLoader
                                            color={'#0f3460'}
                                            loading={modelRecharge}
                                            size={50}
                                        />
                                    </div>
                                         :
                                         <AsyncSelect 
                                            cacheOptions
                                            defaultOptions
                                            onChange={modelChoiceHandler}
                                            styles={styles}
                                            isClearable={false}
                                            isSearchable={false}
                                            loadOptions={getFilteredItems}
                                            getOptionLabel={e => e.label}
                                            getOptionValue={e => e.value}
                                            placeholder='Seleziona il modello...'
                                            />
                                }
                               
                            </div>
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} 
                                        onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>

                                <button disabled={categoryChoice === '' || brandChoice === '' || statusChoice === '' || modelChoice === ''} 
                                        className={categoryChoice === '' || brandChoice === '' || statusChoice === '' || modelChoice === '' ? 'disabled' : ''}
                                        onClick={(e) => updateFormSteps(e, 'next')}>Successivo</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 3 ? "form-step-active": "form-step"}>
                            <h2>Descrivi i prodotti da permutare</h2>
                            <div className="txt_field">                                
                                <label htmlFor='username'>Quanti prodotti vuoi permutare?</label>
                                <Select 
                                    options={qtyOptions}
                                    onChange={qtyChoiceHandler}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    defaultValue={{ label: "1", value: 1 }}
                                    placeholder='Seleziona quanti prodotti vuoi permutare...'
                                    />
                            </div>
                            
                            {
                                [...Array(qty)].map((item, i) => {
                                    return(
                                        <div key={i}>
                                            <div className="txt_field">
                                            <label htmlFor='username'>Nome Prodotto:</label>
                                            <input type="text"
                                                   onChange={(e) => handlerProdBarterName(e,i)} 
                                                   placeholder='Esempio: Samsung Galaxy S2'
                                                   className='prodNameInput'
                                                   value={Object.values(prodBarterNames)[i] || ''}
                                                   />
                                            </div>
                                            <div className="txt_field">
                                            <label htmlFor='username'>Descrizione prodotto da permutare:</label>
                                            <textarea
                                                rows={10}
                                                placeholder='Esempio: iPhone X con pochi graffi e batteria al 70%'
                                                onChange={(e) => handlerProdDescription(e,i)}
                                                maxLength={200}
                                                value={Object.values(prodBarterDesc)[i] || ''}
                                                />                            
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className='txt_field'>
                                <label htmlFor='username'>Numero di telefono da cui invierai le foto:</label>
                                <input type="text"
                                        onChange={(e) => handlerBarterTelephone(e)} 
                                        placeholder='Digita il tuo numero di telefono...'
                                        className='prodNameInput'
                                        />
                            </div>

                            
                            <div className='txt_field'>
                                <a className='whatsAppBtn' href="https://api.whatsapp.com/send?phone=3397619766">Manda le foto su WhatsApp Business!</a>
                            </div>
                            
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                {
                                    (namesFilled && descriptionsFilled && telephoneFilled) ? <button onClick={(e) => {storeBarter();  updateFormSteps(e,'next')}}>Successivo</button>
                                                                        : <button disabled className='disabled' onClick={(e) => {updateFormSteps(e,'next'); }}>Successivo</button>
                                }
                                
                            </div>    
                        </div>
                        <div className={formStepsNum === 4 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Valutazione degli oggetti</h2>
                                {
                                    (barterStatus === 'In lavorazione') ? <>
                                                        <p>Stiamo valutando la tua proposta di permuta. <br/> Puoi rimanere su questa pagina o controllare lo stato
                                                            della richiesta nella tua area personale. 
                                                        </p>
                                                
                                                        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                                            <ClockLoader
                                                                color={'#0f3460'}
                                                                loading={barterStatus === 'In lavorazione'}
                                                                size={60}
                                                            />
                                                        </div>
                                                      </>
                                                      :
                                                      <>
                                                      <div className='barterAccepted'>
                                                        <p>
                                                            La tua proposta di permuta è stata approvata!
                                                        </p>

                                                        <i className="far fa-check-circle"></i>
                                                      </div>
                                                      
                                                      
                                                      </>
                                }
                                    
                            </div>  
                            <div className='btnForm'>
                                <button className={formStepsNum === 4 ? 'hidden' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button className={barterStatus === 'In lavorazione' ? 'hidden' : ''} onClick={(e) => {updateFormSteps(e,'next'); getProductPrice(modelChoice)}}>Successivo</button>
                            </div> 
                        </div>
                        <div className={formStepsNum === 5 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Riepilogo permuta</h2>
                                <div className="barter-grid">
                                    <div className="barter-recap">
                                        <h3>Prodotto desiderato:</h3>
                                        { productPrice === 0 ?
                                             
                                             <ClipLoader
                                                 color={'#0f3460'}
                                                 loading={productPrice === 0}
                                                 size={30}
                                             />
                                         :
                                            <span>{modelChoice} - {productPrice.toFixed(2)}€</span>
                                        }
                                        
                                    </div>
                                    <div className="barter-recap">
                                        <h3>Stato:</h3>
                                        <span>{statusChoice}</span>
                                    </div>
                                    <div className="barter-recap-userProducts">
                                        <h3>Prodotti permutati:</h3>
                                        <ol className='barter-recap-ol'>                                      
                                        {
                                            barterRecap.length > 1 ? 
                                                Object.values(JSON.parse(barterRecap)).map((item, index) => {
                                                    return(
                                                        <li key={index}>{item.name}</li>
                                                    )
                                                })
                                            : null
                                        }
                                        </ol>
                                    </div>
                                    <div className="barter-recap-finalPrice">
                                        <div className='finalPrice-div'>
                                            <h3>Prezzo finale del prodotto desiderato:</h3>
                                            <span className='final-price'>{parseFloat(barterTotal).toFixed(2)}€</span>
                                        </div>
                                        <div className='finalPrice-div'>
                                            <h4>+ Spese di spedizione: </h4>
                                            <span className='shipping'>{parseFloat(shipping_cost).toFixed(2)}€</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e,'next')}>Conferma</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 6 ? "form-step-active": "form-step"}>
                            
                                {
                                    totalPrice !== 0 ? 

                                        (!showDisclamer) ? 
                                    
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
                                        :
                                        <div className='bank-transfer-container'>
                                            <div className="bank-transfer-heading">
                                                <h1>Istruzioni per il bonifico</h1>
                                            </div>
                                            <div className='bank-transfer-body'>
                                                <p>
                                                    Cliccando sul bottone in basso, prendi l'impegno di pagare il prodotto con bonifico bancario.
                                                </p>

                                                <p>
                                                    Riceverai via mail tutte le informazioni (intestatario del bonifico, causale) per 
                                                    effettuare il bonifico.
                                                </p>

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
                                                                <button onClick={handleNewBarterBankTransfer}>Conferma ordine</button>    
                                                            </div>  
                                                    }
                                                
                                            </div>   

                                                                
                    
                                        </div>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                                        <ClockLoader
                                            color={'#0f3460'}
                                            loading={totalPrice === 0}
                                            size={60}
                                        />
                                    </div>
                                    
                                }
                                
                                
                               
                            
   
                        </div>
                        <div className={formStepsNum === 7 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Permuta completata</h2>
                                <p>Complimenti! Il pagamento è andato a buon fine. A breve riceverai il rimborso pattuito!</p>
                               
                            </div>

                            
                            <div className='btnForm'>
                                <button className='hidden' onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={() => navigate('/userDashboard/barters')}>Vai alla dashboard</button>
                            </div>    
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Barter