import Head from "next/head";
import { useEffect } from "react";

import Cart from "../components/Cart";
import { getProducts, initSession } from "../lib/api/api";
import { addProduct, removeProductFromCart } from "../lib/api/cart";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  useEffect(() => {
    initSession();
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Presta React</title>
        <meta
          name="description"
          content="Generate Presashop customized themes with React and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cart />

      <main className={styles.main}>
        <h1>
          Welcome to <a href="https://www.prestashop.com/">Presta React!</a>
        </h1>

        <h2>Generate Prestashop customized themes with React and Next.js</h2>
      </main>

      <section>
        <h3>The products on this store are these...and they're rendered from Prestashop API!</h3>

        <ul>
          {products.products.map((product, index) => {
            return (
              <li key={index}>
                {product.id}
                <button
                  onClick={() => {
                    addProduct(product.id);
                  }}
                >
                  Add Product {product.id}
                </button>
                <button
                  onClick={() => {
                    removeProductFromCart(product.id);
                  }}
                >
                  Remove Product {product.id}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export async function getStaticProps({ req }) {
  const products = await getProducts();

  return {
    props: {
      products
    }
  };
}
