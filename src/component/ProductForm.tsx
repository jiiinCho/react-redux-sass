import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { addProduct } from "../features/products/productsSlice";

type AddNewItemT = {
  title: string;
  price: number;
  image: string;
  category: string;
};

const ProductForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<AddNewItemT>({
    title: "",
    price: 0,
    image: "",
    category: "",
  });

  const [descript, setDescription] = useState<string>("");

  const { isLoading, isError, message } = useSelector(
    (state: RootState) => state.productList
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

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
      image: formData.image,
      category: formData.category,
    };
    dispatch(addProduct(submitData));
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <form className="product-insert-form container" onSubmit={onFormSubmit}>
        <div className="product-insert-form-divider">
          <label>
            <p className="my-2">Image URL :</p>
            <input
              className="form-control"
              type="text"
              name="image"
              value={formData.image}
              onChange={onChange}
              required
            />
          </label>
          <label>
            <p className="my-2">Title :</p>
            <input
              className="form-control"
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
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
              required
            />
          </label>
        </div>
        <div className="product-insert-form-divider">
          <label>
            <p className="my-2">Category :</p>
            <input
              className="form-control"
              type="text"
              name="category"
              value={formData.category}
              onChange={onChange}
              required
            />
          </label>
          <label>
            <p className="my-2">Description :</p>
            <textarea
              rows={5}
              name="description"
              value={descript}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
          <div className="product-editor-buttons container">
            <button type="submit" className="btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default ProductForm;
