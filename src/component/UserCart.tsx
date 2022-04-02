import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { getUserCart } from "../features/cart/cartSlice";
import { ProductT } from "../interface";
import Spinner from "./Spinner";
import { getProductList } from "../features/products/productsSlice";

const UserCart = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.cart
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, userId]);

  useEffect(() => {
    if (products.length === 0 && userId) {
      dispatch(getUserCart(userId));
    }
  }, [dispatch, userId, products]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <main className="admin-user-cart container-center-column">
        <header>
          <h2 className="my-3">Cart items :</h2>
        </header>
        <ul className="user-cart">
          {products.map((product) => (
            <UserCartItem key={product.productId} product={product} />
          ))}
        </ul>
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </main>
    );
  }
};

export default UserCart;

type UserCartItemProps = {
  product: ProductT;
};

const UserCartItem = ({ product }: UserCartItemProps) => {
  const { productId, quantity } = product;
  const { productList } = useSelector((state: RootState) => state.productList);
  const found = productList.find((product) => product.id == productId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("stop browser, productlist empt?", productList.length === 0);
    productList.length === 0 && dispatch(getProductList());
  }, [dispatch, productList]);

  if (found) {
    const { title, price } = found;
    return (
      <li className="cart-item container m-5">
        <div className="cart-item-meta">
          <h4 className="my-3">{title}</h4>
          <p>Price : {price} kr</p>
          <p>Quantity: {quantity}</p>
        </div>
      </li>
    );
  } else {
    return <h1 className="alert-msg">Please refresh page!</h1>;
  }
};
