"use strict";

const header_menu = document.querySelector(".su__header--menu");
const menu_toggle = document.querySelector(".menu-js-toggle");

const openMenu = function () {
  menu_toggle.classList.add("is-active");
};
const closeMenu = function () {
  menu_toggle.classList.remove("is-active");
};

header_menu.addEventListener("click", function (e) {
  console.log("clicked");
  if (menu_toggle.classList.contains("is-active")) {
    openMenu();
  } else {
    closeMenu();
  }
});
