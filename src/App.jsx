import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import EditorList from "./components/editor";
import { Sidebar } from "./components/Sidebar";
import useEditor from "./hooks/useEditor";
import IpynbEditor from "./components/IpynbEditor";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  HTML,
  Image,
  JavaScript,
  LaTeX,
  Markdown,
  Plain,
  SVG,
} from "./components/transforms/components/media";

import {
  DisplayData,
  ExecuteResult,
  KernelOutputError,
  Output,
  PromptRequest,
  RichMedia,
  StreamText,
} from "./components/transforms/components";

// Helper function to find node by path
const findNodeByPath = (nodes, targetPath) => {
  for (const node of nodes) {
    if (node.path === targetPath) return node;
    if (node.children) {
      const found = findNodeByPath(node.children, targetPath);
      if (found) return found;
    }
  }
  return null;
};

function App() {
  const {
    activatedFiles,
    setActivatedFiles,
    setSelectedFile,
    activeFilePath,
    setActiveFilePath,
    filetree,
    setFiletree,
  } = useEditor();
  const [activeContent, setActiveContent] = useState("");
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleSave = useCallback(() => {
    if (!activeFilePath) return;
    // Here, you could add your actual save logic (e.g., an API call)
    setActivatedFiles((prevFiles) =>
      prevFiles.map((file) => {
        console.log("file", activeFilePath);
        if (file.path === activeFilePath) {
          return { ...file, isEdited: false };
        }
        return file;
      })
    );
  }, [activeContent, activeFilePath, activatedFiles, setActivatedFiles]);

  const folderSchema = Yup.object().shape({
    path: Yup.string()
      .required("Path is required")
      .test(
        "valid-parent",
        "Parent directory must be a valid folder",
        (value) => {
          const parentPath = value.split("/").slice(0, -1).join("/") || "/";
          const parentNode = findNodeByPath(filetree, parentPath);
          return !!parentNode && parentNode.type === "folder";
        }
      )
      .test(
        "valid-folder-name",
        "Folder name cannot contain special characters",
        (value) => /^[a-zA-Z0-9-_ ]+$/.test(value.split("/").pop())
      ),
  });

  // Validation schema for file creation
  const fileSchema = Yup.object().shape({
    path: Yup.string()
      .required("Path is required")
      .test(
        "valid-parent",
        "Parent directory must be a valid folder",
        (value) => {
          const parentPath = value.split("/").slice(0, -1).join("/") || "/";
          const parentNode = findNodeByPath(filetree, parentPath);
          return !!parentNode && parentNode.type === "folder";
        }
      )
      .test(
        "unique-name",
        "File already exists",
        (value) => !findNodeByPath(filetree, value)
      ),
  });

  const updateFileTree = (nodes, targetPath, newItem) => {
    if (targetPath === "/") return [...nodes, newItem];

    return nodes.map((node) => {
      if (node.path === targetPath && node.type === "folder") {
        return { ...node, children: [...(node.children || []), newItem] };
      }
      if (node.children) {
        return {
          ...node,
          children: updateFileTree(node.children, targetPath, newItem),
        };
      }
      return node;
    });
  };

  const folderFormik = useFormik({
    initialValues: { path: "" },
    validationSchema: folderSchema,
    onSubmit: (values) => {
      const parentPath = values.path.split("/").slice(0, -1).join("/") || "/";
      const name = values.path.split("/").pop();

      setFiletree((prev) =>
        updateFileTree(prev, parentPath, {
          type: "folder",
          name,
          path: values.path,
          children: [],
        })
      );
      setFolderDialogOpen(false);
    },
  });

  const fileFormik = useFormik({
    initialValues: { path: "" },
    validationSchema: fileSchema,
    onSubmit: (values) => {
      const parentPath = values.path.split("/").slice(0, -1).join("/") || "/";
      const name = values.path.split("/").pop();

      setFiletree((prev) =>
        updateFileTree(prev, parentPath, {
          type: "file",
          name,
          path: values.path,
        })
      );
      setFileDialogOpen(false);
    },
  });

  useEffect(() => {
    if (folderDialogOpen) {
      const basePath = activeFilePath?.endsWith("/")
        ? activeFilePath
        : `${activeFilePath}/`;
      folderFormik.setValues({ path: basePath });
    }
  }, [folderDialogOpen]);

  useEffect(() => {
    if (fileDialogOpen) {
      const basePath = activeFilePath?.endsWith("/")
        ? activeFilePath
        : `${activeFilePath}/`;
      fileFormik.setValues({ path: basePath });
    }
  }, [fileDialogOpen]);

  return (
    <>
      <Grid2 container backgroundColor="black">
        <Grid2 item xs={3} backgroundColor="red" width={400}>
          <Sidebar filetree={filetree} setSelectedFile={setSelectedFile} />
        </Grid2>
        <Grid2 item xs={9}>
          {/* {activeFilePath?.endsWith(".ipynb") ? (
          <IpynbEditor
            fileContent={activeContent}
            onFileContentChanged={() => {}}
          />
        ) : ( */}
          <EditorList
            activatedFiles={activatedFiles}
            setActivatedFiles={setActivatedFiles}
            getFileContent={() => {}}
            activeFilePath={activeFilePath}
            setActiveFilePath={setActiveFilePath}
            setActiveContent={setActiveContent}
          />
          {/* )} */}
        </Grid2>

        <Button onClick={handleSave}>Save</Button>
        <Button
          onClick={() => {
            setFolderDialogOpen(true);
          }}
        >
          Add Folder
        </Button>
        <Button
          onClick={() => {
            setFileDialogOpen(true);
          }}
        >
          Add File
        </Button>
      </Grid2>
      <Dialog
        open={folderDialogOpen}
        onClose={() => setFolderDialogOpen(false)}
      >
        <form onSubmit={folderFormik.handleSubmit}>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="standard"
              name="path"
              value={folderFormik.values.path}
              onChange={folderFormik.handleChange}
              error={folderFormik.touched.path && !!folderFormik.errors.path}
              helperText={folderFormik.touched.path && folderFormik.errors.path}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFolderDialogOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={fileDialogOpen} onClose={() => setFileDialogOpen(false)}>
        <form onSubmit={fileFormik.handleSubmit}>
          <DialogTitle>Create New File</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="standard"
              name="path"
              value={fileFormik.values.path}
              onChange={fileFormik.handleChange}
              error={fileFormik.touched.path && !!fileFormik.errors.path}
              helperText={fileFormik.touched.path && fileFormik.errors.path}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFileDialogOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default App;

// index.js
// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { CellOutput } from "./components/render";
// import { getRichestMimetype } from "./components/transforms";

// // Dummy context to simulate message posting (you can expand this as needed)
// const dummyCtx = {
//   postMessage: () => {},
//   onDidReceiveMessage: () => ({ dispose: () => {} }),
// };

// // Sample notebook JSON (nbformat)
// const sampleNotebook = {
//   cells: [
//     {
//       cell_type: "code",
//       execution_count: 1,
//       outputs: [
//         {
//           output_type: "display_data",
//           data: {
//             "text/plain": "Hello, world!",
//             "image/svg+xml":
//               "<svg width='200' height='50'><text x='10' y='25' font-size='20'>Hello, world!</text></svg>",
//           },
//           metadata: {},
//         },
//       ],
//       source: ["print('Hello, world!')"],
//     },
//     {
//       cell_type: "code",
//       execution_count: 2,
//       outputs: [
//         {
//           output_type: "display_data",
//           data: {
//             "text/html":
//               "<div style='border:1px solid #ccc; padding:10px;'><h1>Sample HTML Output</h1><p>This cell demonstrates rich HTML content.</p></div>",
//             "text/plain":
//               "Sample HTML Output: This cell demonstrates rich HTML content.",
//           },
//           metadata: {},
//         },
//       ],
//       source: ["display_html_output()"],
//     },
//     {
//       cell_type: "code",
//       execution_count: 3,
//       outputs: [
//         {
//           output_type: "display_data",
//           data: {
//             "application/vnd.vega.v5+json": {
//               $schema: "https://vega.github.io/schema/vega/v5.json",
//               width: 400,
//               height: 200,
//               padding: 5,
//               data: [
//                 {
//                   name: "table",
//                   values: [
//                     { category: "A", amount: 28 },
//                     { category: "B", amount: 55 },
//                     { category: "C", amount: 43 },
//                     { category: "D", amount: 91 },
//                     { category: "E", amount: 81 },
//                     { category: "F", amount: 53 },
//                     { category: "G", amount: 19 },
//                     { category: "H", amount: 87 },
//                   ],
//                 },
//               ],
//               signals: [
//                 {
//                   name: "tooltip",
//                   value: {},
//                   on: [
//                     { events: "rect:mouseover", update: "datum" },
//                     { events: "rect:mouseout", update: "{}" },
//                   ],
//                 },
//               ],
//               scales: [
//                 {
//                   name: "xscale",
//                   type: "band",
//                   domain: { data: "table", field: "category" },
//                   range: "width",
//                   padding: 0.05,
//                   round: true,
//                 },
//                 {
//                   name: "yscale",
//                   domain: { data: "table", field: "amount" },
//                   nice: true,
//                   range: "height",
//                 },
//               ],
//               axes: [
//                 { orient: "bottom", scale: "xscale" },
//                 { orient: "left", scale: "yscale" },
//               ],
//               marks: [
//                 {
//                   type: "rect",
//                   from: { data: "table" },
//                   encode: {
//                     enter: {
//                       x: { scale: "xscale", field: "category" },
//                       width: { scale: "xscale", band: 1 },
//                       y: { scale: "yscale", field: "amount" },
//                       y2: { scale: "yscale", value: 0 },
//                     },
//                     update: { fill: { value: "steelblue" } },
//                     hover: { fill: { value: "red" } },
//                   },
//                 },
//               ],
//             },
//             "text/plain": "Vega Bar Chart",
//           },
//           metadata: {},
//         },
//       ],
//       source: ["display_vega_chart()"],
//     },
//     {
//       cell_type: "code",
//       execution_count: 4,
//       outputs: [
//         {
//           output_type: "display_data",
//           data: {
//             "application/vnd.plotly.v1+json": {
//               data: [
//                 {
//                   x: [1, 2, 3, 4],
//                   y: [10, 15, 13, 17],
//                   type: "scatter",
//                   mode: "lines+markers",
//                   marker: { color: "blue" },
//                 },
//               ],
//               layout: {
//                 title: "Sample Plotly Chart",
//                 xaxis: { title: "X Axis" },
//                 yaxis: { title: "Y Axis" },
//               },
//             },
//             "text/plain": "Plotly Scatter Chart",
//           },
//           metadata: {},
//         },
//       ],
//       source: ["display_plotly_chart()"],
//     },
//     {
//       cell_type: "code",
//       execution_count: 5,
//       outputs: [
//         {
//           output_type: "display_data",
//           data: {
//             "text/html":
//               "<table border='1' style='border-collapse: collapse;'><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>Alice</td><td>30</td></tr><tr><td>Bob</td><td>25</td></tr></tbody></table>",
//             "text/plain": "Table Output: Name, Age",
//           },
//           metadata: {},
//         },
//       ],
//       source: ["display_table()"],
//     },
//   ],
//   metadata: {
//     kernelspec: {
//       name: "python3",
//       display_name: "Python 3",
//     },
//     language_info: {
//       name: "python",
//       version: "3.x",
//     },
//   },
//   nbformat: 4,
//   nbformat_minor: 2,
// };

// export default function App() {
//   const [notebook] = useState(sampleNotebook);

//   return (
//     <div className="notebook">
//       {notebook.cells.map((cell, cellIndex) => {
//         if (cell.cell_type === "code" && cell.outputs) {
//           return cell.outputs.map((output, outputIndex) => {
//             // Determine the richest mimetype from the output data bundle.
//             const mimeType = getRichestMimetype(output.data);
//             return (
//               <div
//                 key={`cell-${cellIndex}-output-${outputIndex}`}
//                 className="cell-output"
//               >
//                 <CellOutput
//                   output={output}
//                   mimeType={mimeType}
//                   ctx={dummyCtx}
//                   outputId={`cell-${cellIndex}-output-${outputIndex}`}
//                 />
//               </div>
//             );
//           });
//         }
//         // You can add handling for markdown or raw cells here.
//         return null;
//       })}
//     </div>
//   );
// }
