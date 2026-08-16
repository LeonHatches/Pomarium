require("dotenv").config();
const express = require("express");
const cors = require("cors");
const plantaRoutes = require("./routes/plantaRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api", plantaRoutes);

app.get("/", (req, res) => {
  res.send("Pomarium backend activo 🌱");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Pomarium backend escuchando en http://localhost:${PORT}`);
});
