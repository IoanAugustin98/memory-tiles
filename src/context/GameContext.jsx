import { generateTilesArray } from '@/components/game';
import { createContext, useReducer } from 'react'

let timerId = -1;

const initialState = {
  tilesArray: [],
  unflipTimeoutId: -1,
  playing: true,
  gameWon: false,
  difficulty: 'easy'
}

const reducer = (state, {type, payload}) => {
    switch(type) {
      case 'game:new':
        return {
          ...state,
          tilesArray: generateTilesArray(),
          playing: true,
          gameWon: false
        }
      case 'game:won':
          return {
            ...state,
            playing: false,
            gameWon: true
          }
      case 'game:lost':
        return {
          ...state,
          playing: false,
          gameWon: false
        }
      case 'game:playTile':
        const visibleTiles = state.tilesArray.filter(( { visible, matched } ) => {
          return visible && !matched;
        });
  
        const newTiles = state.tilesArray.slice();
        const playedTile = newTiles[payload];
        newTiles[playedTile.index] = {
          ...playedTile,
          visible: true
        }
  
        if( visibleTiles.length === 2 ) {
          const [ visibleTile1, visibleTile2 ] = visibleTiles;
          if( visibleTile1.id === visibleTile2.id ) {
            newTiles[visibleTile1.index] = {
              ...visibleTile1,
              matched: true
            };
            newTiles[visibleTile2.index] = {
              ...visibleTile2,
              matched: true
            };
          } else {
            newTiles[visibleTile1.index] = {
              ...visibleTile1,
              visible: false
            };
            newTiles[visibleTile2.index] = {
              ...visibleTile2,
              visible: false
            };
          }
          return {
            ...state,
            tilesArray: newTiles
          };
        }
  
        const matchedTiles = newTiles.filter(({matched}) => {
          return matched === true;
        });
  
        if(matchedTiles.length === newTiles.length-2){
          return {
            ...state,
            playing: false,
            gameWon: true,
          };
        }
  
        return {
          ...state,
          tilesArray: newTiles
        };
  
      case 'game:setTilesArray':
        return {
          ...state,
         tilesArray: payload
        }
      case 'game:setUnflipTimeoutId':
        return {
          ...state,
          timeoutId: payload
        }
      default:
        return state;
    }
}

export const gameContext = createContext();

export const GameProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    return (
        <gameContext.Provider value={{state, dispatch}}>
            { children }
        </gameContext.Provider>
    );
};
