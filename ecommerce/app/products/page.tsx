"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/carttActions';
import { Button } from 'primereact/button';
import productStyle from './products.module.scss'

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8000/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log("cartAddToCart", product);
    dispatch(addToCart(product));
  };

  return (
    <div className={productStyle.productMainPage}>
      <h1 className='text-center my-5'>Our Products</h1>
      <div className={`flex flex-wrap gap-2 ${productStyle.productWrapper}`}>
      {products.map(product => (
        <div key={product.id} className={`w-3 p-3 flex flex-column justify-content-center ${productStyle.productDetail}`} >
          <div className={productStyle.productImageWrapper}>
            <img src={product.image} alt={product.title} className={productStyle.productImage}/>
          </div>
          <div className=''>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Button label="Add to Cart"  onClick={() => handleAddToCart(product)} />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Products;
