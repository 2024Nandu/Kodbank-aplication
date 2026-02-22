import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useBankData } from '../../context/BankDataContext'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export default function ExpenditureTab() {
  const { expenditureByCategory, transactions } = useBankData()
  const debits = transactions.filter((t) => t.type === 'debit')
  const totalSpent = Math.abs(debits.reduce((sum, t) => sum + t.amount, 0))
  const credits = transactions.filter((t) => t.type === 'credit')
  const totalIncome = credits.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        <motion.div
          variants={item}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">Total spent (this period)</p>
          <motion.p
            className="text-2xl font-bold text-red-600 dark:text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </motion.p>
        </motion.div>
        <motion.div
          variants={item}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">Total income (this period)</p>
          <motion.p
            className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            ₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Expenditure by category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenditureByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenditureByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Spent']}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgb(203 213 225 / 0.3)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recent transactions</h2>
        <ul className="space-y-2">
          {transactions.slice(0, 8).map((t, i) => (
            <motion.li
              key={t.id}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ x: 4 }}
            >
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{t.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.date} · {t.category}</p>
              </div>
              <span
                className={`font-semibold ${
                  t.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {t.type === 'credit' ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
