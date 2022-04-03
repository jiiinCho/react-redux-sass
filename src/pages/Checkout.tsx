import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  return (
    <main className="container-center-column m-10">
      <h1 className="alert-msg">Thank you for your purchase!</h1>
      <button className="btn-secondary" onClick={() => navigate("/")}>
        Go to main
      </button>
    </main>
  );
};

export default Checkout;
