import { GameDifficulty } from '@/components/game';
import React from 'react'

export const GameLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <div>
        <header className='text-center mt-32 mb-6'>
          <h1 className='text-7xl font-bold mb-5'>Memory tiles</h1>
          <p>
            Click on tow tiles and find the matching images.
          </p>
        </header>
        <main>{ children }</main>
      </div>
      <footer className='text-center pb-12 container mx-auto px-4'>
        <GameDifficulty></GameDifficulty>
      </footer>
    </div>
  );
}
