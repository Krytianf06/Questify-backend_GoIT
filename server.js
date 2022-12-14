const app = require('./app');
const mongoose = require('mongoose');
require("dotenv").config();

const PORT = process.env.PORT || 3002;
const uriDb = process.env.DB_SRV;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, async () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server not running", err.toString());
    process.exit(1);
  });
