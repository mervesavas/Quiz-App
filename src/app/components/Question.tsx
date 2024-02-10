'use client'
import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import AnswerSheet from './AnswerSheet'
import FinishModal from './FinishModal'
import { QuestionsProps, AnswerSheetType } from './types'

const Questions: React.FC<QuestionsProps> = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [canSelect, setCanSelect] = useState<boolean>(false)
  const [answersheet, setAnswersheet] = useState<AnswerSheetType>({})
  const [showResults, setShowResults] = useState<boolean>(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!showResults) {
        event.preventDefault()
        event.returnValue = 'Are you sure you want to leave?'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [showResults])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSelect(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [currentQuestionIndex])

  const nextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCanSelect(false)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleSelectOption = (option: string) => {
    if (canSelect) {
      const currentAnswer = answersheet[currentQuestionIndex]
      const updatedAnswer = currentAnswer === option ? undefined : option
      setAnswersheet({
        ...answersheet,
        [currentQuestionIndex]: updatedAnswer,
      })
    }
  }

  const currentData = data[currentQuestionIndex]
  const options = currentData.body.split('\n').slice(0, 4)
  const selectedOption = answersheet[currentQuestionIndex]

  if (showResults) {
    return <AnswerSheet answers={answersheet} data={data} />
  }

  const handleFinishClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleConfirmFinish = () => {
    setShowModal(false)
    setShowResults(true)
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen">
  <div className="mb-4">
    <Timer key={currentQuestionIndex} initialCount={30} onTimeout={nextQuestion} />
  </div>
  <div className="w-full max-w-xl px-4">
    <div className="bg-white border p-4 rounded-lg shadow-lg min-h-[200px]">
      <div className="mb-4">
        <div className="text-lg font-semibold">{currentData.id}. {currentData.title}</div>
      </div>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            disabled={!canSelect}
            onClick={() => handleSelectOption(option)}
            className={`block w-full text-left p-3 my-2 text-gray-700 rounded-full transition duration-300 ease-in-out ${canSelect ? 'hover:bg-gray-100 cursor-pointer' : 'bg-gray-200 cursor-not-allowed'} ${selectedOption === option ? 'bg-gray-300' : ''}`}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      {!canSelect && <div className="text-sm text-red-500">Please wait 10 seconds before making a selection.</div>}
    </div>
    <div className="flex justify-between mt-4 space-x-2 w-full">
      <button onClick={handleFinishClick} className="w-1/4 px-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition ease-in-out duration-150">
        Finish
      </button>
      <button
        onClick={nextQuestion}
        className="w-1/4 px-2 py-2 bg-black text-white rounded hover:bg-gray-800 transition ease-in-out duration-150"
      >
        Next
      </button>
    </div>
  </div>
  <FinishModal isOpen={showModal} onClose={handleCloseModal} onConfirm={handleConfirmFinish} />
</div>
  )
}

export default Questions
