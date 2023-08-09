const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up Sequelize connection to PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', 'Akul', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Routes for registering and logging in users
app.post('/register', async (req, res) => {
  const { rusername, rpassword } = req.body;
  try {
    const user = await User.create({ rusername, rpassword });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.json({ message: 'Login successful.' });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
