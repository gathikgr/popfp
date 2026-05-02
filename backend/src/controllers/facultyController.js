import Visit from '../models/Visit.js';
import { computeEarnings } from '../utils/salary.js';

export const markVisit = async (req, res) => {
  const visit = await Visit.create({ faculty: req.user.id, date: req.body.date || new Date() });
  res.status(201).json(visit);
};

export const myVisits = async (req, res) => {
  const visits = await Visit.find({ faculty: req.user.id }).sort({ createdAt: -1 });
  const approved = visits.filter(v => v.status === 'approved');
  const grouped = approved.reduce((acc, v) => {
    const d = new Date(v.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const earnings = Object.values(grouped).reduce((sum, c) => sum + computeEarnings(c), 0);
  res.json({ visits, totalVisits: approved.length, earnings });
};
