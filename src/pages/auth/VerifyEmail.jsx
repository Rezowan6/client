import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth/authService.js";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let timer;

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setMessage(res.message || "Verified Successfully");
        setLoading(false);

        timer = setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage(error?.response?.data?.message || "Error occurred");
        setLoading(false);
      }
    };

    verify();

    return () => clearTimeout(timer); // cleanup
  }, [token, navigate]);

  return (
    <div className="text-white">
      {loading && <h2 className="text-xl text-white">Verifying your email...</h2>}

      {!loading && message && (
        <div>
          <h2 className="text-3xl">{message}</h2>
          <p>You can now login to your account.</p>
        </div>
      )}

      {message && !loading && (
        <div>
          <h2 className="text-red-500">Verification Failed</h2>
          <p className="text-red-500">{message}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
