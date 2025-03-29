// import React, { useCallback, useState } from "react";
// import PropTypes from "prop-types";
// import { Box, ClickAwayListener, Paper, Typography } from "@mui/material";
// import MonacoEditor from "@monaco-editor/react";
// import ReactMarkdown from "react-markdown";

// const InputCell = ({ data, index, setCells, setActivatedCell }) => {
//   const [isSelected, setIsSelected] = useState(false);
//   // Separate state for markdown editing if you want to differ from code editing:
//   const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);

//   const handleCodeChange = (value) => {
//     setCells((prev) => {
//       const newCells = [...prev];
//       newCells[index] = {
//         ...newCells[index],
//         source: value.split("\n"),
//       };
//       return newCells;
//     });
//   };

//   const handleMarkdownChange = (value) => {
//     setCells((prev) => {
//       const newCells = [...prev];
//       newCells[index] = {
//         ...newCells[index],
//         source: value.split("\r\n"),
//       };
//       return newCells;
//     });
//   };

//   return (
//     <ClickAwayListener
//       onClickAway={() => {
//         setIsSelected(false);
//         setIsEditingMarkdown(false);
//       }}
//     >
//       <Paper
//         elevation={isSelected ? 3 : 1}
//         sx={{
//           border: isSelected ? "2px solid #0078d7" : "none",
//           borderRadius: "5px",
//           overflow: "hidden",
//           background: isSelected ? "white" : "#f5f5f5",
//         }}
//       >
//         <Box
//           sx={{ p: 1, display: "flex", alignItems: "center" }}
//           onClick={() => {
//             setIsSelected(true);
//             if (data.cell_type === "markdown") setIsEditingMarkdown(true);
//           }}
//         >
//           {/* Jupyter-style prompt number */}
//           <Box
//             sx={{
//               color: "#666",
//               minWidth: "40px",
//               textAlign: "right",
//               pr: 1,
//               fontSize: "14px",
//             }}
//           >
//             [1]:
//           </Box>

//           {/* Cell Content */}
//           <Box flex={1}>
//             {/* CODE CELL */}
//             {data?.cell_type === "code" && (
//               <MonacoEditor
//                 height="150px"
//                 language="python"
//                 theme="vs-light"
//                 value={data.source.join("\n")}
//                 options={{
//                   minimap: { enabled: false },
//                   lineNumbers: "off",
//                   glyphMargin: false,
//                   folding: false,
//                   scrollBeyondLastLine: false,
//                   automaticLayout: true,
//                 }}
//                 onChange={handleCodeChange}
//               />
//             )}

//             {/* MARKDOWN CELL */}
//             {data?.cell_type === "markdown" && (
//               <>
//                 {isEditingMarkdown ? (
//                   // Show Monaco Editor for Markdown
//                   <MonacoEditor
//                     height="150px"
//                     language="markdown"
//                     theme="vs-light"
//                     value={data.source.join("\n")}
//                     options={{
//                       minimap: { enabled: false },
//                       lineNumbers: "off",
//                       glyphMargin: false,
//                       folding: false,
//                       scrollBeyondLastLine: false,
//                       automaticLayout: true,
//                     }}
//                     onChange={handleMarkdownChange}
//                     onMount={(editor) => {
//                       editor.onDidFocusEditorWidget(() => {
//                         setIsSelected(true);
//                         setActivatedCell(index);
//                       });
//                       editor.onDidBlurEditorWidget(() => {
//                         console.log("qqqqqqqqqqqqqqqqqqqqq");
//                         setIsEditingMarkdown(false);
//                       });
//                     }}
//                   />
//                 ) : (
//                   // Show rendered Markdown
//                   <Box
//                     sx={{ cursor: "pointer" }}
//                     // onClick={() => setIsEditingMarkdown(true)}
//                   >
//                     <ReactMarkdown>{data.source.join("\n")}</ReactMarkdown>
//                   </Box>
//                 )}
//               </>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </ClickAwayListener>
//   );
// };

// InputCell.propTypes = {
//   data: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
// };

// export default React.memo(InputCell);

// import React, { useCallback, useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import { Box, ClickAwayListener, Paper } from "@mui/material";
// import MonacoEditor from "@monaco-editor/react";
// import ReactMarkdown from "react-markdown";

