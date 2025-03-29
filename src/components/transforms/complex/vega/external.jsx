import React, { useRef, useEffect } from "react";
import vegaEmbed from "vega-embed";
import { MEDIA_TYPES } from "./mime.js"; // Assuming this maps mediaType to version info

const embed = ({ spec, mediaType, options = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Determine version-related settings from your MEDIA_TYPES mapping
      const version = MEDIA_TYPES[mediaType];
      const defaults = {
        actions: false,
        mode: version.kind, // "vega" or "vega-lite"
      };

      // Ensure the spec is a JavaScript object
      let parsedSpec;
      try {
        parsedSpec = typeof spec === "string" ? JSON.parse(spec) : spec;
      } catch (error) {
        console.error("Error parsing spec:", error);
        return;
      }

      // Call vegaEmbed to render the visualization in the container
      vegaEmbed(containerRef.current, parsedSpec, { ...defaults, ...options })
        .then((result) => {
          console.log("Vega chart embedded successfully:", result);
        })
        .catch((error) => {
          console.error("Error embedding Vega chart:", error);
        });
    }
  }, [spec, mediaType, options]);

  return <div ref={containerRef} />;
};

export default embed;
