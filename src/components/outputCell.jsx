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
import { Box } from "@mui/material";

function CompositeOutput(props) {
  const { output, children } = props;
  console.log("checkkkkk", output);
  return (
    <RichMedia data={output.data} metadata={output.metadata}>
      {children}
    </RichMedia>
  );
}
CompositeOutput.defaultProps = {
  output: null,
  output_type: ["display_data", "execute_result"],
};

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

const renderOutput = (data, index) => {
  console.log("data", data);
  if (
    data.output_type === "execute_result" ||
    data.output_type === "display_data" ||
    data.output_type === "update_display_data"
  ) {
    const mimeType = Object.keys(data.data)[0];
    switch (mimeType) {
      case "text/html":
        return (
          <RichMedia data={data.data} key={index}>
            <HTML mediaType="text/html" />
          </RichMedia>
        );
      case "image/png":
      case "image/jpeg":
      case "image/gif":
      case "image/webp":
        return (
          <Image
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "application/javascript":
        return (
          <JavaScript
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "application/json":
        return (
          <Json
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "text/latex":
        return (
          <LaTeX
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "text/markdown":
        return (
          // <Markdown
          //   data={data.data[mimeType]}
          //   key={index}
          //   mediaType={mimeType}
          //   metadata={data.metadata}
          // />
          <>Markdown</>
        );
      case "text/plain":
        return (
          <Plain
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "image/svg+xml":
        return (
          <SVG
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "application/vnd.plotly.v1+json":
        return (
          <PlotlyTransform
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      case "application/vnd.geo+json":
        return (
          <GeoJSONTransform
            data={data.data[mimeType]}
            key={index}
            mediaType={mimeType}
            metadata={data.metadata}
          />
        );
      default:
        return <Box> MIME not supported</Box>;
    }
  }

  if (data.output_type === "stream") {
    return <StreamText output={data} key={index} output_type="stream" />;
  }

  if (data.output_type === "error") {
    return <KernelOutputError output={data} key={index} output_type="error" />;
  }
};

const OutputCell = ({ index, data }) => {
  return (
    <div className="output-cell" key={index}>
      {data.outputs.map((output, index) => {
        return (
          <div key={index} className="output">
            {renderOutput(output, index)}
          </div>
        );
      })}
    </div>
  );
};

OutputCell.propTypes = {};

export default React.memo(OutputCell);
