import React from 'react'
import { NavLink} from 'react-router-dom';
import './editProductStyle.css';
import axios from '../../../../api/axios';
import { useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth';
import { useState } from 'react';

const EditProduct = () => {

    const params = useParams(); 
    const PRODUCT_INFO_URL = `/api/product/getProduct`;
    const EDIT_URL = `/api/product/editProduct`;
    const { auth } = useAuth();
    const [productInfo, setProductInfo] = useState([]);
    const [cover, setCover] = useState('');
    const [productName, setProductName] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [category, setCategory] = useState('');
    const [brandName, setBrandName] = useState('');
    const [price, setPrice] = useState(0);
    const [prodDesc, setProdDesc] = useState('');
    const [status, setStatus] = useState('');
    const [color, setColor] = useState('');
    const [cpu, setCPU] = useState('');
    const [ram, setRAM] = useState('');
    const [hdd, setHDD] = useState('');
    const [graphics, setGraphics] = useState('');
    const [stars, setStars] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [qtyInStock, setQtyInStock] = useState(0);
    const CATEGORY_URL = 'api/product/categories';
    const [categories, setCategories] = useState([]);
    const [isChanged, setIsChanged] = useState(false); 

    const getProductData = async () => {

        try {
        
        const response = await axios.post(PRODUCT_INFO_URL, 
            { 
                prod_id : params.id,
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );

            response['data'].forEach(element => {
                if (element.key === 'cover') {
                    setCover(element.value)
                } else if (element.key === 'product_name'){
                    setProductName(element.value)
                } else if (element.key === 'photo_1'){
                    setPhoto1(element.value)
                } else if (element.key === 'photo_2'){
                    setPhoto2(element.value)
                } else if (element.key === 'photo_3'){
                    setPhoto3(element.value)
                } else if (element.key === 'category'){
                    setCategory(element.value)
                } else if (element.key === 'brandName'){
                    setBrandName(element.value)
                } else if (element.key === 'price'){
                    setPrice(element.value)
                } else if (element.key === 'prod_description'){
                    setProdDesc(element.value)
                } else if (element.key === 'status'){
                    setStatus(element.value)
                } else if (element.key === 'color'){
                    setColor(element.value)
                } else if (element.key === 'CPU'){
                    setCPU(element.value)
                } else if (element.key === 'RAM'){
                    setRAM(element.value)
                } else if (element.key === 'HDD'){
                    setHDD(element.value)
                } else if (element.key === 'graphics_card'){
                    setGraphics(element.value)
                } else if (element.key === 'stars'){
                    setStars(element.value)
                } else if (element.key === 'discount'){
                    setDiscount(element.value)
                } else if (element.key === 'qtyInStock'){
                    setQtyInStock(element.value)
                } 
            });

            setProductInfo(response.data);
            console.log(response.data)
    
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

    if (productInfo.length === 0) getProductData();

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

    const handleStatusSel = (e) => {
        setStatus(e);
    }

    const handleCategorySel = (e) => {
        setCategory(e);
        setIsChanged(true);
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const editProductForm = async () => {

            try {
            
            const response = await axios.post(EDIT_URL, 
                { 
                    prod_id : params.id,
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
        
            alert(response.data)

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

        editProductForm();

    }

    const handleChange = (keyForm, e) => {
        setIsChanged(true);

       if(keyForm === 'cover'){
            setCover(e)
       } else if (keyForm === 'product_name'){
            setProductName(e)
       } else if (keyForm === 'photo_1'){
            setPhoto1(e)
       } else if (keyForm === 'photo_2'){
            setPhoto2(e)
       } else if (keyForm === 'photo_3'){
            setPhoto3(e)
       } else if (keyForm === 'category'){
            setCategory(e)
       } else if (keyForm === 'brandName'){
            setBrandName(e)
       } else if (keyForm === 'price'){
            setPrice(e)
       } else if (keyForm === 'prod_description'){
            setProdDesc(e)
       } else if (keyForm === 'color'){
            setColor(e)
       } else if (keyForm === 'CPU'){
            setCPU(e)
       } else if (keyForm === 'RAM'){
            setRAM(e)
       } else if (keyForm === 'HDD'){
            setHDD(e)
       } else if (keyForm === 'graphics_card'){
            setGraphics(e)
       } else if (keyForm === 'stars'){
            setStars(e)
       } else if (keyForm === 'discount'){
            setDiscount(e)
       } else if (keyForm === 'qtyInStock'){
            setQtyInStock(e)
       } 

    }

  return (
    <section className='editProduct'>
        <form id='editForm' onSubmit={handleSubmit}>
           <div className="editProduct-heading">
                <div className="editProduct-backBtn-div">
                    <NavLink to={'/adminDashboard/products'}>
                        <button className="editProduct-backBtn">Vai ai prodotti</button>
                    </NavLink>
                </div>                
                <h2 className='editProduct-title'>Modifica prodotto</h2>
                <div className='editProduct-pubBtn-div'>
                    {
                        isChanged ? <button type='submit' form='editForm' className="editProduct-pubBtn">Pubblica ora</button>
                                  : <button disabled type='submit' form='editForm' className="editProduct-pubBtn disabled">Pubblica ora</button>
                    }
                    
                </div>
            </div>
            <div className="editProduct-content">
                <div className="editProduct-body">
                    <div className="editProduct-card card shadow-sm">
                        <div className="card-body">
                            {
                                productInfo.map((item, index) => {
                                    return(
                                        <div key={index} className="mb-4">
                                            <label htmlFor="product_label" className='form-label'>{item.key}</label>
                                                <>
                                                    {
                                                        (item.key === 'id' || item.value === '') ?
                                                            (
                                                                <input type="text"
                                                                   className='form-control disabledInput' 
                                                                   id={item.key}
                                                                   disabled={true}
                                                                   defaultValue={item.value}/>
                                                            ):
                                                        (item.key === 'status') ?
                                                            (
                                                                <select className='form-control' 
                                                                        form="editForm" 
                                                                        onChange={(e) => handleStatusSel(e.target.value)}
                                                                        defaultValue={item.value}>
                                                                    <option value={'Nuovo'}>Nuovo</option>
                                                                    <option value={'Usato'}>Usato</option>
                                                                    <option value={'Ricondizionato'}>Ricondizionato</option>
                                                                </select>
                                                            ):
                                                        (item.key.includes('photo') || item.key.includes('cover') ) ? (
                                                            <>
                                                            <input type="text"
                                                                   className='form-control' 
                                                                   id={item.key}
                                                                   defaultValue={item.value}
                                                                   onChange={(e) => handleChange(item.key, e.target.value)}
                                                                   required/>
                                                            <img className='edit-img' src={item.value} alt="" />
                                                            </>
                                                        ) : 
                                                        (item.key.includes('category')) ? (
                                                            <select className='form-control' 
                                                                    form="editForm" 
                                                                    onChange={(e) => handleCategorySel(e.target.value)}>
                                                                {
                                                                        categories.map((item, index) => {
                                                                            return(
                                                                                <>
                                                                                    { 
                                                                                        productInfo.find(el => el.key === 'category').value === item.category ? 
                                                                                            <option selected key={index} value={item.value}>{item.category}</option>
                                                                                            :
                                                                                            <option key={index} value={item.value}>{item.category}</option>
                                                                                    }
                                                                                    
                                                                                </>                                                
                                                                            )
                                                                        })
                                                                }                               
                                                                
                                                            </select>
                                                        ) : (item.key.includes('description')) ? (
                                                            <textarea 
                                                                rows='7'
                                                                className='form-control' 
                                                                onChange={(e) => handleChange(item.key, e.target.value)}
                                                                id={item.key}
                                                                defaultValue={item.value}/>
                                                        ):
                                                         (typeof(item.value) === 'number') && item.key === 'price' ? (
                                                            <input type="number"
                                                                   className='form-control'
                                                                   step="any" 
                                                                   onChange={(e) => handleChange(item.key, e.target.value)}
                                                                   id={item.key}
                                                                   defaultValue={parseFloat(item.value).toFixed(2)}
                                                                   min='0'
                                                                   required/>
                                                        ):
                                                        (typeof(item.value) === 'number') && item.key === 'stars' ? (
                                                           <input type="number"
                                                                  className='form-control'
                                                                  step="any" 
                                                                  onChange={(e) => handleChange(item.key, e.target.value)}
                                                                  id={item.key}
                                                                  defaultValue={item.value}
                                                                  min='0'
                                                                  max='5'
                                                                  required/>
                                                       )
                                                        :
                                                         (typeof(item.value) === 'number') ? (
                                                            <input type="number"
                                                                   className='form-control' 
                                                                   id={item.key}
                                                                   onChange={(e) => handleChange(item.key, e.target.value)}
                                                                   defaultValue={item.value}
                                                                   min='0'
                                                                   required/>
                                                        )
                                                        :
                                                            (
                                                            <input type="text"
                                                                   className='form-control' 
                                                                   id={item.key}
                                                                   onChange={(e) => handleChange(item.key, e.target.value)}
                                                                   defaultValue={item.value}/>
                                                        )
                                                    }
                                                </>
                                        </div>
                                    )
                                    
                                })                            
                            }                     
                        </div>
                    </div>
                </div>
            </div> 
        </form>
    </section>
  )
}

export default EditProduct