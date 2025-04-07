import React from "react";
import PropTypes from "prop-types";

const Image = ({ data = "", mediaType = "image/jpeg", metadata }) => {
  // Extract width and height from metadata if provided
  const size = metadata
    ? { width: metadata.width, height: metadata.height }
    : {};

  return (
    <img
      alt=""
      src={`data:${mediaType};base64,${data}`}
      style={{
        display: "block",
        maxWidth: "100%",
        ...size,
      }}
    />
  );
};

Image.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["image/png", "image/jpeg", "image/gif"]),
  metadata: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

export default Image;
