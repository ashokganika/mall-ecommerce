import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundry";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import AddMall from "./Screens/AddMall/AddMall";
import AdminDashBoard from "./Screens/AdminDashBoard/AdminDashBoard";
import MallDetail from "./Screens/MallDetail/MallDetail";
import AddShop from "./Screens/AddShop/AddShop";
import EditMall from "./Screens/EditMall/EditMall";
import AdminAllMalls from "./Screens/AdminAllMalls/AdminAllMalls";
import AdminShopDetail from "./Screens/AdminShopDetail/AdminShopDetail";
import HomePage from "./Screens/HomePage/HomePage";
import Login from "./Screens/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import AdminAllShops from "./Screens/AdminAllShops/AdminAllShops";
import AdminEditShop from "./Screens/AdminEditShop/AdminEditShop";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      path={rest.path}
      render={(props) =>
        localStorage.getItem("admin") ? (
          <div>
            <Component {...props}></Component>
          </div>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={Login} />

              <ProtectedRoute
                exact
                path="/admin/dashboard"
                component={AdminDashBoard}
              />
              <Route exact path="/admin/add-mall" component={AddMall} />

              <Route
                exact
                path="/admin/admin-all-malls"
                component={AdminAllMalls}
              />
              <Route
                exact
                path="/admin/admin-all-shops"
                component={AdminAllShops}
              />
              <Route
                exact
                path="/admin/mall-detail/:mallId"
                component={MallDetail}
              />
              <Route
                exact
                path="/admin/mall/add-shop/:mallId"
                component={AddShop}
              />
              <Route
                exact
                path="/admin/edit-shop/:mallId/:shopId"
                component={AdminEditShop}
              />
              <Route
                exact
                path="/admin/shop-detail/:mallId/:shopId"
                component={AdminShopDetail}
              />
              <Route
                exact
                path="/admin/mall/edit-mall/:mallId"
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
