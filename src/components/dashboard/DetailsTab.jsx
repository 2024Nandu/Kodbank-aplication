import { motion } from 'framer-motion'
import { useBankData } from '../../context/BankDataContext'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DetailsTab() {
  const { accounts } = useBankData()

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-xl font-semibold text-slate-800 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Banking details
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2"
      >
        {accounts.map((acc, i) => (
          <motion.div
            key={acc.id}
            variants={cardItem}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">{acc.type} Account</p>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-1">{acc.name}</h3>
              </div>
              <motion.div
                className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </motion.div>
            </div>

            <dl className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                <dt className="text-slate-500 dark:text-slate-400">Account number</dt>
                <dd className="font-mono font-medium text-slate-800 dark:text-white">{acc.number}</dd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                <dt className="text-slate-500 dark:text-slate-400">Current balance</dt>
                <dd className="font-semibold text-teal-600 dark:text-teal-400">
                  ₹{acc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </dd>
              </div>
              <div className="flex justify-between items-center py-2">
                <dt className="text-slate-500 dark:text-slate-400">Currency</dt>
                <dd className="font-medium text-slate-800 dark:text-white">{acc.currency}</dd>
              </div>
            </dl>

            <motion.p
              className="mt-4 text-xs text-slate-400 dark:text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              Account ID: {acc.id}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          This is dummy data for demonstration. In a real app, these details would come from your bank API.
        </p>
      </motion.div>
    </div>
  )
}
