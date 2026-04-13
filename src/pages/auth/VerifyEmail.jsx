import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth/authService.js";

const VerifyEmail = () => {
  const { token } = useParams();

const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");
const [error, setError] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setMessage(res.message || "Verified Successfully");
        setLoading(false);
      } catch (error) {
        setMessage(error?.response?.data?.message || "Error occurred");
        setError(true);
        setLoading(false);
      }
    };

    verify();
  }, [token]);

return (
  <div style={styles.container}>
    
    {loading && (
      <h2> Verifying your email...</h2>
    )}

    {!error && message !== "loading" && (
      <div>
        <h2 style={{ color: "green" }}>
           {message}
        </h2>
        <p>You can now login to your account.</p>
      </div>
    )}

    {error && (
      <div>
        <h2 style={{ color: "red" }}>
           Verification Failed
        </h2>
        <p>{message}</p>
      </div>
    )}

  </div>
);
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default VerifyEmail;