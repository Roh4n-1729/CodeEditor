// import React, { useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import PropTypes from "prop-types";

// function createFragment(html) {
//   const range = document.createRange();
//   return range.createContextualFragment(html);
// }
// e;
// const HTML = ({ data = "", mediaType = "text/html" }) => {
//   const elRef = useRef(null);

//   // If data is an array, join it into a single string.
//   const htmlString = Array.isArray(data) ? data.join("") : data;

//   useEffect(() => {
//     if (elRef.current) {
//       // Clear previous contents
//       elRef.current.innerHTML = "";
//       // Append the new content as a DocumentFragment
//       elRef.current.appendChild(createFragment(htmlString));
//     }
//   }, [htmlString]);

//   return <Box ref={elRef} />;
// };

// HTML.defaultProps = {
//   data: "",
//   mediaType: "text/html",
// };

// HTML.propTypes = {
//   data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
//   mediaType: PropTypes.string,
// };

// export default HTML;

import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Vega } from "react-vega";

function createFragment(html) {
  const range = document.createRange();
  return range.createContextualFragment(html);
}

const HTML = ({ data = "", mediaType = "text/html" }) => {
  const elRef = useRef(null);
  const [vegaSpec, setVegaSpec] = useState(null);

  // Convert array to string if needed
  const htmlString = Array.isArray(data) ? data.join("") : data;

  useEffect(() => {
    if (elRef.current) {
      elRef.current.innerHTML = "";
      const fragment = createFragment(htmlString);
      elRef.current.appendChild(fragment);

      // Check if the content contains Vega JSON inside a <script> tag
      const scriptTag = elRef.current.querySelector(
        'script[type="application/json"]'
      );
      if (scriptTag) {
        try {
          const parsedSpec = JSON.parse(scriptTag.textContent);
          setVegaSpec(parsedSpec);
        } catch (err) {
          console.error("Failed to parse Vega JSON:", err);
        }
      }
    }
  }, [htmlString]);
  console.log("vegaSpec", vegaSpec);
  return <Box>{vegaSpec ? <Vega spec={vegaSpec} /> : <Box ref={elRef} />}</Box>;
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
