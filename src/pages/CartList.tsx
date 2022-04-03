import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import Cart from "../component/Cart";
import Kvitto from "../component/Kvitto";
import Spinner from "../component/Spinner";

const CartList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { products, isLoading } = useSelector((state: RootState) => state.cart);
  const { productList } = useSelector((state: RootState) => state.productList);

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
      <main className="cart-list-container">
        <section className="cart-list-section">
          <div className="kvitto-container mobile">
            <Kvitto sum={sum} />
          </div>
          <ul className="cart-list">
            {products.map((product) => (
              <Cart key={product.productId} item={product} />
            ))}
          </ul>
          <div className="kvitto-container">
            <Kvitto sum={sum} />
          </div>
        </section>
      </main>
    );
  }
};

export default CartList;
