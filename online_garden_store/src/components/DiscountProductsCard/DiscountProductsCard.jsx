import React from 'react'
import s from './index.module.css'

export default function DiscountProductsCard({title, price, discont_price, image}) {

    const discountPercentage = Math.round(((price - discont_price) / price) * 100)

  return (
    <div className={s.discountProductsCards}>
        <div className={s.cards}>
            <img className={s.discountProductImg} src={`http://localhost:3333${image}`} alt={title}/>       
            <p className={s.discountProductTitle}>{title}</p>
            <p className={s.discounProductDisPrice}>${discont_price}   <span className={s.discountProductPrice}>${price}</span></p>
            <p className={s.discountProductDisPercentage}>{discountPercentage} %</p>
        </div>
    </div>
  )
}