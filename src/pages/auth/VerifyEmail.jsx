import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertPopup from "../../components/alertPopup/AlertPopup.jsx";
import useAlert from "../../hooks/useAlert.jsx";
import { verifyEmail } from "../../services/auth/authService.js";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { alertData, showAlert, closeAlert, confirmAction } =
    useAlert();

  useEffect(() => {
    let timer;

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        showAlert(res.message || "Verified Successfully");

        timer = setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        showAlert(error?.response?.data?.message || "Error occurred");
      }
    };

    verify();

    return () => clearTimeout(timer); // cleanup
  }, [token, navigate, showAlert,]);

  return (
    <>
      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default VerifyEmail;
