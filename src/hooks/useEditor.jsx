import { useEffect, useState } from "react";

const useEditor = () => {
  const sfiletree = [
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

  const [filetree, setFiletree] = useState(sfiletree);

  const [selectedFile, setSelectedFile] = useState(null);
  const [activatedFiles, setActivatedFiles] = useState([]);
  const [activeFilePath, setActiveFilePath] = useState(
    activatedFiles.length ? activatedFiles[0].path : null
  );
  console.log("activeFilePath", activeFilePath);

  useEffect(() => {
    if (selectedFile) {
      switch (selectedFile.type) {
        case "folder":
          setActiveFilePath(selectedFile.path);
          break;
        case "file":
          setActivatedFiles((prev) => {
            if (prev.find((f) => f.path === selectedFile.path)) return prev;
            return [...prev, selectedFile];
          });
          setActiveFilePath(selectedFile.path);
          break;
        case "root":
          setActiveFilePath("/");
      }
    }
  }, [selectedFile]);

  return {
    activatedFiles,
    setActivatedFiles,
    setSelectedFile,
    activeFilePath,
    setActiveFilePath,
    filetree,
    setFiletree,
  };
};

export default useEditor;
