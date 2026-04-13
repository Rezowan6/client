import { BrowserRouter } from "react-router-dom";

// internal import
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
