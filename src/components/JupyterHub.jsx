import React from "react";
import PropTypes from "prop-types";
import InputCell from "./inputCell";
import OutputCell from "./outputCell";
import { Box, Button } from "@mui/material";

const JupyterHub = ({ cells, setCells, activatedCell, setActivatedCell }) => {
  return (
    <Box>
      {cells.map((cell, index) => (
        <div key={cell.id || index}>
          {cell.source && (
            <InputCell
              index={index}
              data={cell}
              setCells={setCells}
              activatedCell={activatedCell}
              setActivatedCell={setActivatedCell}
            />
          )}
          {cell.outputs && cell.cell_type === "code" && (
            <OutputCell
              cellIndex={index}
              activatedCell={activatedCell}
              setActivatedCell={setActivatedCell}
              data={cell}
            />
          )}
        </div>
      ))}
      <Button
        variant="contained"
        onClick={() =>
          setCells((prev) => [
            ...prev,
            {
              cell_type: "code",
              execution_count: null,
              metadata: {},
              outputs: [],
              source: ["# Add your code here\n"],
            },
          ])
        }
      >
        Add Cell
      </Button>
    </Box>
  );
};

JupyterHub.propTypes = {
  cells: PropTypes.array.isRequired,
  setCells: PropTypes.func.isRequired,
};

export default React.memo(JupyterHub);
