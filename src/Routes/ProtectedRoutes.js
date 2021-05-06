import React from "react";
import { Redirect, Route, Switch } from "react-router";
import AddMall from "../Screens/AddMall/AddMall";
import AddShop from "../Screens/AddShop/AddShop";
import AdminAllMalls from "../Screens/AdminAllMalls/AdminAllMalls";
import AdminAllShops from "../Screens/AdminAllShops/AdminAllShops";
import AdminDashBoard from "../Screens/AdminDashBoard/AdminDashBoard";
import AdminEditShop from "../Screens/AdminEditShop/AdminEditShop";
import AdminMallDetail from "../Screens/AdminMallDetail/AdminMallDetail";
import AdminShopDetail from "../Screens/AdminShopDetail/AdminShopDetail";
import EditMall from "../Screens/EditMall/EditMall";

function ProtectedRoutes() {
  return (
    <>
      <Switch>
        <ProtectedRoute
          exact
          path="/admin/dashboard"
          component={AdminDashBoard}
        />
        <ProtectedRoute exact path="/admin/add-mall" component={AddMall} />

        <ProtectedRoute
          exact
          path="/admin/admin-all-malls"
          component={AdminAllMalls}
        />
        <ProtectedRoute
          exact
          path="/admin/admin-all-shops"
          component={AdminAllShops}
        />
        <ProtectedRoute
          exact
          path="/admin/mall-detail/:mallId"
          component={AdminMallDetail}
        />
        <ProtectedRoute
          exact
          path="/admin/mall/add-shop/:mallId"
          component={AddShop}
        />
        <ProtectedRoute
          exact
          path="/admin/edit-shop/:mallId/:shopId"
          component={AdminEditShop}
        />
        <ProtectedRoute
          exact
          path="/admin/shop-detail/:mallId/:shopId"
          component={AdminShopDetail}
        />
        <ProtectedRoute
          exact
          path="/admin/mall/edit-mall/:mallId"
          component={EditMall}
        />
      </Switch>
    </>
  );
}

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

export default ProtectedRoutes;
