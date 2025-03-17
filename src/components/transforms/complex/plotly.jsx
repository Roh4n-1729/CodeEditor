import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Plotly from "plotly.js";
import cloneDeep from "lodash.clonedeep";

const MIMETYPE = "application/vnd.plotly.v1+json";

const PlotlyTransform = ({ data, mediaType = MIMETYPE }) => {
  const plotDivRef = useRef(null);

  // Convert input data (string or object) into a mutable figure object.
  const getFigure = () => {
    let figure = data;
    if (typeof figure === "string") {
      try {
        figure = JSON.parse(figure);
      } catch (e) {
        console.error("Error parsing Plotly figure JSON:", e);
        figure = {};
      }
    }
    // Clone if the object is frozen so Plotly can mutate it.
    if (figure && Object.isFrozen(figure)) {
      figure = cloneDeep(figure);
    }
    // Provide defaults for missing properties.
    const {
      data: plotData = {},
      layout = {},
      config = undefined,
      frames = undefined,
    } = figure || {};
    return { data: plotData, layout, config, frames };
  };

  // Initialize the plot on mount.
  useEffect(() => {
    const figure = getFigure();
    if (plotDivRef.current) {
      if (figure.config || figure.frames) {
        Plotly.newPlot(plotDivRef.current, figure);
      } else {
        Plotly.newPlot(plotDivRef.current, figure.data, figure.layout);
      }
    }
    // Run once on mount.
  }, []);

  // Update/redraw the plot when data changes.
  useEffect(() => {
    const figure = getFigure();
    if (plotDivRef.current) {
      plotDivRef.current.data = figure.data;
      plotDivRef.current.layout = figure.layout;
      Plotly.redraw(plotDivRef.current);
    }
  }, [data]);

  // Apply a container style based on the layout if provided.
  const figure = getFigure();
  const style = {};
  if (figure.layout && figure.layout.height && !figure.layout.autosize) {
    style.height = figure.layout.height;
  }

  return <div ref={plotDivRef} style={style} />;
};

PlotlyTransform.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  mediaType: PropTypes.oneOf([MIMETYPE]),
};

PlotlyTransform.defaultProps = {
  mediaType: MIMETYPE,
  data: "",
};

export default PlotlyTransform;
