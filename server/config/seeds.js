const db = require("./connection");
const User = require("../models/userModel");

db.once("open", async () => {
  await User.deleteMany();

  await User.create([
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin",
      isAdmin: true,
    },
    {
      name: "Bob",
      email: "bob@gmail.com",
      password: "password",
      isAdmin: false,
    },
    {
      name: "John",
      email: "john@gmail.com",
      password: "password",
      isAdmin: false,
    },
    {
      name: "David",
      email: "david@gmail.com",
      password: "password",
      isAdmin: false,
    },
  ]);

  console.log("users seeded");

  process.exit();
});
