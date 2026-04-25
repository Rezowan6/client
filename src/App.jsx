import { BrowserRouter } from "react-router-dom";

// internal import
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="pt-16 sm:pt-20 container">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
