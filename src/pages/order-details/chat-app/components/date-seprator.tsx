import { motion } from 'framer-motion'

interface DateSeparatorProps {
  date: string
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <motion.div
      className="flex justify-center my-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-1 rounded-full">
        {date}
      </div>
    </motion.div>
  )
}

