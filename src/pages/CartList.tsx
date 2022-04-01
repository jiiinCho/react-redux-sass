import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import Cart from "../component/Cart";
import Kvitto from "../component/Kvitto";
import Spinner from "../component/Spinner";
import { removeCart } from "../features/cart/cartSlice";

const CartList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart, products, isLoading, isError, isSuccess, message } =
    useSelector((state: RootState) => state.cart);
  const { productList } = useSelector((state: RootState) => state.productList);

  const dispatch = useDispatch();

  const subsumArr: number[] = [];
  products.forEach((product) => {
    const found = productList.find((item) => item.id == product.productId);
    if (found) {
      const subsum = found.price * product.quantity;
      subsumArr.push(subsum);
    }
  });

  const sumRaw = subsumArr.reduce(
    (prev: number, curr: number) => prev + curr,
    0
  );
  const sum = Math.round(sumRaw * 100) / 100;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const onRemoveCart = () => {
    cart
      ? dispatch(removeCart(cart.id))
      : toast.error("something went wrong while reset your cart!");
    isSuccess && toast.success("Your cart is removed!");
  };

  if (!user) {
    return (
      <>
        <h1 className="alert-msg my-10">You are not logged in</h1>
        <div className="cart-list-btn-container container-center">
          <Link to="/login" className="btn-secondary">
            Go to Login
          </Link>
        </div>
      </>
    );
  } else if (isLoading) {
    return <Spinner />;
  } else if (products.length === 0) {
    return <h1 className="alert-msg">Your cart is empty!</h1>;
  } else {
    return (
      <main className="cart-list-container container">
        <div className="kvitto-container mobile">
          <Kvitto sum={sum} />
        </div>
        <ul className="cart-list">
          {products.map((product) => (
            <Cart key={product.productId} item={product} />
          ))}
        </ul>
        <div className="kvitto-container container-column">
          <Kvitto sum={sum} />
          <button
            type="button"
            className="btn-secondary"
            onClick={onRemoveCart}
          >
            Reset Cart
          </button>
        </div>
      </main>
    );
  }
};

export default CartList;
