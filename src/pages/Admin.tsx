import { useState } from "react";
import AdminProducts from "../component/AdminProducts";
import AdminUsers from "../component/AdminUsers";

const Admin = () => {
  const [productList, setProductList] = useState(true);
  const [userList, setUserList] = useState(false);

  const toggleProductList = () => {
    setProductList(true);
    setUserList(false);
  };

  const toggleUserList = () => {
    setProductList(false);
    setUserList(true);
  };

  return (
    <main className="admin">
      <article className="container">
        <button
          className="btn-primary mr-5"
          type="button"
          onClick={toggleProductList}
        >
          Products
        </button>
        <button
          className="btn-secondary"
          type="button"
          onClick={toggleUserList}
        >
          Users
        </button>
      </article>
      {productList && <AdminProducts />}
      {userList && <AdminUsers />}
    </main>
  );
};

export default Admin;
