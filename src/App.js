import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundry";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import AddMall from "./Screens/AddMall/AddMall";
import DashBoard from "./Screens/DashBoard/DashBoard";
import MallDetail from "./Screens/MallDetail/MallDetail";
import AddShop from "./Screens/AddShop/AddShop";
import "react-toastify/dist/ReactToastify.css";
import EditMall from "./Screens/EditMall/EditMall";
import AdminAllMalls from "./Screens/AdminAllMalls/AdminAllMalls";

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <Route exact path="/dashboard" component={DashBoard} />
              <Route exact path="/add-mall" component={AddMall} />
              <Route exact path="/admin-all-malls" component={AdminAllMalls} />
              <Route exact path="/mall-detail/:mallId" component={MallDetail} />
              <Route exact path="/mall/add-shop/:mallId" component={AddShop} />
              <Route
                exact
                path="/mall/edit-mall/:mallId"
                component={EditMall}
              />
            </Switch>
          </BrowserRouter>
        </ErrorBoundary>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
