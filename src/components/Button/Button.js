import React from "react";
import "./button.css";

function Button({ text, type, onClick, disabled }) {
  return (
    <button
      className="btn"
      type={type}
      onClick={onClick && onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
