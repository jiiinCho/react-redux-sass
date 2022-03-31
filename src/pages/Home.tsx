import Header from "../component/Header";
import Human from "../assets/human.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="home container-center-column">
      <Header />
      <section className="container-center-column">
        <article className="container-center">
          <img src={Human} alt="shopping human" />
          <div className="home-content-container container-center-column">
            <h2 className="my-3">SUPER DEAL</h2>
            <p className="lh-2">
              Looking to get your wardrobe refreshed for the summer? Now is the
              time!
            </p>
            <button
              className="btn-secondary-main"
              type="button"
              onClick={() => navigate("/products")}
            >
              Explore
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
