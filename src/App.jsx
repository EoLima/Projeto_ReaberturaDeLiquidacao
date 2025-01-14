import Header from "./components/Header/header";
import "./App.css";
import Main from "./components/Main/Main";
import { ToastContainer } from "react-toastify";
import Providers from "./hooks/Providers";

function App() {
  return (
    <Providers>
      <ToastContainer />
      <Header />
      <Main />
    </Providers>
  );
}

export default App;
