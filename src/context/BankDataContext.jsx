import { createContext, useContext, useMemo } from 'react'

const BankDataContext = createContext()

const DUMMY_ACCOUNTS = [
  { id: '1', name: 'Primary Savings', number: '****4521', balance: 28450.75, currency: 'INR', type: 'savings' },
  { id: '2', name: 'Current Account', number: '****7832', balance: 125000.0, currency: 'INR', type: 'current' },
]

const DUMMY_TRANSACTIONS = [
  { id: 't1', date: '2025-02-20', description: 'Salary Credit', amount: 45000, type: 'credit', category: 'income' },
  { id: 't2', date: '2025-02-19', description: 'Electricity Bill', amount: -2500, type: 'debit', category: 'utilities' },
  { id: 't3', date: '2025-02-18', description: 'Netflix', amount: -649, type: 'debit', category: 'entertainment' },
  { id: 't4', date: '2025-02-17', description: 'Grocery Store', amount: -3200, type: 'debit', category: 'shopping' },
  { id: 't5', date: '2025-02-15', description: 'UPI Transfer In', amount: 5000, type: 'credit', category: 'transfer' },
  { id: 't6', date: '2025-02-14', description: 'Restaurant', amount: -1800, type: 'debit', category: 'food' },
  { id: 't7', date: '2025-02-12', description: 'Fuel', amount: -3500, type: 'debit', category: 'transport' },
  { id: 't8', date: '2025-02-10', description: 'Interest Credit', amount: 320, type: 'credit', category: 'income' },
]

const DUMMY_EXPENDITURE_BY_CATEGORY = [
  { name: 'Shopping', value: 8200, color: '#0d9488' },
  { name: 'Food', value: 5400, color: '#14b8a6' },
  { name: 'Transport', value: 3500, color: '#2dd4bf' },
  { name: 'Utilities', value: 2500, color: '#5eead4' },
  { name: 'Entertainment', value: 1649, color: '#99f6e4' },
]

const DUMMY_BALANCE_HISTORY = [
  { month: 'Aug', balance: 18000 },
  { month: 'Sep', balance: 19500 },
  { month: 'Oct', balance: 21000 },
  { month: 'Nov', balance: 23500 },
  { month: 'Dec', balance: 25200 },
  { month: 'Jan', balance: 26800 },
  { month: 'Feb', balance: 28450 },
]

export function BankDataProvider({ children }) {
  const value = useMemo(
    () => ({
      accounts: DUMMY_ACCOUNTS,
      transactions: DUMMY_TRANSACTIONS,
      expenditureByCategory: DUMMY_EXPENDITURE_BY_CATEGORY,
      balanceHistory: DUMMY_BALANCE_HISTORY,
    }),
    []
  )

  return <BankDataContext.Provider value={value}>{children}</BankDataContext.Provider>
}

export function useBankData() {
  const ctx = useContext(BankDataContext)
  if (!ctx) throw new Error('useBankData must be used within BankDataProvider')
  return ctx
}
