import React, { useMemo } from "react";
import PropTypes from "prop-types";
import katex from "katex";
import "katex/dist/katex.min.css";

const LaTeX = ({
  data = "",
  mediaType = "text/latex",
  displayMode = false,
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(data, {
        throwOnError: false,
        displayMode,
      });
    } catch (err) {
      return `<span style="color: red;">${err.message}</span>`;
    }
  }, [data, displayMode]);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

LaTeX.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["text/latex"]),
  displayMode: PropTypes.bool,
};

export default LaTeX;
