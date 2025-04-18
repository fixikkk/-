import { useState } from "react";

export default function MortgageCalculator() {
  const [form, setForm] = useState({
    price: 2000000,
    down: 500000,
    years: 20,
    rate: 9.6,
    email: "user@example.com",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const loan = form.price - form.down;
    const monthlyRate = form.rate / 12 / 100;
    const months = form.years * 12;
    const factor = Math.pow(1 + monthlyRate, months);
    const monthly = loan * monthlyRate * factor / (factor - 1);
    const total = monthly * months;
    const requiredIncome = monthly * 2.5;

    setResult({
      loan: Math.round(loan),
      monthly: Math.round(monthly),
      total: Math.round(total),
      income: Math.round(requiredIncome),
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-blue-900">Калькулятор ипотеки</h2>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Стоимость недвижимости"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="down"
          value={form.down}
          onChange={handleChange}
          placeholder="Первоначальный взнос"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="years"
          value={form.years}
          onChange={handleChange}
          placeholder="Срок кредита (лет)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={form.rate + ' %'}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
        >
          Рассчитать
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-blue-900">Результаты расчета</h3>
          <div>💰 Сумма кредита: <strong>{result.loan.toLocaleString()} ₽</strong></div>
          <div>📆 Ежемесячный платеж: <strong>{result.monthly.toLocaleString()} ₽</strong></div>
          <div>💸 Общая сумма выплат: <strong>{result.total.toLocaleString()} ₽</strong></div>
          <div>🧾 Необходимый доход: <strong>{result.income.toLocaleString()} ₽</strong></div>
          <div className="pt-2 text-green-600">
            ✅ Результаты отправлены на <a className="underline" href={`mailto:${form.email}`}>{form.email}</a>
          </div>
        </div>
      )}
    </div>
  );
}