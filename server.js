const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 📂 File path (important for Render)
const filePath = path.join(__dirname, "users.json");

// 📥 Read users
function readUsers() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// 💾 Save users
function saveUsers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🌐 Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

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

// 🔥 PORT FIX FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
