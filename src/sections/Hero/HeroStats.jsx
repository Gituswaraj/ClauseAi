import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Contracts Analyzed', value: '50K+' },
  { label: 'Time Saved', value: '90%' },
  { label: 'Accuracy Rate', value: '99.9%' },
  { label: 'Happy Lawyers', value: '2K+' },
]

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-gray-400 text-sm lg:text-base">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
