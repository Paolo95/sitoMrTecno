import Select from 'react-select';
import './barter.css'
import ClockLoader from 'react-spinners/ClockLoader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Barter = () => {

    const [formStepsNum, setFormStepsNum] = useState(1);
    const [barterLoading, setBarterLoading] = useState(true);
    const navigate = useNavigate();

    const shopOptions = [
        { value: 0, label: 'Migliori' },
        { value: 1, label: 'Crescente' },
        { value: 2, label: 'Decrescente' },
        { value: 3, label: 'A-Z' },
        { value: 4, label: 'Z-A' },
    ];

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
                                <p>Se non hai ben chiaro come funziona il tutto, visita la pagina <a href="/faq"><b>FAQ's</b></a> per ulteriori informazioni!</p> 
                                <p><b>DISCLAMER:</b> il processo di permuta richiede una valutazione dei prodotti da permutare effettuata da un operatore. Prosegui solo se sei veramente interessato, grazie!</p>
                            </div>
                            <div className='btnForm'>
                                <button className={formStepsNum === 1 ? 'disabled' : ''} onClick={(e) => updateFormSteps(e, 'prev')}>Precendente</button>
                                <button onClick={(e) => updateFormSteps(e, 'next')}>Successivo</button>
                            </div>
                           
                        </div>

                        <div className={formStepsNum === 2 ? "form-step-active": "form-step"}>
                            <div className="txt_field">
                                <h2>Scegli il prodotto che desideri</h2>
                                <label htmlFor='username'>Categoria:</label>
                                <Select 
                                    options={shopOptions}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    defaultValue={shopOptions[0]}/>
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Brand:</label>
                                <Select 
                                    options={shopOptions}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    defaultValue={shopOptions[0]}/>
                            </div>
                            <div className="txt_field">
                                <label htmlFor='username'>Modello:</label>
                                <Select 
                                    options={shopOptions}
                                    styles={styles}
                                    isClearable={false}
                                    isSearchable={false}
                                    defaultValue={shopOptions[0]}/>
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
                                    loading={barterLoading}
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