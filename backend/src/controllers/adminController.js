import bcrypt from 'bcryptjs';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import User from '../models/User.js';
import Visit from '../models/Visit.js';
import { computeEarnings } from '../utils/salary.js';

export const addFaculty = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role: 'faculty' });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
};

export const listFaculty = async (_req, res) => res.json(await User.find({ role: 'faculty' }).select('-password'));

export const listVisits = async (_req, res) => res.json(await Visit.find().populate('faculty', 'name email').sort({ createdAt: -1 }));

export const setVisitStatus = async (req, res) => {
  const visit = await Visit.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('faculty', 'name');
  res.json(visit);
};

export const stats = async (_req, res) => {
  const totalFaculty = await User.countDocuments({ role: 'faculty' });
  const pendingRequests = await Visit.countDocuments({ status: 'pending' });
  res.json({ totalFaculty, pendingRequests });
};

export const payslip = async (req, res) => {
  const { facultyId, month } = req.body;
  const [y, m] = month.split('-').map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);
  const faculty = await User.findById(facultyId);
  const visits = await Visit.find({ faculty: facultyId, status: 'approved', date: { $gte: start, $lt: end } }).sort({ date: 1 });
  const earnings = computeEarnings(visits.length);

  const doc = new Document({ sections: [{ properties: {}, children: [
    new Paragraph({ children: [new TextRun({ text: 'Faculty Payslip', bold: true, size: 36 })] }),
    new Paragraph(`Faculty Name: ${faculty.name}`),
    new Paragraph(`Month: ${month}`),
    new Paragraph(`Visit Dates: ${visits.map(v => new Date(v.date).toLocaleDateString('en-IN')).join(', ') || '-'}`),
    new Paragraph(`Total Visits: ${visits.length}`),
    new Paragraph(`Total Earnings: ₹${earnings}`)
  ] }]});

  const buffer = await Packer.toBuffer(doc);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename=payslip-${faculty.name}-${month}.docx`);
  res.send(buffer);
};
