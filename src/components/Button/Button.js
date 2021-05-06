import React from "react";
import "./button.css";

function Button({ text, type, onClick, disabled, fullWidth }) {
  return (
    <button
      className="btn"
      type={type}
      onClick={onClick && onClick}
      disabled={disabled}
      style={fullWidth ? { width: "100%" } : { width: "auto" }}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  fullWidth: false,
  disabled: false,
};

export default Button;
