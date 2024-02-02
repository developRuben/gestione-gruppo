import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDatabaseTable } from "../firebase";
import { get, push, set } from "firebase/database";
import { Button, TextField } from "@mui/material";
import Icon from "../icon";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar";

export default function Comitive() {
  const [data, setData] = useState();
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [formValue, setFormValue] = useState({
    argomento: "",
    conduttore: "",
    mese: "",
  });
  const [isEditing, setIsEditing] = useState("");

  const table = getDatabaseTable("comitive");
  const fetchData = () => {
    get(table).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
    });
  };
  const setValues = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };
  const setComitiveData = () => {
    push(table, formValue);
    setIsAddingNewRow(false);
    clearForm();
    fetchData();
  };
  const editRow = () => {
    const currentRow = getDatabaseTable(`comitive/${isEditing}`);
    set(currentRow, formValue);
    setIsEditing("");
    clearForm();
    fetchData();
  };

  const removeRow = (id) => {
    const currentRow = getDatabaseTable(`comitive/${id}`);
    set(currentRow, null);
    fetchData();
  };

  const clearForm = () => {
    setFormValue({
      argomento: "",
      conduttore: "",
      mese: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <caption>
            <Button
              fullWidth
              variant="contained"
              endIcon={<Icon icon={fas.faPlus}></Icon>}
              onClick={() => {
                setIsAddingNewRow(true);
              }}
              disabled={isAddingNewRow}
            >
              AGGIUNGI NUOVA COMITIVA
            </Button>
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ARGOMENTO
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                CONDUTTORE
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                MESE
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && (
              <>
                {Object.entries(data).map((row, index) => (
                  <>
                    {isEditing !== row[0] && (
                      <TableRow key={`row-${index}`}>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].argomento}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].conduttore}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].mese}
                        </TableCell>
                        <TableCell
                          align="center"
                          component="th"
                          scope="row"
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <Button
                            onClick={() => {
                              setIsEditing(row[0]);
                              setFormValue(row[1]);
                            }}
                            variant="contained"
                          >
                            <Icon icon={fas.faEdit}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              removeRow(row[0]);
                            }}
                            variant="contained"
                            color="error"
                            sx={{ marginLeft: "5px" }}
                          >
                            <Icon icon={fas.faTrash}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    {isEditing === row[0] && (
                      <TableRow key={`row-${index}-edit`}>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            fullWidth
                            label="Argomento"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, "argomento");
                            }}
                            value={formValue.argomento}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            fullWidth
                            label="Conduttore"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, "conduttore");
                            }}
                            value={formValue.conduttore}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            fullWidth
                            label="Mese"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, "mese");
                            }}
                            value={formValue.mese}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Button onClick={editRow} variant="contained">
                            <Icon icon={fas.faSave}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing("");
                            }}
                            variant="outlined"
                            sx={{ marginLeft: "5px" }}
                          >
                            <Icon icon={fas.faClose}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </>
            )}
            {isAddingNewRow && (
              <TableRow key={`add-row`}>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    fullWidth
                    label="Argomento"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, "argomento");
                    }}
                    value={formValue.argomento}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    fullWidth
                    label="Conduttore"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, "conduttore");
                    }}
                    value={formValue.conduttore}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    fullWidth
                    label="Mese"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, "mese");
                    }}
                    value={formValue.mese}
                  ></TextField>
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Button onClick={setComitiveData} variant="contained">
                    <Icon icon={fas.faSave}></Icon>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingNewRow(false);
                    }}
                    variant="outlined"
                    sx={{ marginLeft: "5px" }}
                  >
                    <Icon icon={fas.faClose}></Icon>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <footer>
        <p>© 2024 - GESTIONALE SAVA 2 </p>
      </footer>
    </div>
  );
}
