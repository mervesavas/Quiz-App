import React from 'react'
import { FinishModalProps } from './types'

const FinishModal: React.FC<FinishModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Are you sure you want to finish the test?</h2>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="w-1/4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ease-in-out duration-150 flex-grow md:flex-grow-0">
            No
          </button>
          <button onClick={onConfirm} className="w-1/4 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition ease-in-out duration-150 flex-grow md:flex-grow-0">
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinishModal
