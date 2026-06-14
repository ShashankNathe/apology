import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI!;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas & Models
const statusSchema = new mongoose.Schema({
  isLocked: { type: Boolean, default: false },
  readAt: { type: String, default: null },
});

const configSchema = new mongoose.Schema({
  customPin: { type: String, default: null },
});

const StatusModel = mongoose.model("ApologyStatus", statusSchema);
const ConfigModel = mongoose.model("ApologyConfig", configSchema);

async function getAppStatus() {
  let doc = await StatusModel.findOne();
  if (!doc) doc = await StatusModel.create({ isLocked: false, readAt: null });
  return doc;
}

async function saveAppStatus(data: { isLocked: boolean; readAt: string | null }) {
  const doc = await StatusModel.findOne();
  if (doc) {
    doc.isLocked = data.isLocked;
    doc.readAt = data.readAt ?? null;
    await doc.save();
  } else {
    await StatusModel.create(data);
  }
}

async function getPasscodeConfig() {
  let doc = await ConfigModel.findOne();
  if (!doc) doc = await ConfigModel.create({ customPin: null });
  return doc;
}

async function savePasscodeConfig(data: { customPin: string }) {
  const doc = await ConfigModel.findOne();
  if (doc) {
    doc.customPin = data.customPin;
    await doc.save();
  } else {
    await ConfigModel.create(data);
  }
}

// --- API ROUTES ---

// 1. Get current lock/read status
app.get("/api/status", async (req, res) => {
  try {
    const status = await getAppStatus();
    const config = await getPasscodeConfig();
    res.json({
      isLocked: status.isLocked,
      readAt: status.readAt,
      hasCustomPin: !!config.customPin,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

// 2. Set custom passcode
app.post("/api/admin/setup-pin", async (req, res) => {
  const { pin } = req.body;
  if (!pin || typeof pin !== "string" || pin.length < 4) {
    return res.status(400).json({ error: "PIN must be at least 4 digits" });
  }
  try {
    await savePasscodeConfig({ customPin: pin });
    res.json({ success: true, message: "Passcode PIN configured successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save PIN" });
  }
});

// 3. Reset status
app.post("/api/admin/reset", async (req, res) => {
  try {
    await saveAppStatus({ isLocked: false, readAt: null });
    res.json({ success: true, message: "Apology website reset to unlocked state" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset" });
  }
});

// 4. Verify password & lock
app.post("/api/verify-and-lock", async (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Passcode code is required" });
  }

  try {
    const cleanedCode = code.replace(/[^0-9]/g, "");
    const config = await getPasscodeConfig();

    // Exact match: check against DB custom pin first, then fall back to LOCK_PIN env var
    const expectedPin = (config.customPin ?? process.env.LOCK_PIN ?? "").replace(/[^0-9]/g, "");
    const isValid = cleanedCode === expectedPin;

    if (isValid) {
      await saveAppStatus({ isLocked: true, readAt: new Date().toISOString() });
      return res.json({
        success: true,
        message: "Correct passcode! The letter has been safely locked.",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Incorrect passcode. Please try again! (Hint: It is her birthdate)",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error during verification" });
  }
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
