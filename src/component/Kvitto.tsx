import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type KvittoProps = {
  sum: number;
};

const Kvitto = ({ sum }: KvittoProps) => {
  const { cart, isError, message } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRemoveCart = () => {
    cart
      ? dispatch(removeCart(cart.id))
      : toast.error("something went wrong while reset your cart!");
    isError && toast.error(message);
  };

  const onCheckout = () => {
    cart && dispatch(removeCart(cart.id));
    navigate("/checkout");
  };
  return (
    <section className="kvitto container-column">
      <h3 className="my-4">Frakt</h3>
      <h3 className="my-4">0 kr</h3>
      <h3 className="my-4">Total</h3>
      <h3 className="my-4">{sum} kr</h3>
      <div className="kvitto-btn-container container">
        <button type="button" className="btn-secondary" onClick={onRemoveCart}>
          Reset
        </button>
        <button type="button" className="btn-primary" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Kvitto;
