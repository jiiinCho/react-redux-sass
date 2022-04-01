import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductItemT } from "../interface";

interface ProductProps {
  item: ProductItemT;
}

const Product = ({ item }: ProductProps) => {
  const { title, price, image, id } = item;
  return (
    <li className="product container-center-column">
      <img src={image} alt="product image" className="product-img m-3" />
      <section className="container-center-space-between">
        <article className="product-meta mr-3">
          <h4 className="my-3">{title}</h4>
          <p className="my-3">{price} kr</p>
        </article>
        <Link to={`/products/${id}`} className="btn-primary">
          <FaArrowRight />
        </Link>
      </section>
    </li>
  );
};

export default Product;
