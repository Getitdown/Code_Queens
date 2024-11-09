import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesContainer from '../../components/CategoryContainer/CategoriesContainer';
import { getCategories } from '../../requests/categories_req';  
import Footer from '../../components/Footer/Footer';
import s from './CategoriesPage.module.css'

export default function CategoriesPage() {
  const categories = useSelector((store) => store.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={s.title}>
      <h1>Categories</h1>
      <CategoriesContainer categories={categories} />
      <Footer />
    </div>
  );
}