import React from "react";
import PropTypes from "prop-types";
import {
  DisplayData,
  KernelOutputError,
  Output,
  RichMedia,
  StreamText,
} from "./transforms/components";
import {
  HTML,
  Image,
  JavaScript,
  Json,
  LaTeX,
  Markdown,
  Plain,
  SVG,
} from "./transforms/components/media";
import PlotlyTransform from "./transforms/complex/plotly";
import GeoJSONTransform from "./transforms/complex/geoJson";
import { Box, ClickAwayListener } from "@mui/material";
import { Vega } from "react-vega";

const MIME_COMPONENTS = {
  "text/html": HTML,
  "image/png": Image,
  "application/javascript": JavaScript,
  "application/json": Json,
  "text/latex": LaTeX,
  "text/markdown": Markdown,
  "text/plain": Plain,
  "image/svg+xml": SVG,
};

// Mapping from MIME types to their renderer functions
const mimeRenderers = {
  "application/vnd.vega.v5+json": (data, index, metadata) => (
    <Vega
      spec={data}
      key={index}
      mediaType="application/vnd.vega.v5+json"
      metadata={metadata}
    />
  ),
  "text/html": (data, index, metadata) => (
    // <RichMedia data={data} key={index}>
    <HTML data={data} mediaType="text/html" />
    // </RichMedia>
  ),
  "image/png": (data, index, metadata) => (
    <Image data={data} key={index} mediaType="image/png" metadata={metadata} />
  ),
  "image/jpeg": (data, index, metadata) => (
    <Image data={data} key={index} mediaType="image/jpeg" metadata={metadata} />
  ),
  "image/gif": (data, index, metadata) => (
    <Image data={data} key={index} mediaType="image/gif" metadata={metadata} />
  ),
  "image/webp": (data, index, metadata) => (
    <Image data={data} key={index} mediaType="image/webp" metadata={metadata} />
  ),
  "application/javascript": (data, index, metadata) => (
    <JavaScript
      data={data}
      key={index}
      mediaType="application/javascript"
      metadata={metadata}
    />
  ),
  "application/json": (data, index, metadata) => (
    <Json
      data={data}
      key={index}
      mediaType="application/json"
      metadata={metadata}
    />
  ),
  "text/latex": (data, index, metadata) => (
    <LaTeX data={data} key={index} mediaType="text/latex" metadata={metadata} />
  ),
  "text/markdown": (data, index, metadata) => (
    <Markdown
      data={data}
      key={index}
      mediaType="text/markdown"
      metadata={metadata}
    />
  ),
  "text/plain": (data, index, metadata) => (
    <Plain data={data} key={index} mediaType="text/plain" metadata={metadata} />
  ),
  "image/svg+xml": (data, index, metadata) => (
    <SVG
      data={data}
      key={index}
      mediaType="image/svg+xml"
      metadata={metadata}
    />
  ),
  "application/vnd.plotly.v1+json": (data, index, metadata) => (
    <PlotlyTransform
      data={data}
      key={index}
      mediaType="application/vnd.plotly.v1+json"
      metadata={metadata}
    />
  ),
  "application/vnd.geo+json": (data, index, metadata) => (
    <GeoJSONTransform
      data={data}
      key={index}
      mediaType="application/vnd.geo+json"
      metadata={metadata}
    />
  ),
};

// Preferred MIME order in case multiple formats are available.
const preferredMimeOrder = [
  "application/vnd.vega.v5+json",
  "text/html",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "application/javascript",
  "application/json",
  "text/latex",
  "text/markdown",
  "text/plain",
  "image/svg+xml",
  "application/vnd.plotly.v1+json",
  "application/vnd.geo+json",
];

const getPreferredMimeType = (data) => {
  const keys = Object.keys(data ?? {});
  return preferredMimeOrder.find((mime) => keys.includes(mime)) || keys[0];
};

const renderOutput = (data, index) => {
  if (
    data?.output_type === "execute_result" ||
    data?.output_type === "display_data" ||
    data?.output_type === "update_display_data"
  ) {
    const mimeType = getPreferredMimeType(data?.data);
    const renderer = mimeRenderers[mimeType];
    if (renderer) {
      return renderer(data.data?.[mimeType], index, data?.metadata);
    } else {
      // Fallback: if no renderer is defined for this MIME type, try using the second available MIME.

      return <Box>MIME not supported.</Box>;
    }
  }

  if (data?.output_type === "stream") {
    return <StreamText output={data} key={index} output_type="stream" />;
  }

  if (data?.output_type === "error") {
    return <KernelOutputError output={data} key={index} output_type="error" />;
  }

  return null;
};

const OutputCell = ({ cellIndex, data, activatedCell, setActivatedCell }) => {
  return (
    <Box
      className="output-cell"
      key={cellIndex}
      sx={{
        borderLeft: activatedCell === cellIndex ? "2px solid #0078d7" : "none",
        pl: 1,
        flexGrow: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActivatedCell(cellIndex);
      }}
    >
      {data.outputs.map((output, index) => {
        return (
          <Box key={index} className="output">
            {renderOutput(output, index)}
          </Box>
        );
      })}
    </Box>
  );
};

OutputCell.propTypes = {};

export default React.memo(OutputCell);
