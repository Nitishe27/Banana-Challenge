const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const UserModel = require('./models/User');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true
}));

app.use(session({
    secret: "Secret", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,  
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  
    }
}));

mongoose.connect("mongodb://127.0.0.1:27017/User");

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await UserModel.findOne({ name: name });
        if (user) {
            if (user.password === password) {
                
                req.session.username = name;
                console.log("Session after Login: ", req.session);
                return res.status(200).json("Success");
            } else {
                return res.status(401).json("Incorrect password");
            }
        } else {
            return res.status(404).json("No record found");
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post('/Signup', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: "Error creating user", error: err.message }));
});

app.get('/api/username', (req, res) => {
    console.log("Session in /api/username:", req.session); 
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json("Unauthorized: No session found");
    }
});


app.get('/api/score', (req, res) => {
    if (req.session.username) {
        
        UserModel.findOne({ name: req.session.username })
            .then(user => {
                if (user) {
                    res.json({ score: user.score });
                } else {
                    res.status(404).json("User not found");
                }
            })
            .catch(err => res.status(500).json({ message: "Error fetching score", error: err.message }));
    } else {
        res.status(401).json("Unauthorized: No session found");
    }
});


app.post("/api/score", async (req, res) => {
    const { score } = req.body;  
    const username = req.session.username;  
  
   
    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }
  
    try {
        
        const updatedUser = await UserModel.findOneAndUpdate(
            { name: username },  
            { score: score },  
            { new: true }  
        );

        if (updatedUser) {
            res.json(updatedUser);  
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error updating score:", err);
        res.status(500).json({ message: "Error updating score" });
    }
});


app.get('/api/quote', async (req, res) => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random'); 
      const quoteData = response.data[0]; 
      res.json({ quote: quoteData.q, author: quoteData.a });
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  app.get('/api/leaderboard', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ score: -1 }); 
        const leaderboard = users.map(user => ({
            username: user.name,
            score: user.score
        }));
        res.json(leaderboard);
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json("Error fetching leaderboard");
    }
});

app.post("/api/send-email", async (req, res) => {
    const username = req.session.username;
    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    try {
        const user = await UserModel.findOne({ name: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userEmail = user.email;
        const score = user.score;

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: 'nitishemanav@gmail.com',  
                pass: 'fcxz fbcf lrcd piwu',  
            }
        });

        
        const mailOptions = {
            from: 'nitishemanav@gmail.com', 
            to: userEmail,
            subject: 'Your Game Score Confirmation',
            text: `Hello ${username},\n\nYour score in the game is: ${score} points.\n\nBest regards,\nYour Game Team`
        };

        
        await transporter.sendMail(mailOptions);

        
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
});


 
app.get('/api/banana', async (req, res) => {
    try {
        const response = await axios.get("http://marcconrad.com/uob/banana/api.php");
        console.log("API Response:", response.data);  
        res.json(response.data); 
    } catch (error) {
        console.error("Error fetching from API:", error);
        res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
