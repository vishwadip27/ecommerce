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
          <div key={product.id} className={`sm:w-1/3 md:w-1/4 p-3 ${productStyle.productDetail}`}>
            <div className={productStyle.productImageWrapper}>
              <img src={product.image} alt={product.name} className={productStyle.productImage} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div>
              <Button label="View Details" icon="pi pi-info-circle" onClick={() => handleViewDetails(product.id)} />
              <Button label="Add to Cart" icon="pi pi-shopping-cart" onClick={() => handleAddToCart(product)} />
              <Button label="Add to Wishlist" icon="pi pi-heart" onClick={() => handleAddToWishlist(product)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
