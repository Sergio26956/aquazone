// server/server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Conexión a MongoDB (ajusta tu URI en .env)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error(err));

// Modelo para guardar logs de chat (opcional)
const ChatLog = mongoose.model(
  "ChatLog",
  new mongoose.Schema({
    userMessage: String,
    botResponse: String,
    date: { type: Date, default: Date.now }
  })
);

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Endpoint para chat en tiempo real
app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userMessage,
      max_tokens: 50
    });
    const botResponse = response.data.choices[0].text.trim();
    // Guardar en MongoDB (opcional)
    const newLog = new ChatLog({ userMessage, botResponse });
    await newLog.save();
    res.json({ botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
