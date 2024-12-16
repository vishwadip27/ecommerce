"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/carttActions';
import { addToWishlist } from '../store/actions/wishlistActions';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import productStyle from './products.module.scss';
import { RootState } from '../store/reducers';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8000/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product: any) => {
    dispatch(addToWishlist(product)); 
  };

  const handleViewDetails = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className={productStyle.productMainPage}>
      <h1 className="text-center my-5">Our Products</h1>
      <div className={`flex flex-wrap gap-2 ${productStyle.productWrapper}`}>
        {products.map((product) => (
          <div key={product.id} className={`p-col-12 p-md-6 p-lg-4 p-xl-3 p-p-3 p-3 ${productStyle.productDetail}`}>
            <div className={productStyle.productImageWrapper}>
              <img src={product.image} alt={product.name} className={productStyle.productImage} />
            </div>
            <div className={productStyle.wishlistWrapper}>
            <Button label="" icon="pi pi-heart" onClick={() => handleAddToWishlist(product)} className={`${productStyle.btn} ${productStyle.view}`}/>
            <Button label="" icon="pi pi-shopping-cart" onClick={() => handleAddToCart(product)} className={`${productStyle.btn} ${productStyle.cart}`}/>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className={productStyle.viewDetailWrapper}>
              <Button label="View Details" icon="pi pi-info-circle" onClick={() => handleViewDetails(product.id)} className={`${productStyle.btn} ${productStyle.view}`}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
