import React, { useState } from 'react'
import './newProductPageStyle.css'
import useAuth from '../../../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../../api/axios';

const NewProductPage = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [cover, setCover] = useState('');
    const [productName, setProductName] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [category, setCategory] = useState('Smartphone');
    const [brandName, setBrandName] = useState('');
    const [price, setPrice] = useState(0);
    const [prodDesc, setProdDesc] = useState('');
    const [status, setStatus] = useState('Nuovo');
    const [color, setColor] = useState('');
    const [cpu, setCPU] = useState('');
    const [ram, setRAM] = useState('');
    const [hdd, setHDD] = useState('');
    const [graphics, setGraphics] = useState('');
    const [stars, setStars] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [qtyInStock, setQtyInStock] = useState(0);
    const CATEGORY_URL = 'api/product/categories';
    const NEW_PROD_URL = 'api/product/newProduct';
    const [categories, setCategories] = useState([]);
    const goBack = () => navigate('/adminDashboard/products');

     const handleSubmit = (e) => {
        
        e.preventDefault();

        const newProductForm = async () => {

            try {
            
            const response = await axios.post(NEW_PROD_URL, 
                { 
                    cover: cover,
                    productName: productName,
                    photo1: photo1,
                    photo2: photo2,
                    photo3: photo3,
                    category: category,
                    brandName: brandName,
                    price: price,
                    prodDesc: prodDesc,
                    status: status,
                    color: color,
                    cpu: cpu,
                    ram: ram,
                    hdd: hdd,
                    graphics: graphics,
                    stars: stars,
                    discount: discount,
                    qtyInStock: qtyInStock,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );
        
            alert(response.data);
            goBack();


            } catch (err) {
            if(!err?.response){
                console.error('Server non attivo!');
            }else if(err.response?.status === 500){
                console.error(err.response?.data);
            }else{
                console.error('Recupero prodotto fallito!');
            }
            }    
        
        }

        newProductForm();

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

    if (categories.length === 0) getCategories();
    
    const handleCategorySel = (e) => {
        setCategory(e);
    }

    const handleStatusSel = (e) => {
        setStatus(e);
    }

  return (
    <section className='newProductPage'>
        <form id='editForm' onSubmit={handleSubmit}>
        <div className="newProductPage-heading">
            <div className="newProductPage-backBtn-div">
                <NavLink to={'/adminDashboard/products'}>
                    <button className="newProductPage-backBtn">Vai ai prodotti</button>
                </NavLink>
            </div>                
            <h2 className='newProductPage-title'>Aggiungi prodotto</h2>
            <div className='newProductPage-pubBtn-div'>
                <button type='submit' form='editForm' className="newProductPage-pubBtn">Pubblica ora</button>
            </div>
        </div>
            <div className="newProductPage-content">
                <div className="newProductPage-body">
                    <div className="newProductPage-card card shadow-sm">
                        <div className="card-body">
                            <label htmlFor="product_label" className='form-label'>cover</label>
                            <input type="text"
                                        className='form-control' 
                                        id={'cover'}
                                        onChange={(e) => setCover(e.target.value)}
                                        required/>                            
                            
                            <label htmlFor="product_label" className='form-label'>product_name</label>                   
                            <input type="text"
                                className='form-control' 
                                id={'product_name'}
                                onChange={(e) => setProductName(e.target.value)}
                                required/>

                            <label htmlFor="product_label" className='form-label'>photo_1</label>  
                            <input type="text"
                                className='form-control' 
                                id={'photo_1'}
                                onChange={(e) => setPhoto1(e.target.value)}
                                required/>  

                            <label htmlFor="product_label" className='form-label'>photo_2</label>  
                            <input type="text"
                                className='form-control' 
                                id={'photo_2'}
                                onChange={(e) => setPhoto2(e.target.value)}
                                required/>

                            <label htmlFor="product_label" className='form-label'>photo_3</label>  
                            <input type="text"
                                className='form-control' 
                                id={'photo_3'}
                                onChange={(e) => setPhoto3(e.target.value)}
                                required/> 
                            
                            <label htmlFor="product_label" className='form-label'>category</label> 
                            <select className='form-control' 
                                    form="editForm" 
                                    onChange={(e) => handleCategorySel(e.target.value)}>
                                {
                                        categories.map((item, index) => {
                                            return(
                                                <>
                                                    <option key={index} value={item.value}>{item.category}</option>
                                                </>                                                
                                            )
                                        })
                                }                               
                                
                            </select>

                            <label htmlFor="product_label" className='form-label'>brandName</label> 
                            <input type="text"
                                className='form-control' 
                                id={'brandName'}
                                onChange={(e) => setBrandName(e.target.value)}
                                required/>     

                            <label htmlFor="product_label" className='form-label'>price</label> 
                            <input type="number"
                                className='form-control'
                                step="any" 
                                onChange={(e) => setPrice(e.target.value)}
                                id={'price'}
                                min='0'
                                required/>

                            <label htmlFor="product_label" className='form-label'>prod_description</label> 
                            <textarea 
                                rows='7'
                                className='form-control' 
                                onChange={(e) => setProdDesc(e.target.value)}
                                id={'prod_description'}/>
                            
                            <label htmlFor="product_label" className='form-label'>status</label> 
                            <select className='form-control' 
                                    form="editForm" 
                                    onChange={(e) => handleStatusSel(e.target.value)}
                                    defaultValue={'Nuovo'}>
                                <option value={'Nuovo'}>Nuovo</option>
                                <option value={'Usato'}>Usato</option>
                                <option value={'Ricondizionato'}>Ricondizionato</option>
                            </select>

                            <label htmlFor="product_label" className='form-label'>color</label>                             
                            <input type="text"
                                className='form-control' 
                                id={'color'}
                                onChange={(e) => setColor(e.target.value)}
                                required/>   

                            <label htmlFor="product_label" className='form-label'>CPU</label> 
                            {
                                (category==='Smartphone' || category === 'Tablet') ?
                                <input type="text"
                                    className='form-control disabledInput' 
                                    id={'CPU'}
                                    disabled
                                    onChange={(e) => setCPU(e.target.value)}
                                    required/> 
                                :
                                <input type="text"
                                    className='form-control' 
                                    id={'CPU'}
                                    onChange={(e) => setCPU(e.target.value)}
                                    required/> 
                                    
                            }
                              

                            <label htmlFor="product_label" className='form-label'>RAM</label>              
                            {
                                (category==='Smartphone' || category === 'Tablet') ?
                                <input type="text"
                                    className='form-control disabledInput' 
                                    id={'RAM'}
                                    onChange={(e) => setRAM(e.target.value)}
                                    disabled
                                    required/> 
                                :
                                <input type="text"
                                    className='form-control' 
                                    id={'RAM'}
                                    onChange={(e) => setRAM(e.target.value)}
                                    required/> 
                                    
                            }

                            <label htmlFor="product_label" className='form-label'>HDD</label> 
                            {
                                (category==='Smartphone' || category === 'Tablet') ?
                                <input type="text"
                                    className='form-control disabledInput' 
                                    id={'HDD'}
                                    onChange={(e) => setHDD(e.target.value)}
                                    disabled
                                    required/> 
                                :
                                <input type="text"
                                    className='form-control' 
                                    id={'HDD'}
                                    onChange={(e) => setHDD(e.target.value)}
                                    required/> 
                                    
                            } 

                            <label htmlFor="product_label" className='form-label'>graphics_card</label> 
                            {
                                (category==='Smartphone' || category === 'Tablet') ?
                                <input type="text"
                                    className='form-control disabledInput' 
                                    id={'graphics_card'}
                                    onChange={(e) => setGraphics(e.target.value)}
                                    disabled
                                    required/> 
                                :
                                <input type="text"
                                    className='form-control' 
                                    id={'graphics_card'}
                                    onChange={(e) => setGraphics(e.target.value)}
                                    required/> 
                                    
                            } 

                            <label htmlFor="product_label" className='form-label'>stars</label> 
                            <input type="number"
                                className='form-control'
                                step="any" 
                                onChange={(e) => setStars(e.target.value)}
                                id={'stars'}
                                min='0'
                                max='5'
                                required/>  

                            <label htmlFor="product_label" className='form-label'>discount</label> 
                            <input type="number"
                                className='form-control'
                                step="any" 
                                onChange={(e) => setDiscount(e.target.value)}
                                id={'discount'}
                                min='0'
                                required/> 

                            <label htmlFor="product_label" className='form-label'>qtyInStock</label> 
                            <input type="number"
                                className='form-control'
                                step="any" 
                                onChange={(e) => setQtyInStock(e.target.value)}
                                id={'qtyInStock'}
                                min='0'
                                required/>   
                        </div>                    
                    </div>
                </div>
            </div> 
        </form>
    </section>
  )
}

export default NewProductPage