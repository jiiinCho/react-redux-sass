import { useState } from "react";
import { ProductT } from "../interface";

interface CartProps {
  item: ProductT;
  onUpdate: (product: ProductT) => void;
  onRemove: (productId: string) => void;
}

const Cart = ({ item, onUpdate, onRemove }: CartProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleOnUpdate = () => {
    setQuantity((prev) => prev + 1);
    onUpdate({ ...item, quantity });
  };

  return (
    <>
      <h1>call product info here{item.productId}</h1>
      <h1>{quantity}</h1>
      <button onClick={handleOnUpdate}>Add item</button>
      <button onClick={() => onRemove(item.productId)}>Remove item</button>
    </>
  );
};

export default Cart;
