import React, { useEffect, useState } from 'react'
import { generateTilesArray } from '.';

export const Game = () => {
  const [ tilesArray, setTilesArray ] = useState([]);
  const [ unflipTimeoutId, setunflipTimeoutId ] = useState(-1);

  useEffect(()=>{
    setTilesArray(generateTilesArray());
  },[setTilesArray]);

  useEffect(() => {
    const pairs = tilesArray.filter(( { visible, matched } ) => {
      return visible && !matched;
    });
    if( pairs.length === 2 ){
      const [ tile1, tile2 ] = pairs;
      if( tile1.id === tile2.id ) {
        tile1.matched = tile2.matched = true;
        setTilesArray(tilesArray.slice());
      } else {
        const timeoutId = setTimeout(() => {
          tile1.visible = tile2.visible = false;
          setTilesArray(tilesArray.slice());
        }, 5 * 1000);
        setunflipTimeoutId(timeoutId);
      }
    }
  },[tilesArray, setTilesArray]);

  if( tilesArray.length < 1 ){
    return 'Loding';
  }

  const onClick = (tileIndex) => {
    const pairs = tilesArray.filter(( { visible, matched } ) => {
      return visible && !matched;
    });

    if( pairs.length >= 2 ) {
      pairs.forEach((pair) => {
        pair.visible = false;
      });
      if( unflipTimeoutId > 0 ) {
        clearTimeout(unflipTimeoutId);
        setunflipTimeoutId(-1);
      }    
    }

    const tile = tilesArray[tileIndex];
    //tile.visible = true;
    tilesArray[tileIndex] = {
      ...tile,
      visible: true
    };

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
