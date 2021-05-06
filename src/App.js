import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundry";
import store from "./redux/store";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <Router>
            <Routes />
          </Router>
        </ErrorBoundary>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
