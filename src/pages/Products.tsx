import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../app/store";
import { getProductList } from "../features/products/productsSlice";
import Product from "../component/Product";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import Filter from "../component/Filter";

const Products = () => {
  const dispatch = useDispatch();

  const { productList, isLoading, isError, message } = useSelector(
    (state: RootState) => state.productList
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else {
      dispatch(getProductList());
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <main className="products-list container-column">
        <Filter />
        <ul className="products">
          {productList.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </ul>
      </main>
    );
  }
};

export default Products;
