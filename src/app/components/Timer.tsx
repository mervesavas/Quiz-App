import React, { useEffect, useState } from 'react'
import { TimerProps } from './types'

const Timer: React.FC<TimerProps> = ({ initialCount, onTimeout }) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (count === 0) {
      onTimeout()
      return
    }

    const timerId = setTimeout(() => setCount(count - 1), 1000)

    return () => clearTimeout(timerId)
  }, [count, onTimeout])

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-black rounded-full shadow-xl" style={{ minWidth: '150px' }}>
        <div className={`px-5 py-2 md:px-6 md:py-3 rounded-full ${
            count <= 10 ? "bg-red-600 animate-pulse" : "bg-gradient-to-r from-gray-700 to-gray-900"
          }`}>
          <span className="flex items-center justify-center">
            <span className="text-lg md:text-xl font-mono font-bold text-white">{String(Math.floor(count / 60)).padStart(2, '0')}</span>
            <span className="text-lg md:text-xl font-mono font-bold text-gray-300">:</span>
            <span className="text-lg md:text-xl font-mono font-bold text-white">{String(count % 60).padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Timer
