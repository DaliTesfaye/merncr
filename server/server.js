//Create Server
const express = require("express");
const app = express();
const _PORT = "3001";

const cors = require("cors");
app.use(cors());
app.use(express.json());

const bcrypt = require("bcrypt");

//Connect mongoDB to server
const username = "drididali93",
  password = "Nc9eIQTkCeoJajb7",
  dataBase = "mernlogin";
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.ty6u3.mongodb.net/${dataBase}?retryWrites=true&w=majority&appName=Cluster0`
);

//Import User Model
const UserModel = require("./models/Users");

//get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

//Create User
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.json(req.body);
});

//Import Admin Model
const AdminModel = require("./models/Admins");

app.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: "admin already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = new AdminModel({
      username: username,
      password: hashedPassword,
    });
    await newAdmin.save();

    return res.status(201).json({ message: "Admin Created Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/login" , async (req , res) => {
  const {username , password} = req.body ;

  const admin = await AdminModel.findOne({username});
  !admin && res.json({message : "Admin doesnt exist"});

  const isPasswordValid = await bcrypt.compare(password , admin.password);
  !isPasswordValid && res.json({message : "Username or password are incorrect"});

})

app.listen(_PORT, () => {
  console.log("Server Works well!!");
});
