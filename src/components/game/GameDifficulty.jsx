import React from 'react'

export const GameDifficulty = () => {
  return (
    <div className='w-2/3 mx-auto text-2xl flex justify-between gap-24'>
        <label>Diffilcuty:</label>
        <ul className='flex justify-between gap-24'>
            <li>
                <button title='Easy' type='button'>Easy</button>
            </li>
            <li>
                <button title='Medium' type='button'>Medium</button>
            </li>
            <li>
                <button title='Hard' type='button'>Hard</button>
            </li>
            <li>
                <button title='Very Hard' type='button'>Very Hard</button>
            </li>
        </ul>
    </div>
  )
}
