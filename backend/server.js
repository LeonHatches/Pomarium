require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const plantaRoutes = require("./routes/plantaRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api", plantaRoutes);

// Servir archivos estáticos del frontend (React) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta comodín (catch-all) para que React Router maneje las URLs del frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Pomarium backend escuchando en http://localhost:${PORT}`);
});
