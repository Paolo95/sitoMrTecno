import Select from 'react-select';
import './barter.css'
import ClockLoader from 'react-spinners/ClockLoader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';


const Barter = () => {

    const [formStepsNum, setFormStepsNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [categoryOptions, setCategories] = useState([]);
    const [uniqueBrands, setBrands] = useState([]);
    const [categoryChoice, setCategoryChoice] = useState('');
    const [statusChoice, setStatusChoice] = useState('');
    const [brandChoice, setBrandChoice] = useState('');
    const [shopItems, setShopItems] = useState([]);

    const CATEGORY_URL = '/api/product/categories';
    const BRANDS_URL = '/api/product/brands';
    const PRODUCT_LIST_URL = '/api/product/getProductOptions';

    const navigate = useNavigate();

    
    const statusChoiceHandler = (options) => {
  
        setStatusChoice(options.value);
    }

    const categoryChoiceHandler = (options) => {
  
        setCategoryChoice(options.value);
    }

    const brandChoiceHandler = (options) => {
  
        setBrandChoice(options.value);
    }

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
      
              setLoading(false)
              setShopItems(response.data);           
      
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
    
        setLoading(true);
        getFilteredItems();
    
        // eslint-disable-next-line
      }, [categoryChoice, brandChoice, statusChoice]);

    useEffect(() => {

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

    if (categoryOptions.length === 0){
        getCategories();
    }

    // eslint-disable-next-line
    },[])

    const catOptions = categoryOptions.map((item) => ({
        "value" : item.category,
        "label" : item.category
    }))

    const brandOptions = uniqueBrands.map((item) => ({
        "value" : item.brandName,
        "label" : item.brandName
    }))

    const statusOptions = [
        {value : 'Ricondizionato', label : 'Ricondizionato'},
        {value : 'Nuovo', label : 'Nuovo'},
    ]

    
    const modOptions = shopItems.map((item) => ({
        "value" : item.product_name, label: item.product_name
    }))
    

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
    
            setLoading(false);
            setBrands(response.data);
               
    
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
    
        // eslint-disable-next-line
      }, [categoryChoice]);
    

    const updateFormSteps = (e, btnType) =>{

        e.preventDefault();
        if (btnType === 'prev') setFormStepsNum( formStepsNum - 1 );
        if (btnType === 'next') setFormStepsNum( formStepsNum + 1 );
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
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
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
                                <Select 
                                    options={catOptions}
                                    onChange={categoryChoiceHandler}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    placeholder='Seleziona la categoria...'
                                    />
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Brand:</label>
                                <Select 
                                    options={brandOptions}
                                    onChange={brandChoiceHandler}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    placeholder='Seleziona il brand...'
                                    />
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Modello:</label>
                                <Select 
                                    options={modOptions}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    placeholder='Seleziona il modello...'
                                    />
                            </div>
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e, 'next')}>Successivo</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 3 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Descrivi i prodotti da permutare</h2>
                                <label htmlFor='username'>Quanti prodotti vuoi permutare?</label>
                                <input 
                                    type='number'
                                    min={1}
                                    max={10}
                                    defaultValue={1}
                                    />
                                <label htmlFor='username'>Nome Prodotto:</label>
                                <input type="text" />
                                <textarea
                                    rows={10}
                                    placeholder='Esempio: iPhone X con pochi graffi e batteria al 70%'
                                    />
                            </div>

                            <div className='txt_field'>
                                <a href="https://api.whatsapp.com/send?phone=3397619766">Manda le foto su WhatsApp Business!</a>
                            </div>
                            
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
                            </div>    
                        </div>
                        <div className={formStepsNum === 4 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Valutazione degli oggetti in corso...</h2>
                                
                                <ClockLoader
                                    color={'#0f3460'}
                                    loading={loading}
                                    size={60}
                                />
                            </div>

                            
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e,'next')}>Successivo</button>
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