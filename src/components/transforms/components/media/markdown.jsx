import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const Markdown = ({ data = "", mediaType = "text/markdown" }) => {
  return <ReactMarkdown>{data}</ReactMarkdown>;
};

Markdown.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["text/markdown"]),
};

export default Markdown;
