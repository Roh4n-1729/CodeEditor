// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

// import React from "react";
// import Loadable from "@loadable/component";

// class TransformData {
//   constructor(mimeType, importer) {
//     this.mimeType = mimeType;
//     this.importer = importer;
//     this.cachedPromise = undefined;
//   }

//   getComponent() {
//     if (!this.cachedPromise) {
//       this.cachedPromise = this.importer();
//     }
//     return this.cachedPromise;
//   }
// }

// const mimeTypeToImport = [
//   new TransformData("application/vnd.vega.v2+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega2;
//   }),
//   new TransformData("application/vnd.vega.v3+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega3;
//   }),
//   new TransformData("application/vnd.vega.v4+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega4;
//   }),
//   new TransformData("application/vnd.vega.v5+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega5;
//   }),
//   new TransformData("application/vnd.vegalite.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite1;
//   }),
//   new TransformData("application/vnd.vegalite.v2+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite2;
//   }),
//   new TransformData("application/vnd.vegalite.v3+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite3;
//   }),
//   new TransformData("application/vnd.vegalite.v4+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite4;
//   }),
//   new TransformData("application/geo+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "geojson" */ "@nteract/transform-geojson"
//     );
//     return module.GeoJSONTransform;
//   }),
//   new TransformData("application/vnd.dataresource+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "dataresource" */ "@nteract/transform-dataresource"
//     );
//     return module.DataResourceTransform;
//   }),
//   new TransformData("application/x-nteract-model-debug+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "modeldebug" */ "@nteract/transform-model-debug"
//     );
//     return module.default;
//   }),
//   new TransformData("text/vnd.plotly.v1+html", async () => {
//     const module = await import(
//       /* webpackChunkName: "plotly" */ "@nteract/transform-plotly"
//     );
//     return module.PlotlyNullTransform;
//   }),
//   new TransformData("application/vnd.plotly.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "plotly" */ "@nteract/transform-plotly"
//     );
//     return module.PlotlyTransform;
//   }),
//   new TransformData("image/svg+xml", async () => {
//     const module = await import(
//       /* webpackChunkName: "nteract_transforms" */ "@nteract/transforms"
//     );
//     return module.SVGTransform;
//   }),
//   new TransformData("application/vdom.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "nteract_transforms_vsdom" */ "@nteract/transform-vdom"
//     );
//     return module.VDOM;
//   }),
// ];

// export function getRichestMimetype(data) {
//   let index = mimeTypeToImport.length;
//   const keys = Object.keys(data);
//   keys.forEach((k) => {
//     const keyIndex = mimeTypeToImport.findIndex((m) => m.mimeType === k);
//     if (keyIndex >= 0 && keyIndex < index) {
//       index = keyIndex;
//     }
//   });

//   if (index < mimeTypeToImport.length) {
//     return mimeTypeToImport[index].mimeType;
//   }

//   return keys[0];
// }

// export function getTransform(mimeType, loadingMessage = "Loading...") {
//   return Loadable(
//     async () => {
//       const match = mimeTypeToImport.find((m) => m.mimeType === mimeType);
//       if (match) {
//         const transform = await match.getComponent();
//         return transform;
//       }
//       return () => <div>{`Transform not found for mimetype ${mimeType}`}</div>;
//     },
//     {
//       fallback: <div>{loadingMessage}</div>,
//     }
//   );
// }

// export async function forceLoad() {
//   await Promise.all(mimeTypeToImport.map((m) => m.getComponent()));
// }

// export function isMimeTypeSupported(mimeType) {
//   return !!mimeTypeToImport.find((m) => m.mimeType === mimeType);
// }
// transforms.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// import React from "react";
// import Loadable from "@loadable/component";

// class TransformData {
//   constructor(mimeType, importer) {
//     this.mimeType = mimeType;
//     this.importer = importer;
//     this.cachedPromise = undefined;
//   }
//   getComponent() {
//     if (!this.cachedPromise) {
//       this.cachedPromise = this.importer();
//     }
//     return this.cachedPromise;
//   }
// }

// const mimeTypeToImport = [
//   new TransformData("application/vnd.vega.v2+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega2;
//   }),
//   new TransformData("application/vnd.vega.v3+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega3;
//   }),
//   new TransformData("application/vnd.vega.v4+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega4;
//   }),
//   new TransformData("application/vnd.vega.v5+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.Vega5;
//   }),
//   new TransformData("application/vnd.vegalite.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite1;
//   }),
//   new TransformData("application/vnd.vegalite.v2+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite2;
//   }),
//   new TransformData("application/vnd.vegalite.v3+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite3;
//   }),
//   new TransformData("application/vnd.vegalite.v4+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "vega" */ "@nteract/transform-vega"
//     );
//     return module.VegaLite4;
//   }),
//   new TransformData("application/geo+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "geojson" */ "@nteract/transform-geojson"
//     );
//     return module.GeoJSONTransform;
//   }),
//   new TransformData("application/vnd.dataresource+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "dataresource" */ "@nteract/transform-dataresource"
//     );
//     return module.DataResourceTransform;
//   }),
//   new TransformData("application/x-nteract-model-debug+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "modeldebug" */ "@nteract/transform-model-debug"
//     );
//     return module.default;
//   }),
//   new TransformData("text/vnd.plotly.v1+html", async () => {
//     const module = await import(
//       /* webpackChunkName: "plotly" */ "@nteract/transform-plotly"
//     );
//     return module.PlotlyNullTransform;
//   }),
//   new TransformData("application/vnd.plotly.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "plotly" */ "@nteract/transform-plotly"
//     );
//     return module.PlotlyTransform;
//   }),
//   new TransformData("image/svg+xml", async () => {
//     const module = await import(
//       /* webpackChunkName: "nteract_transforms" */ "@nteract/transforms"
//     );
//     return module.SVGTransform;
//   }),
//   new TransformData("application/vdom.v1+json", async () => {
//     const module = await import(
//       /* webpackChunkName: "nteract_transforms_vsdom" */ "@nteract/transform-vdom"
//     );
//     return module.VDOM;
//   }),
// ];

// export function getRichestMimetype(data) {
//   let index = mimeTypeToImport.length;
//   const keys = Object.keys(data);
//   keys.forEach((k) => {
//     const keyIndex = mimeTypeToImport.findIndex((m) => m.mimeType === k);
//     if (keyIndex >= 0 && keyIndex < index) {
//       index = keyIndex;
//     }
//   });
//   if (index < mimeTypeToImport.length) {
//     return mimeTypeToImport[index].mimeType;
//   }
//   return keys[0];
// }

// export function getTransform(mimeType, loadingMessage = "Loading...") {
//   return Loadable(
//     async () => {
//       const match = mimeTypeToImport.find((m) => m.mimeType === mimeType);
//       if (match) {
//         const transform = await match.getComponent();
//         return transform;
//       }
//       return () => <div>{`Transform not found for mimetype ${mimeType}`}</div>;
//     },
//     {
//       fallback: <div>{loadingMessage}</div>,
//     }
//   );
// }

// export async function forceLoad() {
//   await Promise.all(mimeTypeToImport.map((m) => m.getComponent()));
// }

// export function isMimeTypeSupported(mimeType) {
//   return !!mimeTypeToImport.find((m) => m.mimeType === mimeType);
// }
