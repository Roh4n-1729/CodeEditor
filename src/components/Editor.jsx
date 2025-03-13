import React from "react";
import MonacoEditor from "@monaco-editor/react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Icon, IconButton, Tab, Typography } from "@mui/material";
import { Circle, CloseRounded } from "@mui/icons-material";

import IpynbEditor from "./IpynbEditor";
const getLanguage = (path) => {
  const ext = path.split(".").pop();
  switch (ext) {
    case "js":
      return "javascript";
    case "py":
      return "python";
    case "java":
      return "java";
    case "cpp":
      return "cpp";
    case "c":
      return "c";
    case "html":
      return "html";
    case "csv":
      return "csv";
    default:
      return "plaintext";
  }
};

const Editor = React.memo(
  ({ file, getFileContent, setEdited, currentlyActive, setActiveContent }) => {
    const [content, setContent] = React.useState("");
    var origionalContent = React.useRef("");
    console.log("currentlyActive", currentlyActive);
    React.useEffect(() => {
      //   getFileContent(file.path).then((data) => {
      //     origionalContent.current = data;
      //     setContent(data);
      //   });
    }, [file, getFileContent]);

    React.useEffect(() => {
      if (currentlyActive) {
        setActiveContent(content);
      }
    }, [currentlyActive, content]);

    return (
      <>
        {file?.path?.endsWith(".jpg") ? (
          // <IpynbEditor file={file} />
          // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=" />
          <iframe
            src="demo_iframe.htm"
            name="iframe_a"
            title="Iframe Example"
          ></iframe>
        ) : (
          <MonacoEditor
            height="75vh"
            defaultLanguage="python"
            language={getLanguage(file.path)}
            theme="vs-dark"
            value={content}
            onChange={(value) => {
              setContent(value);
              setEdited(file.path);
            }}
            path={file.path}
          />
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.file.path === nextProps.file.path;
  }
);

Editor.displayName = "Editor";

const EditorFileTab = ({ file, removeFile, isEdited }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "150px",
        "&:hover": {
          "& .close-icon": {
            visibility: "visible",
          },
        },
      }}
    >
      <Typography>{file.path.split("/").slice(-1)}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {isEdited && <Circle sx={{ color: "white" }} fontSize="12px" />}
        <CloseRounded
          sx={{
            visibility: "hidden",
            color: "white",
          }}
          className="close-icon"
          onClick={(event) => {
            event.stopPropagation();
            // Check if the file is edited before closing
            if (file?.isEdited) {
              const confirmClose = window.confirm(
                "You have unsaved changes. Are you sure you want to close this file?"
              );
              if (!confirmClose) {
                return;
              }
            }
            removeFile(file);
          }}
        />
      </Box>
    </Box>
  );
};

const EditorList = ({
  getFileContent,
  activatedFiles,
  setActivatedFiles,
  activeFilePath,
  setActiveFilePath,
  setActiveContent,
}) => {
  const handleChange = (event, newValue) => {
    setActiveFilePath(newValue);
  };

  const removeFile = (file) => {
    setActivatedFiles((prev) => {
      const newfiles = prev.filter((f) => f.path !== file.path);
      if (activeFilePath === file.path) {
        setActiveFilePath(newfiles.length ? newfiles[0].path : null);
      }
      return newfiles;
    });
  };

  return (
    <TabContext value={activeFilePath}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="File List">
          {activatedFiles.map((file, index) => (
            <Tab
              key={index}
              label={
                <EditorFileTab
                  file={file}
                  removeFile={removeFile}
                  isEdited={file?.isEdited}
                />
              }
              value={file.path}
              sx={{
                color: "white",
                textTransform: "none",
                padding: 0,
                px: 2,
              }}
            />
          ))}
        </TabList>
      </Box>
      {activatedFiles.map((file, index) => (
        <Box
          key={file.path}
          sx={{
            p: 0,
            display: activeFilePath === file.path ? "block" : "none",
          }}
        >
          <Editor
            getFileContent={getFileContent}
            file={file}
            setEdited={(path) => {
              setActivatedFiles((prev) =>
                prev.map((f) => {
                  if (f.path === path) {
                    return { ...f, isEdited: true };
                  }
                  return f;
                })
              );
            }}
            currentlyActive={activeFilePath === file.path}
            setActiveContent={setActiveContent}
          />
        </Box>
      ))}
    </TabContext>
  );
};

export default EditorList;
