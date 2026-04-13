import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="bg-black text-white p-6">
        <h1 className="text-4xl mb-6">Welcome My App</h1>
        <div className="lg:max-w-xl">
          <Button
            type="button"
            text="Create Manager"
            onclickHandle={registerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
