import React from "react";
import VegaEmbed from "./react";

/**
 * Factory function that creates a Vega embed component for a given media type.
 * @param {string} mediaType - The Vega or Vega-Lite MIME type.
 * @returns {React.FunctionComponent} A component that embeds a Vega visualization.
 */
export const Vega = (mediaType) => {
  const EmbedComponent = ({ data, options, onResult, onError }) => (
    <VegaEmbed
      mediaType={mediaType}
      spec={data}
      options={options}
      resultHandler={onResult}
      errorHandler={onError}
    />
  );

  EmbedComponent.defaultProps = {
    mediaType,
  };

  // Attach a static property if needed.
  EmbedComponent.MIMETYPE = mediaType;

  return EmbedComponent;
};

export const Vega2 = Vega("application/vnd.vega.v2+json");
export const Vega3 = Vega("application/vnd.vega.v3+json");
export const Vega4 = Vega("application/vnd.vega.v4+json");
export const Vega5 = Vega("application/vnd.vega.v5+json");
export const VegaLite1 = Vega("application/vnd.vegalite.v1+json");
export const VegaLite2 = Vega("application/vnd.vegalite.v2+json");
export const VegaLite3 = Vega("application/vnd.vegalite.v3+json");
export const VegaLite4 = Vega("application/vnd.vegalite.v4+json");
