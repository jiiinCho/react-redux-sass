import Human from "../assets/human.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="home container-center-column">
      <article className="container-center">
        <img src={Human} alt="shopping human" />
        <div className="home-content-container container-center-column">
          <h2 className="my-3">SUPER DEAL</h2>
          <p className="lh-2">
            Looking to get your wardrobe refreshed for the summer? Now is the
            time!
          </p>
          <div className="home-button-container">
            <button
              className="btn-secondary-main home-button"
              type="button"
              onClick={() => navigate("/products")}
            >
              Explore
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Home;
