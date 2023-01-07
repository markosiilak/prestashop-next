// Libs
import EventEmitter from "events";

import { parseCookies } from "../cookies";
// api
import { initCart, loadCart } from "./cart";
import { initUser, loadUser } from "./user";

// API data
const API_URL = "https://presta.siilak.com/api/";
const API_KEY = "8LSNZZYUSSE235XFLFSQPRUJ4FMC392B";

// Local params
let cart;
let user;

export let prestaEvents;
prestaEvents = new EventEmitter();

// Temp params (we'll get these from the shop later...)
export const API_CURRENCY = 1;
export const API_LANGUAGES = 1;

export async function getProducts() {
  const results = await fetchAPI("products");
  return results;
}

export async function fetchAPI(url, getParams = "") {
  const response = await fetch(
    `${API_URL}${url}?output_format=JSON&ws_key=${API_KEY}&${getParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const results = await response.json();
  return results;
}

export async function postAPI(url, body) {
  const response = await fetch(`${API_URL}${url}?output_format=JSON&ws_key=${API_KEY}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body
  });

  const results = await response.json();
  return results;
}

export async function putAPI(url, body) {
  const response = await fetch(`${API_URL}${url}?output_format=JSON&ws_key=${API_KEY}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body
  });

  const results = await response.json();
  return results;
}

export async function initSession(request) {
  // Init basic Presta params
  const cookies = parseCookies(request);
  const cookieUser = cookies.user;
  const cookieCart = cookies.cart;

  // User
  if (cookieUser == null || cookieUser == "undefined") await initUser();
  else await loadUser();

  // Cart
  if (cookieCart == null || cookieCart == "undefined") await initCart();
  else await loadCart();
}
