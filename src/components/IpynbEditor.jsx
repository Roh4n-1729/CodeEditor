import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Button, IconButton, Input } from "@mui/material";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const TextCodeArea = styled(Input)({
  background: "#edededed",
  borderRadius: "4px",
  fontFamily: "monospace",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
  padding: "12px 18px",
  ":hover + .textCodeAction": {
    display: "block",
  },
});

const TextCodeAction = styled(Box)({
  display: "none",
  background: "#fff",
  padding: "5px 12px",
  borderRadius: "8px",
  position: "absolute",
  top: "0",
  right: "10px",
  ":hover": {
    display: "block",
  },
});

const AddTextCodeArea = styled(Button)({
  margin: "0 0 24px 0",
});

const IpynbEditor = ({ fileContent, onFileContentChanged }) => {
  const [cells, setCells] = useState([{ id: uuidv4(), source: [] }]);

  useEffect(() => {
    if (fileContent !== undefined) {
      const codeCells = cloneDeep(fileContent);
      setCells(codeCells?.cells);
    }
  }, []);

  /**
   * @function handleTextCodeChange
   * @description Handles changes in the text fileContent area.
   * @param {object} e - The function's event.
   * @param {number} index - Index of the sibling.
   * @returns {void} returns nothing.
   */
  const handleTextCodeChange = React.useCallback(
    (e, index) => {
      e.preventDefault();
      const newCode = e.target.value;
      const cellsCopy = cloneDeep(cells);
      cellsCopy[index].source =
        newCode && newCode?.includes("\n")
          ? newCode?.split(/(?<=\n)/g)
          : [newCode];
      setCells(cellsCopy);

      onFileContentChanged(
        {
          ...fileContent,
          cells: cellsCopy,
        }
        // JSON.stringify({
        //   ...(typeof fileContent === 'string'
        //     ? JSON.parse(fileContent)
        //     : fileContent),
        //   cells: cellsCopy,
        // })
      );
    },
    [cells, onFileContentChanged]
  );

  /**
   * @function handleAddTextCodeArea
   * @description Rearranges the cells up or down w.r.t the sibling cells.
   * @param {object} e - The function's event.
   * @param {number} index - Index of the sibling.
   * @param {string} direction - Indicates direction or rearrangement.
   * @returns {void} returns nothing.
   */
  const handleRearrangeCell = React.useCallback(
    (e, index, direction) => {
      e.preventDefault();
      const cellsCopy = JSON.parse(JSON.stringify(cells));
      const rearrangeCell = cellsCopy?.splice(index, 1);
      // console.log(rearrangeCell, direction, cellsCopy);
      switch (direction) {
        case "up":
          cellsCopy?.splice(index - 1, 0, ...rearrangeCell);
          break;
        case "down":
          cellsCopy?.splice(index + 1, 0, ...rearrangeCell);
          break;

        default:
          break;
      }
      setCells(cellsCopy);
    },
    [cells]
  );

  /**
   * @function handleDeleteCell
   * @description Deletes the cell using the cell ID.
   * @param {object} e - The function's event.
   * @param {string} id - Index of the sibling.
   * @returns {void} returns nothing.
   */
  const handleDeleteCell = React.useCallback(
    (e, id) => {
      e.preventDefault();
      const newCellsList = cells?.filter((cell) => cell.id !== id);
      setCells(newCellsList);
      onFileContentChanged({
        ...fileContent,
        cells: newCellsList,
      });
    },
    [cells, fileContent]
  );

  /**
   * @function handleAddTextCodeArea
   * @description Adds a new cell which displays a new text field to write fileContent.
   * @param {object} e - The function's event.
   * @param {number} index - Index of the sibling.
   * @returns {void} returns nothing.
   */
  const handleAddTextCodeArea = React.useCallback(
    (e, index) => {
      e.preventDefault();
      const newId = uuidv4();
      const newCell = {
        id: `${newId}`,
        source: [""],
      };
      const newCellsList = JSON.parse(JSON.stringify(cells));
      newCellsList?.splice(index + 1, 0, newCell);
      setCells(newCellsList);

      onFileContentChanged({
        ...fileContent,
        cells: newCellsList,
      });
    },
    [cells, fileContent]
  );

  return (
    <>
      {cells?.map((cell, index) => {
        const { id } = cell;
        // const pyCode = [cell.source.join(' ')];
        return (
          <Box id="fileIPYNB" key={id} position="relative" paddingLeft="12px">
            {/* Python Code TextField */}
            <TextCodeArea
              id={`textCodeArea-${id}`}
              fullWidth
              multiline
              value={cell?.source?.join("")}
              placeholder="Start coding"
              onChange={(e) => handleTextCodeChange(e, index)}
            />

            {/* ACTIONS -> rearrange and delete */}
            <TextCodeAction className="textCodeAction">
              <Box display="flex" alignItems="center" gap="5px">
                <IconButton
                  disabled={index === 0}
                  sx={{ padding: "4px" }}
                  onClick={(e) => handleRearrangeCell(e, index, "up")}
                  title="Move cell up"
                >
                  <ArrowUpwardRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  disabled={index === cells?.length - 1}
                  sx={{ padding: "4px" }}
                  onClick={(e) => handleRearrangeCell(e, index, "down")}
                  title="Move cell down"
                >
                  <ArrowDownwardRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{ padding: "4px" }}
                  onClick={(e) => handleDeleteCell(e, id)}
                  title="Delete cell/code block"
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </TextCodeAction>

            {/* Add a new row button */}
            <AddTextCodeArea
              id={`addTextCodeArea-${id}`}
              fullWidth
              onClick={(e) => handleAddTextCodeArea(e, index)}
              title="Add a new cell/code block"
            >
              <AddCircleOutlineRoundedIcon />
            </AddTextCodeArea>
          </Box>
        );
      })}
    </>
  );
};

export default IpynbEditor;

IpynbEditor.propTypes = {
  fileContent: PropTypes.string.isRequired,
  onFileContentChanged: PropTypes.func.isRequired,
};
