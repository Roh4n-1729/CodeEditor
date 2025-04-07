import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function createFragment(html) {
  const range = document.createRange();
  return range.createContextualFragment(html);
}

const HTML = ({ data = "", mediaType = "text/html" }) => {
  const elRef = useRef(null);

  // If data is an array, join it into a single string.
  const htmlString = Array.isArray(data) ? data.join("") : data;

  useEffect(() => {
    if (elRef.current) {
      // Clear previous contents
      elRef.current.innerHTML = "";
      // Append the new content as a DocumentFragment
      elRef.current.appendChild(createFragment(htmlString));
    }
  }, [htmlString]);

  return <Box ref={elRef} />;
};

HTML.defaultProps = {
  data: "",
  mediaType: "text/html",
};

HTML.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  mediaType: PropTypes.string,
};

export default HTML;
