'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const StartQuiz = () => {
  const router = useRouter()

  const handleStartClick = () => {
    router.push('/quiz')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm w-full rounded overflow-hidden shadow-lg mx-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/quiz.png"
            alt="Quiz Image"
            width={150}
            height={150}
            layout="intrinsic"
          />
        </div>
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">Ready to Start the Quiz?</div>
        </div>
        <div className="px-6 pb-6 text-center">
          <button
            className="w-1/3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition ease-in-out duration-150"
            onClick={handleStartClick}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartQuiz

