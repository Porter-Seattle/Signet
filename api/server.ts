/**
 * Minimal Express server for Railway deployment.
 * Serves the Vite build (dist/) and the API route.
 *
 * Run: node dist/server.js
 * Env: ANTHROPIC_API_KEY, PORT (Railway sets PORT automatically)
 */
import express from "express";
import path from "path";
import { companyIntelligenceHandler } from "./company-intelligence";

const app = express();
app.use(express.json());

// API routes
app.post("/api/company-intelligence", companyIntelligenceHandler);

// Serve Vite build in production
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Happy Alpha running on :${PORT}`));
