import React from "react";
import PropTypes from "prop-types";
import InputCell from "./inputCell";
import OutputCell from "./outputCell";

const JupyterHub = ({ cells, setCells, activatedCell, setActivatedCell }) => {
  console.log("re arranged cells", cells);
  return (
    <div>
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
          {cell.outputs && <OutputCell index={index} data={cell} />}
        </div>
      ))}
    </div>
  );
};

JupyterHub.propTypes = {
  cells: PropTypes.array.isRequired,
  setCells: PropTypes.func.isRequired,
};

export default React.memo(JupyterHub);
