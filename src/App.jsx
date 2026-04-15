import { BrowserRouter } from "react-router-dom";

// internal import
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routers/AppRoutes";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
