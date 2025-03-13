/* eslint-disable */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// import React from "react";
// import { concatMultilineString } from "./helpers.jsx";
// import { getTransform } from "./transforms.jsx";

// export class CellOutput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.saveAsIcon = React.createRef();
//     this.plotIcon = React.createRef();
//     this.copyImageIcon = React.createRef();
//     this.disposables = [];
//   }

//   componentWillUnmount() {
//     this.disposables.forEach((d) => d.dispose());
//   }

//   render() {
//     const mimeBundle = this.props.output.data;
//     let data = mimeBundle[this.props.mimeType];

//     // If the data is a multiline string array, concat it
//     if (Array.isArray(data)) {
//       data = concatMultilineString(data, true);
//     }

//     switch (this.props.mimeType) {
//       case "image/svg+xml":
//       case "image/png":
//       case "image/gif":
//       case "image/jpeg":
//       case "image/webp":
//         return this.renderImage(
//           this.props.mimeType,
//           data,
//           this.props.output.metadata
//         );
//       default:
//         return this.renderOutput(data, this.props.mimeType);
//     }
//   }

//   renderImage(mimeType, data, metadata = {}) {
//     const imgStyle = { maxWidth: "100%", height: "auto" };
//     const divStyle = { overflow: "scroll", position: "relative" };
//     const imgSrc =
//       mimeType.toLowerCase().includes("svg") && typeof data === "string"
//         ? undefined
//         : URL.createObjectURL(data);
//     const customMetadata = metadata.metadata;
//     const showPlotViewer = metadata.__displayOpenPlotIcon === true;
//     const showCopyImage = mimeType === "image/png";
//     const copyButtonMargin = showPlotViewer ? "85px" : "45px";
//     if (customMetadata && typeof customMetadata.needs_background === "string") {
//       imgStyle.backgroundColor =
//         customMetadata.needs_background === "light" ? "white" : "black";
//     }
//     const imgHeightWidth = {};
//     const imageMetadata = customMetadata ? customMetadata[mimeType] : undefined;
//     if (imageMetadata && imageMetadata.height) {
//       imgHeightWidth.height = imageMetadata.height;
//     }
//     if (imageMetadata && imageMetadata.width) {
//       imgHeightWidth.width = imageMetadata.width;
//     }
//     if (imageMetadata && imageMetadata.unconfined === true) {
//       imgStyle.maxWidth = "none";
//     }

//     const saveAs = () => {
//       if (this.props.ctx.postMessage) {
//         this.props.ctx.postMessage({
//           type: "saveImageAs",
//           outputId: this.props.outputId,
//           mimeType: this.props.mimeType,
//         });
//       }
//     };

//     const openPlot = () => {
//       if (this.props.ctx.postMessage) {
//         this.props.ctx.postMessage({
//           type: "openImageInPlotViewer",
//           outputId: this.props.outputId,
//           mimeType: this.props.mimeType,
//         });
//       }
//     };

//     const onMouseOver = () => {
//       if (this.saveAsIcon.current)
//         this.saveAsIcon.current.className = "plotIcon";
//       if (this.plotIcon.current) this.plotIcon.current.className = "plotIcon";
//       if (this.copyImageIcon.current)
//         this.copyImageIcon.current.className = "plotIcon";
//     };

//     const onMouseOut = () => {
//       if (this.saveAsIcon.current)
//         this.saveAsIcon.current.className = "plotIcon hidden";
//       if (this.plotIcon.current)
//         this.plotIcon.current.className = "plotIcon hidden";
//       if (this.copyImageIcon.current)
//         this.copyImageIcon.current.className = "plotIcon hidden";
//     };

//     const contents = imgSrc ? (
//       <img src={imgSrc} style={imgStyle} {...imgHeightWidth} alt="" />
//     ) : (
//       <div
//         className="svgContainerStyle"
//         dangerouslySetInnerHTML={{ __html: data.toString() }}
//       />
//     );

