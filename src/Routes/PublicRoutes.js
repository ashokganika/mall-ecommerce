import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "../Screens/HomePage/HomePage";
import Login from "../Screens/Login/Login";
import UserAllMalls from "../Screens/UserAllMalls/UserAllMalls";
import UserAllShops from "../Screens/UserAllShops/UserAllShops";
import UserMallDetail from "../Screens/UserMallDetail/UserMallDetail";
import UserShopDetail from "../Screens/UserShopDetail/UserShopDetail";

function PublicRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/all-malls" component={UserAllMalls} />
        <Route exact path="/all-shops" component={UserAllShops} />
        <Route exact path="/mall-detail/:mallId" component={UserMallDetail} />
        <Route
          exact
          path="/shop-detail/:mallId/:shopId"
          component={UserShopDetail}
        />
      </Switch>
    </>
  );
}

export default PublicRoutes;
