import { useNavigate } from "react-router-dom";

import mushroom from "../../assets/images/mushroom.png";
import Button from "../../components/Button/Button";
import Style from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <>
      <section className={`${Style.container} container min-h-[100vh] flex justify-between items-center`}>
        <div>
          <h1 className="text-3xl text-white">Welcome this website</h1>
          <Button text="Create manegar" onclickHandle={registerPage} />
        </div>
        <div className={Style.right}>
          <img src={mushroom} alt="mushroom" />
        </div>
      </section>
    </>
  );
};

export default Home;
