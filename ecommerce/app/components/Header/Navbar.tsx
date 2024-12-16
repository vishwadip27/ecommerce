'use client';

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import navStyle from "./header.module.scss";
import { RootState } from "@/app/store/reducers";
import { addToWishlist, removeFromWishlist } from "@/app/store/actions/wishlistActions";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishListProducts = useSelector((state: RootState) => state.whistlist.wishListProducts); 
  const wishListCount = wishListProducts.length;
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleCloseMenu(); 
    setDropdownOpen(false); 
  };

  const handleAddToWishlist = (product: any) => {
    dispatch(addToWishlist(product)); 
  };

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId)); 
  };

  return (
    <div className={navStyle.navbarWrapper}>
      <nav className={navStyle.navbarWrapperData}>
        <div className={navStyle.toggleIcon} onClick={handleOpenMenu}>☰</div>
        <div className={`${navStyle.navUlWrapper} ${open ? navStyle.openMenu : navStyle.closeMenu}`}>
          <ul className={navStyle.navUl}>
            <li className={navStyle.liList} onClick={() => handleMenuItemClick("/")}> Home </li>
            <li className={`${navStyle.liList}`} onClick={toggleDropdown}>
              Products ▼
              {dropdownOpen && (
                <ul className={navStyle.dropdownMenu}>
                  <li className={navStyle.dropdownItem} onClick={() => handleMenuItemClick("/products/electronics")}>
                    Electronics
                    <ul className={navStyle.subDropdownMenu}>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/electronics/mobile"); }}> Mobile </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/electronics/earphone"); }}> Earphone </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/electronics/tv"); }}> TV </li>
                    </ul>
                  </li>
                  <li className={navStyle.dropdownItem} onClick={() => handleMenuItemClick("/products/fashion")}>
                    Fashion
                    <ul className={navStyle.subDropdownMenu}>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/fashion/tshirt"); }}> T-Shirt </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/fashion/shirt"); }}> Shirt </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/fashion/jeans"); }}> Jeans </li>
                    </ul>
                  </li>
                  <li className={navStyle.dropdownItem} onClick={() => handleMenuItemClick("/products/shoes")}>
                    Shoes
                    <ul className={navStyle.subDropdownMenu}>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/shoes/shoes"); }}> Shoes </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/shoes/slippers"); }}> Slippers </li>
                    </ul>
                  </li>
                  <li className={navStyle.dropdownItem} onClick={() => handleMenuItemClick("/products/home-and-furniture")}>
                    Home & Furniture
                    <ul className={navStyle.subDropdownMenu}>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/home-and-furniture/flowerpots"); }}> Flowerpots </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/home-and-furniture/sofas"); }}> Sofas </li>
                      <li onClick={(event) => { event.stopPropagation(); handleMenuItemClick("/products/home-and-furniture/chairs"); }}> Chairs </li>
                    </ul>
                  </li>
                </ul>
              )}
            </li>
            <li className={navStyle.liList} onClick={() => handleMenuItemClick("/about")}> About </li>
          </ul>
          <div className={navStyle.closeIcon} onClick={handleCloseMenu}> ✖ </div>
        </div>
        <div className={navStyle.logoWrapper} onClick={() => handleMenuItemClick("/")}>
          <img src="/images/sitelogo.png" alt="Logo" className={navStyle.logo} />
        </div>
        <div className={navStyle.navActions}>
          <Button icon="pi pi-heart" className={`p-button-rounded ${navStyle.actionButton}`} onClick={() => handleMenuItemClick("/wishlist")} >
          {pathname !== "/wishlist" && wishListCount > 0 && (
          <span className={navStyle.cartBadge}>{wishListCount}</span>
        )}
          </Button>
          <Button icon="pi pi-shopping-cart" className={`p-button-rounded ${navStyle.actionButton}`} onClick={() => handleMenuItemClick("/cart")}>
            {cartCount > 0 && <span className={navStyle.cartBadge}>{cartCount}</span>}
          </Button>
          <span className={`${navStyle.searchBarData} p-input-icon-left`}>
            <i className="pi pi-search" />
            <InputText placeholder="Search..." className={navStyle.searchBar} />
          </span>
          {isLoggedIn ? (
            <Button label="Logout" onClick={handleLogout} className={navStyle.btn}/>
          ) : (
            <Button label="Login" onClick={() => router.push("/login")} className={navStyle.btn}/>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
