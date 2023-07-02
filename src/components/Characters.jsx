import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { findMany } from "../shared/api/characters";
import { create } from "../shared/api/favorites";
import "./Characters.css";

function Characters() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  async function fetchData(params) {
    setLoading(true);
    try {
      const response = await findMany(params);
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  }

  async function fetchIncreaseList(params) {
    try {
      const response = await findMany(params);
      setRows([...rows, ...response.data]);
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickFavorite = (character) => {
    create(character).then(() => {
      setSnackbar({
        open: true,
        message: "Character added to favorites",
      });
    });
  };

  const handleEnterDownInSearch = (event) => {
    if (event.key === "Enter") {
      fetchData({ name: search });
    }
  };

  const handleClickIncreaseList = () => {
    const newPage = page + 1;
    setPage(newPage);
    setSnackbar({ open: true, message: "Loading more..." });
    fetchIncreaseList({ name: search, offset: newPage });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false, message: "" });
  };

  return (
    <>
      <Grid container spacing={2} className="header">
        <Grid item xs={8}>
          <h3>Characters List</h3>
        </Grid>
        <Grid item xs={4} className="input-container">
          <div className="input-row">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnterDownInSearch}
            />
            <button onClick={() => fetchData({ name: search })}>Search</button>
          </div>
        </Grid>
      </Grid>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
                      <button onClick={() => handleClickFavorite(row)}>
                        Favorite
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="increment">
            <button onClick={handleClickIncreaseList}>+</button>
          </div>
        </>
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

export default Characters;
