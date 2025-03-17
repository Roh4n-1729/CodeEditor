import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function createFragment(html) {
  const range = document.createRange();
  return range.createContextualFragment(html);
}

const HTML = ({ data = "" }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef.current) {
      while (elRef.current.firstChild) {
        elRef.current.removeChild(elRef.current.firstChild);
      }
      elRef.current.appendChild(createFragment(data));
    }
  }, [data]);

  return <Box ref={elRef} />;
};

HTML.propTypes = {
  data: PropTypes.string,
};

export default HTML;
