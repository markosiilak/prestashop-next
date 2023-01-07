// React
import { useRouter } from 'next/router'
import { useEffect } from 'react';

// Libs
import { getCategories, getCategory, getCategoryByURL } from '../lib/api/category';
import { getCategoryProducts } from '../lib/api/product';
import { initSession } from '../lib/api/api';
import { getLanguages } from '../lib/api/languages';

// Components
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

// Packages
import parse from 'html-react-parser';

const Category = ({ categoryData, products }) => {
    useEffect(() => {
        initSession();
    });

    return (
        <>
            <Cart />
            <p>{categoryData.name}</p>
            {parse(categoryData.description)}

            <section className="products">
                {products?.map(
                    (product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                name={product.name}
                                id={product.id}
                                price={product.price_wt} />
                        )
                    }
                )}
            </section>
        </>
    );
}

export default Category;

export async function getStaticProps( { params, locale } ) {
    const { category } = params;

    const categoryData = await getCategoryByURL(category, locale);
    const products = await getCategoryProducts(categoryData.id, locale);

    return {
        props : {
            categoryData,
            products
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { categories } = await getCategories();
    const languages = await getLanguages();

    let paths = [];

    languages.map((lang, indexLang) => {
        for(const categoryData in categories) {
            paths.push({
                params: { category: categories[categoryData].link_rewrite[indexLang].value },
                locale : lang.iso_code
            });
        }
    });

    return {
        paths,
        fallback: false
    };
}
