const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongoose.connect("mongodb+srv://kartikmehra103_db_user:dVjmGUz8Pr0cGo5X@cluster0.mwf9zne.mongodb.net/?appName=Cluster0");");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const Expense = mongoose.model("Expense", {
  user: String,
  amount: Number,
  note: String,
  date: String,
});

app.get("/setup-users", async (req, res) => {
  await User.deleteMany({});
  await User.insertMany([
    { name: "Kartik", email: "kartik@naxtwave.com", password: "kartik@123" },
    { name: "Abhinav", email: "abhinav@naxtwave.com", password: "abhinav@123" },
    { name: "Kurum", email: "kurum@naxtwave.com", password: "kurum@123" },
    { name: "Ankit", email: "ankit@naxtwave.com", password: "ankit@123" },
  ]);
  res.send("Users Created");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.json(user);
  else res.send("Invalid");
});

app.post("/add", async (req, res) => {
  const exp = new Expense(req.body);
  await exp.save();
  res.send("Added");
});

app.get("/all", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

app.delete("/delete/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Backend running"));
