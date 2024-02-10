import { useRouter } from 'next/navigation'
import React from 'react'
import { Props } from './types'

const AnswerSheet: React.FC<Props> = ({ answers, data }) => {
  const router = useRouter()

  const getAnswerLetter = (questionIndex: number, answer: string | undefined) => {
    if (typeof answer === 'undefined') {
      return "-"
    }
    const options = data[questionIndex].body.split('\n').slice(0, 4)
    const answerIndex = options.findIndex(option => option === answer)
    return answerIndex >= 0 ? String.fromCharCode(65 + answerIndex) : "-"
  }
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mt-10 flex flex-col items-center justify-center px-4 w-full">
        <div className="w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-4 text-center">Answer Sheet</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-400 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Question</th>
                  <th className="border px-4 py-2">Answer</th>
                </tr>
              </thead>
              <tbody>
                {data.map((question, index) => (
                  <tr key={question.id}>
                    <td className="border px-4 py-2 text-center">{question.id}</td>
                    <td className="border px-4 py-2 text-center">{getAnswerLetter(index, answers[index])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-1/6 px-2 py-2 bg-black text-white rounded hover:bg-gray-800 transition ease-in-out duration-150 mt-4" onClick={() => router.back()}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default AnswerSheet
