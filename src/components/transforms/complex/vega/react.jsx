import React, { useEffect, useRef, useState } from "react";
import embed from "./external";

const VegaEmbed = ({
  spec,
  mediaType,
  options,
  resultHandler,
  errorHandler,
}) => {
  const anchorRef = useRef(null);
  const embedResultRef = useRef(null);
  const [embedError, setEmbedError] = useState(null);

  const callEmbedder = async () => {
    if (!anchorRef.current) return;
    console.log("aaaaaaaaaaa", anchorRef.current, mediaType, spec, options);
    try {
      const result = await embed(anchorRef.current, mediaType, spec, options);
      embedResultRef.current = result;
      console.log("resssssult", result);
      if (resultHandler) {
        resultHandler(result);
      }
      setEmbedError(null);
    } catch (error) {
      if (errorHandler) {
        errorHandler(error);
      }
      setEmbedError(error);
    }
  };

  useEffect(() => {
    callEmbedder();

    // Cleanup: Finalize the embed on unmount or before re-embedding
    return () => {
      if (embedResultRef.current) {
        if (typeof embedResultRef.current.finalize === "function") {
          embedResultRef.current.finalize();
        } else if (
          embedResultRef.current.view &&
          typeof embedResultRef.current.view.finalize === "function"
        ) {
          embedResultRef.current.view.finalize();
        }
        embedResultRef.current = null;
      }
    };
  }, [spec]); // Re-run only if the spec changes

  return (
    <div>
      {embedError && (
        <div style={{ color: "red", marginBottom: "1em" }}>
          {embedError.toString()}
        </div>
      )}
      <div ref={anchorRef} />
    </div>
  );
};

export default VegaEmbed;
