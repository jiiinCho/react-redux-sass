import { useDispatch } from "react-redux";
import { sortByCategory } from "../features/products/productsSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const onSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonElem = e.target as HTMLButtonElement;
    const text = buttonElem.innerText;
    console.log("text", text);
    dispatch(sortByCategory(text));
  };

  return (
    <article className="filter container">
      <p className="m-1">Sort by : </p>
      <div className="container">
        <button className="btn-filter" onClick={onSort}>
          All
        </button>
        <button className="btn-filter" onClick={onSort}>
          Clothes
        </button>
        <button type="button" className="btn-filter" onClick={onSort}>
          Jewelery
        </button>
        <button className="btn-filter" onClick={onSort}>
          Electronics
        </button>
      </div>
    </article>
  );
};

export default Filter;