//     return (
//       <div
//         className="display"
//         style={divStyle}
//         onMouseOver={onMouseOver}
//         onMouseOut={onMouseOut}
//       >
//         <button
//           ref={this.saveAsIcon}
//           style={{ position: "absolute", top: "5px", right: "5px" }}
//           className="plotIcon hidden"
//           onClick={saveAs}
//           role="button"
//           aria-pressed="false"
//           title="Save As"
//           aria-label="Save As"
//         >
//           <span>
//             <span className="image-button-child">
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   className="plotIconSvgPath"
//                   d="M12.0147 2.8595L13.1397 3.9845L13.25 4.25V12.875L12.875 13.25H3.125L2.75 12.875V3.125L3.125 2.75H11.75L12.0147 2.8595ZM3.5 3.5V12.5H12.5V4.406L11.5947 3.5H10.25V6.5H5V3.5H3.5ZM8 3.5V5.75H9.5V3.5H8Z"
//                 />
//               </svg>
//             </span>
//           </span>
//         </button>
//         {showPlotViewer && (
//           <button
//             ref={this.plotIcon}
//             style={{ position: "absolute", top: "5px", right: "45px" }}
//             className="plotIcon hidden"
//             onClick={openPlot}
//             role="button"
//             aria-pressed="false"
//             title="Expand image"
//             aria-label="Expand image"
//           >
//             <span>
//               <span className="image-button-child">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     className="plotIconSvgPath"
//                     d="M9.71429 6.28571V12.2857H7.14286V6.28571H9.71429ZM13.1429 2.85714V12.2857H10.5714V2.85714H13.1429ZM2.85714 13.1429H14V14H2V2H2.85714V13.1429ZM6.28571 4.57143V12.2857H3.71429V4.57143H6.28571Z"
//                   />
//                 </svg>
//               </span>
//             </span>
//           </button>
//         )}
//         {showCopyImage && (
//           <button
//             ref={this.copyImageIcon}
//             style={{
//               position: "absolute",
//               top: "5px",
//               right: copyButtonMargin,
//             }}
//             className="plotIcon hidden"
//             onClick={copyPlotImage}
//             role="button"
//             aria-pressed="false"
//             title="Copy to Clipboard"
//             aria-label="Copy to Clipboard"
//           >
//             <span>
//               <span className="image-button-child">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     className="plotIconSvgPath"
//                     d="m4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z"
//                   />
//                   <path
//                     className="plotIconSvgPath"
//                     d="M3 1L2 2v10l1 1V2h6.414l-1-1H3z"
//                   />
//                 </svg>
//               </span>
//             </span>
//           </button>
//         )}
//         {contents}
//       </div>
//     );
//   }

//   renderOutput(data, mimeType) {
//     const Transform = getTransform(this.props.mimeType);
//     const vegaPlot = mimeType && isVegaPlot(mimeType);
//     const divStyle = { backgroundColor: vegaPlot ? "white" : undefined };

//     if (vegaPlot) {
//       data = typeof data === "string" ? data : JSON.stringify(data);
//     }
//     return (
//       <div style={divStyle}>
//         <Transform data={data} onError={console.error} />
//       </div>
//     );
//   }
// }

// function isVegaPlot(mimeType) {
//   return mimeType.includes("application/vnd.vega");
// }

// cellOutput.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from "react";
import { concatMultilineString } from "./helpers";
import { getTransform } from "./transforms";

// Dummy constants and clipboard implementation
export const OpenImageInPlotViewer = "openImageInPlotViewer";
export const SaveImageAs = "saveImageAs";
export const IsJupyterExtensionInstalled = "isJupyterExtensionInstalled";
export const noop = () => {};
export function writeImageToClipboard(data) {
  return Promise.resolve();
}

// Set a global flag for Jupyter installation (for demonstration)
globalThis.__isJupyterInstalled = false;

export class CellOutput extends React.Component {
  constructor(props) {
    super(props);
    this.saveAsIcon = React.createRef();
    this.plotIcon = React.createRef();
    this.copyImageIcon = React.createRef();
    this.disposables = [];
  }

  componentWillUnmount() {
    this.disposables.forEach((d) => d.dispose && d.dispose());
  }

  render() {
    const mimeBundle = this.props.output.data;
    let data = mimeBundle[this.props.mimeType];

    // If the data is a multiline string (array), concatenate it
    if (Array.isArray(data)) {
      data = concatMultilineString(data, true);
    }

    switch (this.props.mimeType) {
      case "image/svg+xml":
      case "image/png":
      case "image/gif":
      case "image/jpeg":
      case "image/webp":
        return this.renderImage(
          this.props.mimeType,
          data,
          this.props.output.metadata
        );
      default:
        return this.renderOutput(data, this.props.mimeType);
    }
  }

