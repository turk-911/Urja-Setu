'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, ChevronRight, Award, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const items = [
  { name: 'Premium Store', icon: Zap },
  { name: 'Exclusive Products', icon: Award },
]

export default function RedeemStoreDevileryBoy() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="overflow p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg justify-between
     items-center w-full bg-red-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Redeem Store</h3>
        <div className="flex items-center space-x-1 rounded-full bg-blue-50 px-2 py-1 text-green-600">
          <Coins size={16} />
          <span className="font-medium">1,500</span>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex items-center space-x-3 rounded-md p-2 w-full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="rounded-full bg-green-100 p-2 text-green-500 ">
              <item.icon size={18} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Button className="group w-full" variant="default">
        <span className="mr-2">Visit Redeem Store</span>
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.div>
  )
}
