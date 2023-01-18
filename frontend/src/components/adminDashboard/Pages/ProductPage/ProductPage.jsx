import React from 'react'
import './productPageStyle.css'
import { NavLink } from 'react-router-dom';
import axios from '../../../../api/axios';
import { useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';


const ProductPage = () => {

    const [numProdListed, setNumProdListed] = React.useState(6);
    const [categoryOptions, setCategories] = React.useState([]);
    const [orderSelected, setOrderSelected] = React.useState('Migliori');
    const [searchString, setSearchString] = React.useState('');
    const [categorySelected, setCategorySelected] = React.useState('Smartphone');
    const [productList, setProductList] = React.useState([]);
    const { auth } = useAuth();
    const CATEGORY_URL = '/api/product/categories';
    const FILTERED_PRODUCT_URL = 'api/product/filteredAdminItems';
    const DEL_URL = 'api/product/delProduct';

    const searchHandler = (e) => {
        setSearchString(e.target.value)
    }

    const handleMoreProdListed = () => {
        setNumProdListed(numProdListed + 6); 
    }

    const orderSelectHandler = (e) => {
        setOrderSelected(e.target.value);
    }

    const categorySelectHandler = (e) => {
        setCategorySelected(e.target.value);
    }

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

    const getProductList = async () => {

        try {
        
        const response = await axios.post(FILTERED_PRODUCT_URL, 
            { 
                orderSelected: orderSelected,
                categorySelected: categorySelected,
                searchString: searchString,
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );

            setProductList(response.data);
    
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

    const deleteProduct = async (delID) => {

        try {
        
        const response = await axios.post(DEL_URL, 
            { 
                id: delID,
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );

            alert(response.data)
            window.location.reload(true);
    
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

    useEffect(() => {

        getProductList();
    
        // eslint-disable-next-line
    }, [orderSelected, categorySelected, searchString]);


    const handleConfirm = (delID) => {

        if (window.confirm("Sei sicuro di cancellare il prodotto?")) {
            deleteProduct(delID);
        }
    }


  return (
    <section className="productPage">
        <div className="productPage-heading">
            <h2 className="productPage-title">Prodotti</h2>
            <div className="createBtn-div">
                <NavLink to={'/adminDashboard/newProduct'}>
                    <button className='btn btn-create'>Crea prodotto</button>
                </NavLink>
            </div>
        </div>
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-white">
                <div className="search-div">
                    <input 
                        type="search" 
                        onChange={searchHandler} 
                        placeholder='Cerca...' 
                        className='form-control p-2'
                        value={searchString}/>
                </div>
                <div className="select-div">
                    <select onChange={categorySelectHandler} className="categorySelect">
                        {
                            categoryOptions.map((value, index) => {
                                return(
                                        <option key={index} value={value.category}>{value.category}</option>
                                )
                            })
                        }
                    </select>
                    <select onChange={orderSelectHandler} className="orderSelect">
                        <option value={'Migliori'}>Migliori</option>
                        <option value={'Crescente'}>Crescente</option>
                        <option value={'Decrescente'}>Decrescente</option>
                        <option value={'A-Z'}>A-Z</option>
                        <option value={'Z-A'}>Z-A</option>
                    </select>
                </div>
            </div>
            <div className="card-body">
                <div className="productPage-content">
                    <div className="product-content grid1">
                        
                            {
                                productList.slice(0, numProdListed)
                                           .map((value, index) => {
                                    return(
                                        <div key={index} className="card card-product-grid shadow-sm">
                                            <img src={value.cover} alt="" />
                                            <div className="info-wrap">
                                                <span className='title' >{value.product_name}</span>
                                                <div className="price mb-2">
                                                    <span>€{parseFloat(value.price).toFixed(2)}</span>
                                                </div>
                                                <div className="row">
                                                    <NavLink className={'btn btn-outline-success p-2 pb-3'}
                                                             to={`/adminDashboard/products/edit/${value.id}`}>
                                                        <i className="fas fa-pen"></i>
                                                    </NavLink>
                                                    <button onClick={() => handleConfirm(value.id)} className={'btn btn-outline-danger p-2 pb-3'}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        
                    </div>
                </div>
                <div className="productPage-moreBtn">
                <button 
                      id='btn-moreProd'
                      className='btn-moreProd'
                      onClick={handleMoreProdListed}
                      style={{
                        display: numProdListed <= productList.slice(0, numProdListed).length ? 'inline' : 'none'
                      }}
                      >Mostra altro</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductPage