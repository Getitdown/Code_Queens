import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../requests/products';
import s from './SingleProductPage.module.css';
import { addProductToCartAction } from '../../store/cartReducer';
import Footer from '../../components/Footer/Footer';
import { Context } from '../../context';

export default function SingleProductPage() {

     // Логика для сокращения текста
     const maxCharacters = 150;
     const shortDescription =
         description && description.length > maxCharacters
             ? description.slice(0, maxCharacters) + '...'
             : description;


    const { openSecondModalWindow } = useContext(Context);
    const [count, setCount] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false); // состояние для управления текстом

    const incrCount = () => setCount(count + 1);
    const decrCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const { product_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getSingleProduct(product_id)(dispatch);
    }, [product_id, dispatch]);

    const singleProductState = useSelector((store) => store.singleProduct);
    const { data = {} } = useSelector((store) => store.singleProduct);
    const { image, title, description, price, discont_price } = data;

    const discountPercent = Math.round(((price - discont_price) / price) * 100);
  return (
    <div>
       <div className={s.layout_container}>   
       <h3>{title}</h3> 
         {
          singleProductState.status === 'loading' 
          ? 'Product info is loading' 
          : <div className={s.single_product_card}>
                <div>
                    <img src={`http://localhost:3333${image}`} alt={title} />
                            
                        <div className={s.product_page}>
                            <div>
                                <h3>{title}</h3>
                            </div>
                            <div className={s.price_single_product}>
                                <p>${price}</p>
                                {discont_price ? <><p>${discont_price}</p> 
                                <span>{-discountPercent}%</span>
                                    
                                </> : null}        
                            </div>
                            <div className={s.quantity}>
                                <div className={s.quantity_wrapper}>
                                    <div onClick={decrCount}>-</div>
                                    <p>{count}</p>
                                    <div onClick={incrCount}>+</div>
                                </div>
                                <button 
                                onClick={() => {
                                    dispatch(addProductToCartAction({ ...data, count })); 
                                    openSecondModalWindow(); 
                                }}
                                >
                                Add to cart
                                </button>
                            </div>
                            <div className={s.product_description}>
                                <p>Description</p>
                                <p>{isExpanded ? description : shortDescription}</p>
                                {description && description.length > maxCharacters && (
                                    <p
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className={s.read_more}
                                    >
                                        {isExpanded ? 'Show less' : 'Read more'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                        <div className={s.product_description_small}>
                            <p>Description</p>
                            <p>{description}</p>
                            <p>Read more</p>
                        </div>
                    
            </div>
        }
    </div>
    <Footer/>
</div>
  )
}