const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Init DB
function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ sinistres: [], acteurs: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// SINISTRES
app.get('/api/sinistres', (req, res) => {
  const db = loadDB();
  res.json(db.sinistres);
});

app.post('/api/sinistres', (req, res) => {
  const db = loadDB();
  const s = { id: 'S' + Date.now().toString(36).toUpperCase(), ...req.body, acteurs: [], timeline: [], relances: [], createdAt: new Date().toISOString().split('T')[0] };
  db.sinistres.unshift(s);
  saveDB(db);
  res.json(s);
});

app.put('/api/sinistres/:id', (req, res) => {
  const db = loadDB();
  const idx = db.sinistres.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.sinistres[idx] = { ...db.sinistres[idx], ...req.body };
  saveDB(db);
  res.json(db.sinistres[idx]);
});

app.delete('/api/sinistres/:id', (req, res) => {
  const db = loadDB();
  db.sinistres = db.sinistres.filter(x => x.id !== req.params.id);
  saveDB(db);
  res.json({ ok: true });
});

// ACTEURS dans sinistre
app.post('/api/sinistres/:id/acteurs', (req, res) => {
  const db = loadDB();
  const s = db.sinistres.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const a = { id: 'A' + Date.now().toString(36).toUpperCase(), ...req.body };
  s.acteurs = s.acteurs || [];
  s.acteurs.push(a);
  saveDB(db);
  res.json(a);
});

app.delete('/api/sinistres/:id/acteurs/:aid', (req, res) => {
  const db = loadDB();
  const s = db.sinistres.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  s.acteurs = (s.acteurs || []).filter(a => a.id !== req.params.aid);
  saveDB(db);
  res.json({ ok: true });
});

// TIMELINE
app.post('/api/sinistres/:id/timeline', (req, res) => {
  const db = loadDB();
  const s = db.sinistres.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const e = { id: 'E' + Date.now().toString(36).toUpperCase(), ...req.body };
  s.timeline = s.timeline || [];
  s.timeline.push(e);
  saveDB(db);
  res.json(e);
});

// RELANCES
app.post('/api/sinistres/:id/relances', (req, res) => {
  const db = loadDB();
  const s = db.sinistres.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const r = { id: 'R' + Date.now().toString(36).toUpperCase(), done: false, ...req.body };
  s.relances = s.relances || [];
  s.relances.push(r);
  saveDB(db);
  res.json(r);
});

app.patch('/api/sinistres/:id/relances/:rid', (req, res) => {
  const db = loadDB();
  const s = db.sinistres.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const r = (s.relances || []).find(x => x.id === req.params.rid);
  if (!r) return res.status(404).json({ error: 'Not found' });
  Object.assign(r, req.body);
  saveDB(db);
  res.json(r);
});

// ANNUAIRE GLOBAL
app.get('/api/acteurs', (req, res) => {
  const db = loadDB();
  res.json(db.acteurs || []);
});
app.post('/api/acteurs', (req, res) => {
  const db = loadDB();
  const a = { id: 'AG' + Date.now().toString(36).toUpperCase(), ...req.body };
  db.acteurs = db.acteurs || [];
  db.acteurs.push(a);
  saveDB(db);
  res.json(a);
});

// EXPORT
app.get('/api/export', (req, res) => {
  const db = loadDB();
  res.setHeader('Content-Disposition', 'attachment; filename="sinistres_export.json"');
  res.json(db);
});

app.listen(PORT, () => console.log(`✅ DDE App running on http://localhost:${PORT}`));
