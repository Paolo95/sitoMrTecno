import React from 'react'
import { Link } from 'react-router-dom'


const CategoryTab = ( { tab } ) => {
    const data = [
        {
            tab: "Permuta",
            testo: "Permuta",
            button_text: "Permuta ora!",
        },
        {
            tab: "Ricondizionati",
            testo: "Ricondizionati",
        },
        {
            tab: "Nuovo",
            testo: "Nuovo",
        }
    ]

  return (
    <>
        <div className="category-tab">
            {
                data.filter(item => item.tab === tab).map((value, index) =>{
                    return(
                        <div className='tab-container' key={index}>
                            <Link to={tab==='Permuta' ? '/permuta': 
                                        (tab==='Ricondizionati' ? '/shop/ricondizionati' :
                                            (tab==='Nuovo' ? '/shop/nuovo' : ''))}>  
                            <span className="dot"><i className={tab==='Permuta' ? 'far fa-handshake': 
                                                                (tab==='Ricondizionati' ? 'fas fa-laptop-medical' :
                                                                 (tab==='Nuovo' ? 'fas fa-store' : ''))}></i></span> 
                                                            
                                <button>{value.testo}</button>
                            </Link>  
                        </div>
                    )
                })}
        </div>
    </>
    
  )
}

export default CategoryTab
