import React, { useEffect, useState } from 'react'
import { generateTilesArray } from '.';

export const Game = () => {
  const [ tilesArray, setTilesArray ] = useState([]);

  useEffect(()=>{
    setTilesArray(generateTilesArray());
  },[setTilesArray]);

  if( tilesArray.length < 1 ){
    return 'Loding';
  }

  const onClick = (tileIndex) => {
    const tile = tilesArray[tileIndex];
    tile.visible = true;
    setTilesArray(tilesArray.slice());
  }

  return <div className='inline-grid grid-cols-4 gap-4'>
    {
      tilesArray.map(( { id, matched, visible }, index )=>{
        return ( 
          <button 
            type='button' 
            title="Click here to uncover" 
            key={index} 
            className={`w-32 h-32 border border-primary rounded-md flex bg-gray-300 text-primary justify-center items-center text-4xl`}
            onClick={() => {
              onClick(index);
            }}
          >
            { visible === true ? <i className={`${id} drop-shadow-sm`}></i> : <></> }
          </button>
        );
      })
    }
  </div>;
}
