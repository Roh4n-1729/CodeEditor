import React, { useState } from "react";
import PropTypes from "prop-types";

const PromptRequest = ({ prompt, password, submitPromptReply }) => {
  const [value, setValue] = useState("");

  const containerStyle = {
    marginLeft: "var(--prompt-width, 50px)",
    padding: "5px",
  };

  const labelStyle = {
    paddingRight: "5px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPromptReply(value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        {prompt && <label style={labelStyle}>{prompt}</label>}
        <input
          type={password ? "password" : "text"}
          value={value}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

PromptRequest.propTypes = {
  prompt: PropTypes.string.isRequired,
  password: PropTypes.bool,
  submitPromptReply: PropTypes.func.isRequired,
};

export default PromptRequest;
