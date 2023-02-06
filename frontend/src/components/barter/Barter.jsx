import Select from 'react-select';
import './barter.css'
import { useState } from 'react';

const Barter = () => {

    const [formStepsNum, setFormStepsNum] = useState(1);

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

    const updateFormSteps = () =>{
        setFormStepsNum( formStepsNum + 1 );
    }

    return (
        <section className='barter'>
            <div className='container'>
                <div className="barter-div">
                    <form action='#' className='form'>
                        <h1>Permuta</h1>
                        <div className="progressBar">
                            <div className="progress" id='progress' style={{width: `${((formStepsNum - 1) / (4)) * 100 }%`}}></div>
                            <div className={formStepsNum >= 1 ? "progress-step progress-step-active" : "progress-step"} data-title='Intro'></div>
                            <div className={formStepsNum >= 2 ? "progress-step progress-step-active" : "progress-step"} data-title='Scelta prodotto'></div>
                            <div className={formStepsNum >= 3 ? "progress-step progress-step-active" : "progress-step"} data-title='Descrizione oggetti'></div>
                            <div className={formStepsNum >= 4 ? "progress-step progress-step-active" : "progress-step"} data-title='Valutazione'></div>
                            <div className={formStepsNum >= 5 ? "progress-step progress-step-active" : "progress-step"} data-title='Conferma'></div>
                        </div>
                        <div className={formStepsNum === 1 ? "form-step-active": "form-step"}>
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
                            <label htmlFor='username'>Brand:</label>
                            <Select 
                                options={shopOptions}
                                styles={styles}
                                isClearable={false}
                                isSearchable={false}
                                defaultValue={shopOptions[0]}/>
                            </div>
                            <div className=''>
                                <button onClick={updateFormSteps}>Successivo</button>
                            </div>
                        </div>

                        <div className={formStepsNum === 2 ? "form-step-active": "form-step"}>
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
                            <label htmlFor='username'>Brand:</label>
                            <Select 
                                options={shopOptions}
                                styles={styles}
                                isClearable={false}
                                isSearchable={false}
                                defaultValue={shopOptions[0]}/>
                            </div>
                            <div className=''>
                                <button onClick={updateFormSteps}>Successivo</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Barter