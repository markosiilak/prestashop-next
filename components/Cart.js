// Libs
import { prestaEvents } from '../lib/api/api';
import { getProduct } from '../lib/api/product';
import { getLanguageByIsoCode } from '../lib/api/languages';

// Core
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


export default function Cart() {

    const [cart, setCart] = useState(0);
    const [products, setProducts] = useState([]);

    const { locale } = useRouter();

    useEffect(() => {
        prestaEvents.on('updateCart', async function(cart){
            setCart(cart);

            let cartProductsInfo = new Array();
            const language = await getLanguageByIsoCode(locale);

            if(cart?.associations?.cart_rows && cart.associations.cart_rows.length > 0) {
                cartProductsInfo = await Promise.all(
                    cart?.associations?.cart_rows.map(
                        async (element) => {
                            let product = await getProduct(element.id_product, element.id_product_attribute, language.id);
                            product.quantity = element.quantity;
                            return product;
                        }
                    )
                );
            } else {
                cartProductsInfo = [];
            }

            setProducts(cartProductsInfo);
        });
    }, []);

    const reducerPrice = (accumulator, currentProduct) => parseFloat(accumulator) + (parseFloat(currentProduct.price_wt).toFixed(2) * currentProduct.quantity);
    const reducerQuantity = (accumulator, currentProduct) => accumulator + parseInt(currentProduct.quantity);

    return (
        <>
            <p>Cart</p>
            <p>You have {products?.reduce(reducerQuantity, 0) || 0} items on your cart.</p>

            {products.map(
                (product) => {
                return (<p key={product.id}>{product.quantity}x {product.name} - {parseFloat(product.price_wt).toFixed(2)}</p>)
                }
            )}

            <p>Total: {parseFloat(products?.reduce(reducerPrice, 0)).toFixed(2)}</p>
        </>
    )
}

export async function getStaticProps() {
    return {
        props : {
            cart : null,
            products : []
        }
    }
}
