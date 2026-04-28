import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// internal import
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRoutes from "./routers/AppRoutes";
import { getCurrentUser } from "./services/auth/authService";

function App() {
  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) return;

        const user = await getCurrentUser();

        // update localStorage
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log("User sync failed:", error.message);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    };

    syncUser();
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
