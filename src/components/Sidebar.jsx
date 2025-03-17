import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Box,
} from "@mui/material";

import {
  Folder,
  InsertDriveFileOutlined as FileIcon,
} from "@mui/icons-material";
import { useState } from "react";

const File = ({ name, onClick, file }) => {
  return (
    <ListItemButton
      onClick={(event) => {
        onClick(file);
        event.stopPropagation();
      }}
    >
      <ListItemIcon>
        <FileIcon
          sx={{
            color: "white",
          }}
        />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

const FolderItem = ({ name, children, onClick, file }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        onClick={(event) => {
          setOpen(!open);
          if (!open) {
            onClick(file);
          }
          event.stopPropagation();
        }}
      >
        <ListItemIcon>
          <Folder
            sx={{
              color: "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {children?.map((file, index) => {
            if (file.type === "file")
              return (
                <File
                  name={file.name}
                  onClick={onClick}
                  key={index}
                  file={file}
                />
              );
            else
              return (
                <FolderItem
                  key={index}
                  onClick={onClick}
                  name={file.name}
                  file={file}
                >
                  {file.children}
                </FolderItem>
              );
          })}
        </List>
      </Collapse>
    </>
  );
};

export const Sidebar = ({ setSelectedFile, filetree }) => {
  return (
    <Box
      onClick={(event) => {
        setSelectedFile({ type: "root" });
        console.log("hrererererer");
        event.stopPropagation();
      }}
      sx={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": { width: "0.4em" },
        "&::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
        "&::-webkit-scrollbar-corner": { backgroundColor: "transparent" },
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "10px",
        minWidth: "200px",
        maxWidth: "200px",
        borderRight: "1px solid white",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <List>
        {filetree.map((file, index) => {
          if (file.type === "file")
            return (
              <File
                name={file.name}
                onClick={setSelectedFile}
                key={index}
                file={file}
              />
            );
          else
            return (
              <FolderItem
                key={index}
                onClick={setSelectedFile}
                name={file.name}
                file={file}
              >
                {file.children}
              </FolderItem>
            );
        })}
      </List>
    </Box>
  );
};
