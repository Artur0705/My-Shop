const { connect, connection } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shoeson", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log(error.reason));

module.exports = connection;
