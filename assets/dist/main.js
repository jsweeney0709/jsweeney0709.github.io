"use strict";

const header_menu = document.querySelector(".su__header--menu");
const menu_open_toggle = document.querySelector(".menu-toggle-div");
const menu_close_toggle = document.querySelector(".menu-js-toggle");
const su_navigation_toggle = document.querySelector(".navigation-toggle");

const openMenu = function () {
  menu_open_toggle.classList.add("is-active");
  su_navigation_toggle.classList.add("open");
};
const closeMenu = function () {
  menu_open_toggle.classList.remove("is-active");
  su_navigation_toggle.classList.remove("open");
};

menu_open_toggle.addEventListener("click", function () {
  openMenu();
});

menu_close_toggle.addEventListener("click", function () {
  closeMenu();
});
