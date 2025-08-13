import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'JODA Backend', version: '0.1.0' }));
app.get('/api/partners', (_req, res) => {
  res.json([{name:'Amazon',category:'Electronics',rate:'Up to 5%'}]);
});
app.post('/api/rewards/track', (req, res) => {
  const { userId, partner, clickId } = req.body || {};
  res.json({ received: true, userId, partner, clickId, status: 'pending' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('JODA backend running on port', PORT));
