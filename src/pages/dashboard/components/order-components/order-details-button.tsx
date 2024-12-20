import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ShowOrderDetailsButton({id}:{id:string}) {
  
  const navigate = useNavigate();

  return (
    <motion.button
    className="bg-green-500 text-white py-2 px-4 text-sm font-semibold rounded-md"
    whileHover={{ scale: 1.05}}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    onClick={() => {
        // Add navigation logic here
        navigate(`/order-details/${id}`)
        // console.log('Navigating to order details page')
      }}
    >
      Show Details
    </motion.button>
  )
}

