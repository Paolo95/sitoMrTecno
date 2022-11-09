import React from 'react'


const Categories = () => {
    const data = [
        {
            cateImg: "./images/category/cat1.svg",
            cateName : "PC desktop",
        },
        {
            cateImg: "./images/category/cat2.svg",
            cateName: "Smartphone",
          },
          {
            cateImg: "./images/category/cat3.svg",
            cateName: "Tablet",
          },
          {
            cateImg: "./images/category/cat4.svg",
            cateName: "Console",
          },
          {
            cateImg: "./images/category/cat5.svg",
            cateName: "Permuta",
          },
          {
            cateImg: "./images/category/cat6.svg",
            cateName: "Riparazione",
          },
          {
            cateImg: "./images/category/cat7.svg",
            cateName: "Assistenza remota",
          },
          {
            cateImg: "./images/category/cat8.svg",
            cateName: "Recupero dati Smartphone",
          },
          {
            cateImg: "./images/category/cat9.svg",
            cateName: "Internet",
          }
    ]


  return (
    <>
        <div className="category">
            {
                data.map((value, index) =>{
                    return(
                        <div className="box f_flex" key={index}>
                            <img src={value.cateImg} alt="cateImg" />
                            <span>{value.cateName}</span>
                        </div>
                    )
                })}
        </div>
    </>
    
  )
}
export default Categories
