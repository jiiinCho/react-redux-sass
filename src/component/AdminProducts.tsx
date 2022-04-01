import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { getProductList } from "../features/products/productsSlice";
import Spinner from "./Spinner";
import ProductEdit from "./ProductEdit";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
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
      <section className="admin-products-container">
        <ProductForm />
        <ul className="admin-products container">
          {productList.map((product) => (
            <ProductEdit key={product.id} product={product} />
          ))}
        </ul>
      </section>
    );
  }
};

export default AdminProducts;
