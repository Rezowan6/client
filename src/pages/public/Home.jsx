import { useNavigate } from "react-router-dom";

import mushroom from "../../assets/images/mushroom.png";
import Button from "../../components/Button/Button";


const Home = () => {
  const navigate = useNavigate();

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <>
      <section className={` mt-10 container w-full sm:h-[100vh] flex flex-col justify-between items-center gap-4 sm:flex-row`}>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-cyan-500 font-lobster">Welcome this website</h1>
          <Button text="Create manegar" onclickHandle={registerPage} />
        </div>
        <div>
          <img src={mushroom} alt="mushroom" />
        </div>
      </section>
    </>
  );
};

export default Home;
