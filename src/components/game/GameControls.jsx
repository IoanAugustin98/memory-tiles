import React from 'react'

export const GameControls = ({ newGame = () => {}, difficulty = 'easy' }) => {
    const buttonClasses = 'text-2xl inline-flex border border-light px-16 py-2 bg-gray-300 rounded-lg';
  return (
    <div className='flex justify-between'>
        <button 
            type='button'
            title='New Game'
            className={buttonClasses}
            onClick={() => {
                newGame(difficulty);
            }}
        >
            New Game
        </button>

        <div className={buttonClasses}>
            <span>Time 00:00</span>
        </div>
    </div>
  )
}
