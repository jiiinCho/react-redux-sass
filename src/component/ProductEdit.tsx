import { useState, useEffect } from "react";
import { ProductItemT } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import {
  removeProduct,
  updateProduct,
} from "../features/products/productsSlice";
// import { getProductList } from "../features/products/productsSlice";

type ProductEditProps = {
  product: ProductItemT;
};

type EditorFormT = {
  title: string;
  price: number;
};

const ProductEdit = ({ product }: ProductEditProps) => {
  const { id, title, price, image, description, category } = product;
  const [formData, setFormData] = useState<EditorFormT>({ title, price });
  const [descript, setDescript] = useState<string>(description);

  const dispatch = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = {
      title: formData.title,
      price: formData.price,
      description: descript,
      image,
      category,
      id,
    };
    dispatch(updateProduct(submitData));
  };

  const onDeleteItem = () => {
    dispatch(removeProduct(id));
  };
  const { productList, isLoading, isError, message } = useSelector(
    (state: RootState) => state.productList
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    const found = productList.find((product) => product.id == id);
    if (found) {
      const updated: EditorFormT = { title: found.title, price: found.price };
      setFormData((prev) => ({ ...prev, updated }));
    }
  }, [id, productList]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <li className="product-editor container">
        <img src={image} alt="product" />
        <form className="product-editor-form" onSubmit={onFormSubmit}>
          <label>
            <p className="my-2">Title :</p>
            <input
              className="form-control"
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
            />
          </label>
          <label>
            <p className="my-2">Price :</p>
            <input
              className="form-control"
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
            />
          </label>
          <label>
            <p className="my-2">Description :</p>
            <textarea
              rows={5}
              name="description"
              value={descript}
              onChange={(e) => setDescript(e.target.value)}
            ></textarea>
          </label>
          <div className="product-editor-buttons container">
            <button type="submit" className="btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onDeleteItem}
            >
              Delete
            </button>
          </div>
        </form>
      </li>
    );
  }
};

export default ProductEdit;
