import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { ProductT } from "../interface";
import { updateCart } from "../features/cart/cartSlice";

interface CartProps {
  item: ProductT;
}

const Cart = ({ item }: CartProps) => {
  const quantity = item.quantity;
  const dispatch = useDispatch();

  const onDecrease = () => {
    if (quantity <= 1) {
      toast.error("quantity cannot be below one");
    } else {
      const updated = { ...item, quantity: quantity - 1 };
      dispatch(updateCart(updated));
    }
  };

  const onIncrease = () => {
    const updated = { ...item, quantity: quantity + 1 };
    console.log("updated in Cart", updated);
    dispatch(updateCart(updated));
  };
  const { productList } = useSelector((state: RootState) => state.productList);
  const found = productList.find((product) => product.id === item.productId);

  if (!found) {
    return <h1>Product Not Found!</h1>;
  } else {
    const { image, title, price } = found;
    return (
      <li className="cart-item container-center">
        <img src={image} alt="product image" className="cart-img" />
        <article className="cart-meta container-column-space-between">
          <h3>{title}</h3>
          <p>{price} kr</p>

          <div className="cart-buttons container-center-space-between">
            <div className="container-center">
              <button
                className="btn-value container-center"
                id="decrease"
                onClick={onDecrease}
              >
                -
              </button>
              <span className="cart-quantity">{quantity}</span>
              <button
                className="btn-value container-center"
                id="increase"
                onClick={onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </article>
      </li>
    );
  }
};

export default Cart;
