import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import './barter.css'
import ClockLoader from 'react-spinners/ClockLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';


const Barter = () => {

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

    const CATEGORY_URL = '/api/product/categories';
    const BRANDS_URL = '/api/product/brands';
    const PRODUCT_LIST_URL = '/api/product/getProductOptions';
    const BARTER_STORE_URL = '/api/barter/createBarter';
    const BARTER_STATUS_URL = '/api/barter/barterStatus';

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

    const getFilteredItems = async () => {

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
    
      useEffect(() => {
    
        getFilteredItems();
        setModelRecharge(true);
    
        // eslint-disable-next-line
      }, [categoryChoice, brandChoice, statusChoice]);

        
        
    useEffect(() => {

        if (categoryOptions.length === 0){
            getCategories();
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

 
    const storeBarter = async () => {

        let barterItem = {};

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

    useEffect(()=>{
        
        const interval = setInterval(() => {

            if(newBarterCode !== 0 && barterStatus === 'In lavorazione') updateBarter(newBarterCode);
          }, 2000);
        
          return () => clearInterval(interval); 

        // eslint-disable-next-line
    },[newBarterCode, barterStatus])
      
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
                                                                        : <button disabled className='disabled' onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
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
                                <button className={barterStatus === 'In lavorazione' ? 'hidden' : ''} onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
                            </div> 
                        </div>
                        <div className={formStepsNum === 5 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Conferma permuta</h2>
                                
                                <p>Riepilogo permuta...</p>
                            </div>

                            
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 6 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Pagamento</h2>
                                
                               
                            </div>

                            
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 7 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Permuta completata</h2>
                                
                               
                            </div>

                            
                            <div className='btnForm'>
                                <button className='disabled' onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={() => navigate('/userDashboard/home')}>Vai alla dashboard</button>
                            </div>    
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Barter