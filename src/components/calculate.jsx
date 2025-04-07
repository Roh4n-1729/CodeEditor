import PlotlyTransform from "./transforms/complex/plotly";
import GeoJSONTransform from "./transforms/complex/geoJson";
import {
  HTML,
  Image,
  JavaScript,
  LaTeX,
  Markdown,
  Plain,
  SVG,
  Json,
} from "./transforms/components/media";

import {
  DisplayData,
  ExecuteResult,
  KernelOutputError,
  Output,
  PromptRequest,
  RichMedia,
  StreamText,
} from "./transforms/components";
import { Vega } from "react-vega";
import { Box } from "@mui/material";

// output cell

const Cal = ({ value, key }) => {
  const renderOutput = (item, index) => {
    switch (item.output_type) {
      case "text/html":
        return (
          <RichMedia data={item.data} key={index}>
            <HTML mediaType="text/html" />
          </RichMedia>
        );
      case "plotly":
        return (
          <PlotlyTransform
            data={item.data["application/vnd.plotly.v1+json"]}
            key={index}
          />
        );
      case "geojson":
        return (
          <GeoJSONTransform
            data={item.data["application/vnd.geo+json"]}
            key={index}
            metadata={true}
          />
        );
      case "vega":
        return (
          <Vega spec={item.data["application/vnd.vega.v5+json"]} key={index} />
        );
      case "text/plain":
        return (
          <RichMedia data={item.data} key={index}>
            <Plain mediaType="text/plain" />
          </RichMedia>
        );
      case "image/jpeg" || "image/png" || "image/svg+xml" || "image/*":
        return <Image data={item.data["image/jpeg"]} key={index} />;
      default:
        return <Box>Unknown output type: {item.output_type}</Box>;
    }
  };

  return renderOutput(value, key);
};

export default Cal;
