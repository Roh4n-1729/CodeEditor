import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";

import {
  Folder,
  InsertDriveFileOutlined as FileIcon,
} from "@mui/icons-material";
import { useState } from "react";

const File = ({ name, onClick, file }) => {
  return (
    <ListItemButton onClick={() => onClick(file)}>
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

export const Sidebar = ({ setSelectedFile }) => {
  const filetree = [
    {
      type: "folder",
      name: "Documents",
      path: "/Documents",
      children: [
        { type: "file", name: "Resume.pdf", path: "/Documents/Resume.pdf" },
        { type: "file", name: "Resume.ipynb", path: "/Documents/Resume.ipynb" },
        { type: "file", name: "Resume.jpg", path: "/Documents/Resume.jpg" },
        {
          type: "file",
          name: "CoverLetter.docx",
          path: "/Documents/CoverLetter.docx",
        },
        {
          type: "folder",
          name: "Projects",
          path: "/Documents/Projects",
          children: [
            {
              type: "file",
              name: "Project1.txt",
              path: "/Documents/Projects/Project1.txt",
            },
            {
              type: "file",
              name: "Project2.js",
              path: "/Documents/Projects/Project2.js",
            },
            {
              type: "folder",
              name: "SubFolder",
              path: "/Documents/Projects/SubFolder",
              children: [
                {
                  type: "file",
                  name: "Notes.md",
                  path: "/Documents/Projects/SubFolder/Notes.md",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "Pictures",
      path: "/Pictures",
      children: [
        { type: "file", name: "Vacation.jpg", path: "/Pictures/Vacation.jpg" },
        { type: "file", name: "Family.png", path: "/Pictures/Family.png" },
      ],
    },
    { type: "file", name: "todo.txt", path: "/todo.txt" },
  ];

  return (
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
  );
};
