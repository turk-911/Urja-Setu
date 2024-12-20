import { useState, useEffect } from 'react'

interface PickupTimeStatusProps {
  pickupTime: {
    start: string
    end: string
  }
}

export default function PickupTimeStatus({ pickupTime }: PickupTimeStatusProps) {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const end = new Date(pickupTime.end)
      const diff = end.getTime() - now.getTime()

      if (diff > 0) {
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setTimeRemaining(`${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining('Now!')
      }
    }

    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [pickupTime.end])

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold mb-2 text-sm">Pickup Time</h3>
        <p className="text-xs text-gray-600 mb-2">
          {pickupTime.start} - {pickupTime.end}
        </p>
        <p className="text-xs font-medium text-gray-800">{timeRemaining}</p>
      </div>
    </div>
  )
}

