import { loadDiscountedProductsAction, loadProductsAction } from "../store/salesReducer";



export const getAllProducts = (dispatch) => {
  fetch('http://localhost:3333/products/all')
    .then(response => response.json())
    .then(products => {
     
      dispatch(loadProductsAction(products));

    
      let discountedProducts = products.filter(product => product.discont_price !== null && product.discont_price < product.price);

    
      if (discountedProducts.length < 4) {
        const additionalProducts = Array.from({ length: 4 - discountedProducts.length }, (_, i) => discountedProducts[i % discountedProducts.length]);
        discountedProducts = discountedProducts.concat(additionalProducts);
      }

    
      discountedProducts = discountedProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

   
      dispatch(loadDiscountedProductsAction(discountedProducts));
    })
   

  };