// const InputCell = ({ data, index, setCells, setActivatedCell }) => {
//   const [isSelected, setIsSelected] = useState(false);
//   const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);

//   const codeValue = useMemo(() => data.source.join("\n"), [data.source]);

//   const handleCodeChange = useCallback(
//     (value) => {
//       setCells((prev) => {
//         const newCells = [...prev];
//         newCells[index] = { ...newCells[index], source: value.split("\n") };
//         return newCells;
//       });
//     },
//     [index, setCells]
//   );

//   const handleMarkdownChange = useCallback(
//     (value) => {
//       setCells((prev) => {
//         const newCells = [...prev];
//         newCells[index] = { ...newCells[index], source: value.split("\r\n") };
//         return newCells;
//       });
//     },
//     [index, setCells]
//   );
//   console.log("rere render input cell", index, data.cell_type);
//   // When the cell is clicked, update active cell state
//   const handleClick = useCallback(() => {
//     setIsSelected(true);
//     setActivatedCell(index);
//   }, [index, setActivatedCell]);

//   return (
//     <Paper
//       elevation={isSelected ? 3 : 1}
//       sx={{
//         border: isSelected ? "2px solid #0078d7" : "none",
//         borderRadius: "5px",
//         overflow: "hidden",
//         background: isSelected ? "white" : "#f5f5f5",
//         mb: 2,
//       }}
//       onClick={handleClick}
//     >
//       <Box sx={{ p: 1, display: "flex", alignItems: "center" }}>
//         <Box
//           sx={{
//             color: "#666",
//             minWidth: "40px",
//             textAlign: "right",
//             pr: 1,
//             fontSize: "14px",
//           }}
//         >
//           [{index + 1}]:
//         </Box>

//         <Box flex={1}>
//           {data.cell_type === "code" && (
//             <MonacoEditor
//               height="150px"
//               language="python"
//               theme="vs-light"
//               value={codeValue}
//               options={{
//                 minimap: { enabled: false },
//                 lineNumbers: "off",
//                 glyphMargin: false,
//                 folding: false,
//                 scrollBeyondLastLine: false,
//                 automaticLayout: true,
//               }}
//               onMount={(editor) => {
//                 editor.onDidFocusEditorWidget(() => setIsSelected(true));
//                 editor.onDidBlurEditorWidget(() => setIsSelected(false));
//               }}
//               onChange={handleCodeChange}
//             />
//           )}

//           {data.cell_type === "markdown" && (
//             <>
//               <ClickAwayListener onClickAway={() => setIsSelected(false)}>
//                 {isEditingMarkdown ? (
//                   <>
//                     <MonacoEditor
//                       height="150px"
//                       language="markdown"
//                       theme="vs-light"
//                       value={codeValue}
//                       options={{
//                         minimap: { enabled: false },
//                         lineNumbers: "off",
//                         glyphMargin: false,
//                         folding: false,
//                         scrollBeyondLastLine: false,
//                         automaticLayout: true,
//                       }}
//                       onMount={(editor) => {
//                         editor.onDidFocusEditorWidget(() =>
//                           setIsSelected(true)
//                         );
//                         editor.onDidBlurEditorWidget(() => {
//                           setIsSelected(false);
//                         });
//                       }}
//                       onChange={handleMarkdownChange}
//                     />
//                   </>
//                 ) : (
//                   <Box
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => setIsEditingMarkdown(true)}
//                   >
//                     <ReactMarkdown>{codeValue}</ReactMarkdown>
//                   </Box>
//                 )}
//               </ClickAwayListener>
//             </>
//           )}
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// InputCell.propTypes = {
//   data: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
//   setCells: PropTypes.func.isRequired,
//   setActivatedCell: PropTypes.func.isRequired,
// };

// export default React.memo(InputCell);

import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, ClickAwayListener, Paper, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MonacoEditor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

