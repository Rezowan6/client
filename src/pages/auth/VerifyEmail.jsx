import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertPopup from "../../components/alertPopup/AlertPopup.jsx";
import useAlert from "../../hooks/useAlert.jsx";
import { verifyEmail } from "../../services/auth/authService.js";
import Button from './../../components/Button/Button';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { alertData, showAlert, closeAlert, confirmAction } = useAlert();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        showAlert(res.message || "Verified Successfully");
      } catch (error) {
        showAlert(error?.response?.data?.message || "Error occurred");
      }
    };

    verify();
  }, [token]);


  const userLogin = () => {
    navigate("/login");
  }
  return (
    <>
    <div className="flex justify-center items-center">
      <Button text="login" type="button" onclickHandle={userLogin} />
    </div>
      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default VerifyEmail;
