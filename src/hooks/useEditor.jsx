import { useEffect, useState } from "react";

const useEditor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activatedFiles, setActivatedFiles] = useState([]);
  const [activeFilePath, setActiveFilePath] = useState(
    activatedFiles.length ? activatedFiles[0].path : null
  );

  useEffect(() => {
    if (selectedFile) {
      switch (selectedFile.type) {
        case "folder":
          break;
        case "file":
          setActivatedFiles((prev) => {
            if (prev.find((f) => f.path === selectedFile.path)) return prev;
            return [...prev, selectedFile];
          });
          setActiveFilePath(selectedFile.path);
          break;
      }
    }
  }, [selectedFile]);

  return {
    activatedFiles,
    setActivatedFiles,
    setSelectedFile,
    activeFilePath,
    setActiveFilePath,
  };
};

export default useEditor;
