import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import Cart from "../component/Cart";
import Spinner from "../component/Spinner";
import { updateCart, removeCart } from "../features/cart/cartSlice";
import { CartT, ProductT } from "../interface";

const CartList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { cart, products, isLoading, isError, isSuccess, message } =
    useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  // const onAddProduct = (product: ProductT) => {
  //     //product = {productId: 1, quantity: 1}
  //     const updatedProducts : ProductT[] = [...products, product];
  //     const requestCart:CartT = {...cart, products: updatedProducts }
  //     dispatch(addCart(requestCart))
  // }

  const onUpdateProduct = (product: ProductT) => {
    //product = {productId: 1, quantity: 1}
    const updatedProducts: ProductT[] = [...products, product];
    if (cart) {
      const requestCart: CartT = { ...cart, products: updatedProducts };
      dispatch(updateCart(requestCart));
    }
    isSuccess && toast.success("Your cart item updated!");
  };

  const onRemoveProduct = (productId: string) => {
    dispatch(removeCart(productId));
    isSuccess && toast.success("Your cart item removed!");
  };

  if (!user) {
    return (
      <>
        <h1>You are not logged in</h1>
        <button type="button" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </>
    );
  } else if (isLoading) {
    return <Spinner />;
  } else if (products.length === 0) {
    return <h1>Your cart is empty!</h1>;
  } else {
    return (
      <main>
        <ul>
          {products.map((product) => (
            <Cart
              key={product.productId}
              item={product}
              onUpdate={onUpdateProduct}
              onRemove={onRemoveProduct}
            />
          ))}
        </ul>
      </main>
    );
  }
};

export default CartList;
