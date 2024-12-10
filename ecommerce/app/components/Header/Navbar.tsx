'use client';

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import navStyle from "./header.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

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

  return (
    <div className={navStyle.navbarWrapper}>
      <nav className={navStyle.navbarWrapperData}>
        {/* Hamburger Icon */}
        <div className={navStyle.toggleIcon} onClick={handleOpenMenu}>☰ </div>
        <div className={`${navStyle.navUlWrapper} ${ open ? navStyle.openMenu : navStyle.closeMenu }`} >
          <ul className={navStyle.navUl}>
            <li className={`${navStyle.liList}`} onClick={() => { router.push("/"); handleCloseMenu(); }}> Home </li>
            <li className={`${navStyle.liList}`} onClick={() => { router.push("/products"); handleCloseMenu(); }}> Products </li>
            <li className={`${navStyle.liList}`} onClick={() => { router.push("/about"); handleCloseMenu(); }} > About </li>
          </ul>
          <div className={navStyle.closeIcon} onClick={handleCloseMenu}> ✖ </div>
        </div>
        <div className={navStyle.logoWrapper} onClick={() => router.push("/")}>Logo</div>
        <div className={navStyle.navActions}>
          <Button
            icon="pi pi-heart"
            className={`p-button-rounded ${navStyle.actionButton}`}
            onClick={() => router.push("/wishlist")}
          />
          <Button
            icon="pi pi-shopping-cart"
            className={`p-button-rounded ${navStyle.actionButton}`}
            onClick={() => router.push("/cart")}
          />
         
          <span className={`${navStyle.searchBarData} p-input-icon-left`}>
            <i className="pi pi-search" />
            <InputText
              placeholder="Search..."
              className={navStyle.searchBar}
            />
          </span>
          {isLoggedIn && (
            <Button
              label="Logout"
              className={`p-button-danger ${navStyle.logoutButton}`}
              onClick={handleLogout}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
