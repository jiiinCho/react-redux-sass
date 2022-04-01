import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getProductList } from "../features/products/productsSlice";
import { ProductItemT } from "../interface";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productList } = useSelector((state: RootState) => state.productList);
  const [product, setProduct] = useState<ProductItemT | undefined>(undefined);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch, id]);

  useEffect(() => {
    const found = productList.find((product) => product.id.toString() === id);
    setProduct(found);
  }, [productList, id]);
  const onAdd = () => {
    console.log("onAdd click");
  };
  if (product) {
    const { title, price, description, image } = product;
    return (
      <main className="detail cotainer-column">
        <section className="container-center">
          <img src={image} alt="product image" className="detail-img" />
          <article className="detail-meta container-column-space-between">
            <div>
              <h3>{title}</h3>
              <p>{price} kr</p>
              <button className="btn-primary" onClick={onAdd}>
                Add to cart
              </button>
            </div>
            <div>
              <h4>Product information</h4>
              <p>{description}</p>
            </div>
          </article>
        </section>
      </main>
    );
  } else {
    return <h1>Product not found!</h1>;
  }
};

export default ProductDetail;
