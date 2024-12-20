import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Smile } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface InputFieldProps {
  onSendMessage: (message: string) => void
}

export default function InputField({ onSendMessage }: InputFieldProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/30 border-t border-gray-200 p-4 w-full">
      <div className="flex items-center space-x-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-500 hover:text-gray-700"
        >
          <Smile size={24} />
        </motion.button>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" bg-green-500 text-white rounded-full p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Send size={24} />
        </motion.button>
      </div>
    </form>
  )
}

