import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useBankData } from '../../context/BankDataContext'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function BankingTab() {
  const { accounts, balanceHistory } = useBankData()
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          variants={item}
          className="col-span-full sm:col-span-2 lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total balance</p>
          <motion.p
            className="text-3xl font-bold text-slate-800 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </motion.p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Across all accounts</p>
        </motion.div>

        {accounts.map((acc, i) => (
          <motion.div
            key={acc.id}
            variants={item}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{acc.type}</p>
            <p className="font-semibold text-slate-800 dark:text-white mt-1">{acc.name}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{acc.number}</p>
            <motion.p
              className="text-xl font-bold text-teal-600 dark:text-teal-400 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * (i + 2) }}
            >
              ₹{acc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Balance over time</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-600" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-slate-500 dark:text-slate-400"
              />
              <YAxis
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-slate-500 dark:text-slate-400"
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tw-bg-opacity, 1)',
                  border: '1px solid rgb(203 213 225 / 0.3)',
                  borderRadius: '12px',
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
                labelStyle={{ color: 'inherit' }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#14b8a6"
                strokeWidth={2}
                fill="url(#balanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