const InputCell = ({ data, index, setCells, setActivatedCell }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);
  console.log("re-render input cell", index);

  const codeValue = useMemo(() => data.source.join("\n"), [data.source]);

  const handleCodeChange = useCallback(
    (value) => {
      setCells((prev) => {
        const newCells = [...prev];
        newCells[index] = { ...newCells[index], source: value.split("\n") };
        return newCells;
      });
    },
    [index, setCells]
  );

  const handleMarkdownChange = useCallback(
    (value) => {
      setCells((prev) => {
        const newCells = [...prev];
        newCells[index] = { ...newCells[index], source: value.split("\r\n") };
        return newCells;
      });
    },
    [index, setCells]
  );

  // When the cell is clicked, update active cell state
  const handleClick = useCallback(() => {
    setIsSelected(true);
    setActivatedCell(index);
    if (data.cell_type === "markdown") {
      setIsEditingMarkdown(true);
    }
  }, [data.cell_type, index, setActivatedCell]);

  // Handler to move this cell up
  const handleMoveUp = useCallback(() => {
    setIsSelected(false);
    setIsEditingMarkdown(false);
    setCells((prev) => {
      if (index === 0) return prev;
      const newCells = [...prev];
      [newCells[index - 1], newCells[index]] = [
        newCells[index],
        newCells[index - 1],
      ];
      return newCells;
    });
  }, [index, setCells]);

  // Handler to move this cell down
  const handleMoveDown = useCallback(() => {
    setIsSelected(false);
    setIsEditingMarkdown(false);
    setCells((prev) => {
      if (index === prev.length - 1) return prev;
      const newCells = [...prev];
      [newCells[index], newCells[index + 1]] = [
        newCells[index + 1],
        newCells[index],
      ];
      return newCells;
    });
  }, [index, setCells]);
  console.log("re-render input cell", index);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsSelected(false);
        setIsEditingMarkdown(false);
      }}
    >
      <Paper
        elevation={isSelected ? 3 : 1}
        sx={{
          position: "relative",
          border: isSelected ? "2px solid #0078d7" : "none",
          borderRadius: "5px",
          overflow: "hidden",
          background: isSelected ? "white" : "#f5f5f5",
          mb: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Floating Menu */}
          {isSelected && (
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                zIndex: 10,
                display: "flex",
                gap: 0.5,
              }}
            >
              <IconButton size="small" onClick={handleMoveUp}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleMoveDown}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <Box
            sx={{ p: 1, display: "flex", alignItems: "center" }}
            onClick={handleClick}
          >
            {/* Jupyter-style prompt number */}
            <Box
              sx={{
                color: "#666",
                minWidth: "40px",
                textAlign: "right",
                pr: 1,
                fontSize: "14px",
              }}
            >
              [{index + 1}]:
            </Box>

            {/* Cell Content */}
            <Box flex={1}>
              {data.cell_type === "code" && (
                <MonacoEditor
                  height="150px"
                  language="python"
                  theme="vs-light"
                  value={codeValue}
                  options={{
                    minimap: { enabled: false },
                    lineNumbers: "off",
                    glyphMargin: false,
                    folding: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                  onChange={handleCodeChange}
                  onMount={(editor) => {
                    editor.onDidFocusEditorWidget(() => {
                      setIsSelected(true);
                      setActivatedCell(index);
                    });
                    // editor.onDidBlurEditorWidget(() => setIsSelected(false));
                  }}
                />
              )}

              {data.cell_type === "markdown" && (
                <>
                  {isEditingMarkdown ? (
                    <MonacoEditor
                      height="150px"
                      language="markdown"
                      theme="vs-light"
                      value={codeValue}
                      options={{
                        minimap: { enabled: false },
                        lineNumbers: "off",
                        glyphMargin: false,
                        folding: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                      onChange={handleMarkdownChange}
                      onMount={(editor) => {
                        editor.onDidFocusEditorWidget(() => {
                          setIsSelected(true);
                          setActivatedCell(index);
                        });
                        editor.onDidBlurEditorWidget(() => {
                          setIsEditingMarkdown(false);
                        });
                      }}
                    />
                  ) : (
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => setIsEditingMarkdown(true)}
                    >
                      <ReactMarkdown>{codeValue}</ReactMarkdown>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};

InputCell.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setCells: PropTypes.func.isRequired,
  setActivatedCell: PropTypes.func.isRequired,
};

export default React.memo(InputCell);