import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Button from "../../components/Button/Button";
import { findAdmin } from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import "./Login.css";

function Login() {
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const admin = await findAdmin();
      if (admin.exists) {
        console.log(admin.data());
        const { username, password } = { ...admin.data() };
        if (data.username !== username || data.password !== password) {
          notification.showError("Password or username not matched...");
        } else {
          localStorage.setItem("admin", JSON.stringify("admin"));
          history.push("/admin/dashboard");
        }
      } else {
        notification.showError("Password or username not matched...");
      }
    } catch (error) {
      notification.showError("Smothing went wrong...try again");
    }
  };
  return (
    <div className="login-container">
      <h2>Login In </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label htmlFor="username" className="username">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: { value: true, message: "username is required" },
            })}
            id="username"
          />
          <small className="errors">{errors?.username?.message}</small>
        </div>
        <div className="input-field">
          <label htmlFor="Password" className="Password">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
            id="Password"
          />
          <small className="errors">{errors?.password?.message}</small>
        </div>
        <Button type="submit" text="Log In" disabled={false} fullWidth={true} />
      </form>
    </div>
  );
}

export default Login;
