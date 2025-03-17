import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function runCodeHere(el, code) {
  if (!el) return;
  try {
    // Evaluate the code in the global context.
    return eval(code);
  } catch (err) {
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    pre.textContent = err.stack ? err.stack : String(err);
    el.appendChild(pre);
    return err;
  }
}

const JavaScript = ({ data = "", mediaType = "text/javascript" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    runCodeHere(containerRef.current, data);
  }, [data]);

  return <div ref={containerRef} />;
};

JavaScript.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["text/javascript"]),
};

export default JavaScript;