  renderImage(mimeType, data, metadata = {}) {
    // In a non–VS Code renderer, you can replace these with your own logic.
    if (this.props.ctx && this.props.ctx.postMessage) {
      this.props.ctx.postMessage({ type: "isJupyterExtensionInstalled" });
    }
    if (this.props.ctx && this.props.ctx.onDidReceiveMessage) {
      const disposable = this.props.ctx.onDidReceiveMessage((response) => {
        if (
          response &&
          response.type === "isJupyterExtensionInstalled" &&
          response.response
        ) {
          globalThis.__isJupyterInstalled = response.response;
        }
      });
      this.disposables.push(disposable);
    }

    const imgStyle = { maxWidth: "100%", height: "auto" };
    const divStyle = { overflow: "scroll", position: "relative" };
    const imgSrc =
      mimeType.toLowerCase().includes("svg") && typeof data === "string"
        ? undefined
        : URL.createObjectURL(data);
    const customMetadata = metadata.metadata;
    const showPlotViewer = metadata.__displayOpenPlotIcon === true;
    const showCopyImage = mimeType === "image/png";
    const copyButtonMargin = showPlotViewer ? "85px" : "45px";

    if (customMetadata && typeof customMetadata.needs_background === "string") {
      imgStyle.backgroundColor =
        customMetadata.needs_background === "light" ? "white" : "black";
    }
    const imgHeightWidth = {};
    const imageMetadata = customMetadata ? customMetadata[mimeType] : undefined;
    if (imageMetadata && imageMetadata.height) {
      imgHeightWidth.height = imageMetadata.height;
    }
    if (imageMetadata && imageMetadata.width) {
      imgHeightWidth.width = imageMetadata.width;
    }
    if (imageMetadata && imageMetadata.unconfined === true) {
      imgStyle.maxWidth = "none";
    }

    const saveAs = () => {
      if (this.props.ctx && this.props.ctx.postMessage) {
        this.props.ctx.postMessage({
          type: SaveImageAs,
          outputId: this.props.outputId,
          mimeType: this.props.mimeType,
        });
      }
    };

    const openPlot = () => {
      if (this.props.ctx && this.props.ctx.postMessage) {
        this.props.ctx.postMessage({
          type: OpenImageInPlotViewer,
          outputId: this.props.outputId,
          mimeType: this.props.mimeType,
        });
      }
    };

    const copyPlotImage = () => {
      writeImageToClipboard(data).then(noop);
    };

    const onMouseOver = () => {
      if (!globalThis.__isJupyterInstalled) return;
      if (this.saveAsIcon.current)
        this.saveAsIcon.current.className = "plotIcon";
      if (this.plotIcon.current) this.plotIcon.current.className = "plotIcon";
      if (this.copyImageIcon.current)
        this.copyImageIcon.current.className = "plotIcon";
    };

    const onMouseOut = () => {
      if (!globalThis.__isJupyterInstalled) return;
      if (this.saveAsIcon.current)
        this.saveAsIcon.current.className = "plotIcon hidden";
      if (this.plotIcon.current)
        this.plotIcon.current.className = "plotIcon hidden";
      if (this.copyImageIcon.current)
        this.copyImageIcon.current.className = "plotIcon hidden";
    };

    const contents = imgSrc ? (
      <img src={imgSrc} style={imgStyle} {...imgHeightWidth} alt="" />
    ) : (
      <div
        className="svgContainerStyle"
        dangerouslySetInnerHTML={{ __html: data.toString() }}
      />
    );

    return (
      <div
        className="display"
        style={divStyle}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <button
          ref={this.saveAsIcon}
          style={{ position: "absolute", top: "5px", right: "5px" }}
          className="plotIcon hidden"
          onClick={saveAs}
          role="button"
          title="Save As"
          aria-label="Save As"
        >
          <span>
            <span className="image-button-child">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  className="plotIconSvgPath"
                  d="M12.0147 2.8595L13.1397 3.9845L13.25 4.25V12.875L12.875 13.25H3.125L2.75 12.875V3.125L3.125 2.75H11.75L12.0147 2.8595ZM3.5 3.5V12.5H12.5V4.406L11.5947 3.5H10.25V6.5H5V3.5H3.5ZM8 3.5V5.75H9.5V3.5H8Z"
                />
              </svg>
            </span>
          </span>
        </button>
        {showPlotViewer && (
          <button
            ref={this.plotIcon}
            style={{ position: "absolute", top: "5px", right: "45px" }}
            className="plotIcon hidden"
            onClick={openPlot}
            role="button"
            title="Expand image"
            aria-label="Expand image"
          >
            <span>
              <span className="image-button-child">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    className="plotIconSvgPath"
                    d="M9.71429 6.28571V12.2857H7.14286V6.28571H9.71429ZM13.1429 2.85714V12.2857H10.5714V2.85714H13.1429ZM2.85714 13.1429H14V14H2V2H2.85714V13.1429ZM6.28571 4.57143V12.2857H3.71429V4.57143H6.28571Z"
                  />
                </svg>
              </span>
            </span>
          </button>
        )}
        {showCopyImage && (
          <button
            ref={this.copyImageIcon}
            style={{
              position: "absolute",
              top: "5px",
              right: copyButtonMargin,
            }}
            className="plotIcon hidden"
            onClick={copyPlotImage}
            role="button"
            title="Copy to Clipboard"
            aria-label="Copy to Clipboard"
          >
            <span>
              <span className="image-button-child">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    className="plotIconSvgPath"
                    d="m4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z"
                  />
                  <path
                    className="plotIconSvgPath"
                    d="M3 1L2 2v10l1 1V2h6.414l-1-1H3z"
                  />
                </svg>
              </span>
            </span>
          </button>
        )}
        {contents}
      </div>
    );
  }

  renderOutput(data, mimeType) {
    const Transform = getTransform(this.props.mimeType);
    const vegaPlot = mimeType && mimeType.includes("application/vnd.vega");
    const divStyle = { backgroundColor: vegaPlot ? "white" : undefined };

    if (vegaPlot) {
      data = typeof data === "string" ? data : JSON.stringify(data);
    }
    return (
      <div style={divStyle}>
        <Transform data={data} onError={console.error} />
      </div>
    );
  }
}
