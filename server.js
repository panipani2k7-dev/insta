const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 📂 Read users
function readUsers() {
  try {
    const data = fs.readFileSync("users.json");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 💾 Save users
function saveUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

// 🚀 API to store data
app.post("/save", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }

  const users = readUsers();

  users.push({
    email,
    password,
    time: new Date()
  });

  saveUsers(users);

  res.send("Saved successfully ✅");
});

// 🟢 Start server
app.listen(3000, () => {
  console.log("🔥 Server running on http://localhost:3000");
});