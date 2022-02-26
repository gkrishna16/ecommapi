import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';
import Axios from 'axios';

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
	console.log(cat, filters, sort);

	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await Axios.get(
					cat
						? `http://localhost:5001/api/products?category=${cat}`
						: `http://localhost:5001/api/products`,
				);

				setProducts(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, [cat]);
	console.log(filters);
	console.log(products);

	useEffect(() => {
		cat &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) => {
						return item[key].includes(value);
					}),
				),
			);
	}, [products, filters, cat]);

	// console.log(filteredProducts);
	// console.log(products);

	useEffect(() => {
		if (sort === 'newest') {
			setFilteredProducts((prev) => {
				return [...prev].sort((a, b) => a.createdAt - b.createdAt);
			});
		} else if (sort === 'asc') {
			setFilteredProducts((prev) => {
				return [...prev].sort((a, b) => {
					return a.price - b.price;
				});
			});
		} else {
			setFilteredProducts((prev) => {
				return [...prev].sort((a, b) => {
					return b.price - a.price;
				});
			});
		}
	}, [sort]);

	return (
		<Container>
			{cat
				? filteredProducts.map((item) => <Product item={item} key={item.id} />)
				: products.map((item) => <Product item={item} key={item.id} />)}
		</Container>
	);
};

export default Products;
