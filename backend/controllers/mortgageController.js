import nodemailer from "nodemailer";

export const calculateMortgage = (req, res) => {
  const { price, down, years, rate, email } = req.body;
  const loan = price - down;
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const monthly = loan * monthlyRate * factor / (factor - 1);
  const total = monthly * months;
  const income = monthly * 2.5;

  sendEmail(email, {
    loan: Math.round(loan),
    monthly: Math.round(monthly),
    total: Math.round(total),
    income: Math.round(income),
  });

  res.json({
    loan: Math.round(loan),
    monthly: Math.round(monthly),
    total: Math.round(total),
    income: Math.round(income),
  });
};

function sendEmail(to, result) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: "Результаты расчета ипотеки",
    text: `Сумма кредита: ${result.loan}₽
Ежемесячный платеж: ${result.monthly}₽
Общая сумма выплат: ${result.total}₽
Необходимый доход: ${result.income}₽`,
  };

  transporter.sendMail(mailOptions);
}