import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { findAll, remove } from "../shared/api/favorites";

function Favorites() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  async function fetchData() {
    setLoading(true);
    try {
      const response = await findAll();
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickRemove = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);

    remove(id).then(() => {
      setSnackbar({ open: true, message: "Character removed from favorites" });
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false, message: "" });
  };

  return (
    <>
      <h3>Your Favorites</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer inverted component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <button onClick={() => handleClickRemove(row.id)}>
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default Favorites;
