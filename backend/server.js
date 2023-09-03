const PORT = 8080;

const express = require('express');
const app = express();



const tripRoutes = require("./routes/trips-api");
app.use("/api/trips", tripRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

