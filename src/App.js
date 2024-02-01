import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Navbar from "./navbar";
function App() {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="cards-container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ padding: "30px 12px 12px 12px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Broadcasting
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tabella contenente le info relative a dove sono stati tenuti gli
                ultimi broadcasting.
                <br />
                Se in un mese non è stato visto insieme la data relativa a quel
                mese non apparira'
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  goTo("broadcasting");
                }}
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                vai a Broadcasting
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ padding: "30px 12px 12px 12px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Comitive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tabella contenente le info relative a tutte le varie comitive,
                inclusi argomenti trattati e il conduttore
                <br />
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  goTo("comitive");
                }}
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                vai a Comitive
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ padding: "30px 12px 12px 12px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Proclamatori
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tabella contenente le info relative ai proclamatori, i loro
                contattie altre info relative alle ultime visite di
                incoraggiamento e a quando risale l'ultima volta che sono usciti
                con Ruben/Nicolas
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  goTo("contatti");
                }}
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                vai a Proclamatori
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <footer>
        <p>© 2024 - GESTIONALE SAVA 2 </p>
      </footer>
    </>
  );
}

export default App;
