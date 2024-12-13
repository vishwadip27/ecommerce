'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers';
import { removeFromWishlist } from '../store/actions/wishlistActions';
import { Button } from 'primereact/button';
import styles from './wishlist.module.scss';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishListProducts = useSelector((state: RootState) => state.whistlist.wishListProducts);

  const handleRemove = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Wishlist</h1>
      {wishListProducts.length > 0 ? (
        <div className={styles.grid}>
          {wishListProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.wishlistImageWrapper}>
                 <img src={product.image || '/placeholder-image.png'}  alt={product.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDescription}>{product.description}</p>
                <p className={styles.cardPrice}>${product.price}</p>
                <Button label="Remove"  icon="pi pi-trash" className="p-button-danger" onClick={() => handleRemove(product.id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
