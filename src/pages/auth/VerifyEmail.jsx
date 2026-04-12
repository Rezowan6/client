import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth/authService.js";

const VerifyEmail = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus(res.message || "Verified Successfully");
      } catch (error) {
        setStatus(error?.response?.data?.message || "Error occurred");
        setError(true);
      }
    };

    verify();
  }, [token]);

return (
  <div style={styles.container}>
    
    {status === "loading" && (
      <h2>⏳ Verifying your email...</h2>
    )}

    {!error && status !== "loading" && (
      <div>
        <h2 style={{ color: "green" }}>
          ✅ {status}
        </h2>
        <p>You can now login to your account.</p>
      </div>
    )}

    {error && (
      <div>
        <h2 style={{ color: "red" }}>
          ❌ Verification Failed
        </h2>
        <p>{status}</p>
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