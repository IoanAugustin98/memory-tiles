import { generateTilesArray } from '@/components/game';
import { createContext, useEffect, useReducer } from 'react'

let timerId = -1;
let timeLeftIntervalId = -1;
const time = 1000 * 60 * 2;
const second = 1000 * 1;

const initialState = {
  tilesArray:       [],
  unflipTimeoutId:  -1,
  playing:          true,
  gameWon:          false,
  difficulty:       'easy',
  timeLeft:         time
}

const reducer = (state, {type, payload}) => {
  switch(type) {
    case 'game:new':
      return {
        ...state,
        tilesArray: generateTilesArray(state.difficulty),
        playing: true,
        gameWon: false,
        timeLeft: time
      }

    case 'game:won':
      return {
        ...state,
        playing: false,
        gameWon: true
      }

    case 'game:lost':
      clearInterval(timeLeftIntervalId);
      timeLeftIntervalId = -1;
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
        if( timerId > 0 ){
            clearTimeout(timerId);
            timerId = -1;
        }
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
        if( timerId > 0 ){
          clearTimeout(timerId);
          timerId = -1;
        }
        return {
          ...state,
          tilesArray: newTiles,
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
      };

    case 'game:setDifficulty':
      const newDifficulty = payload;
      return {
        ...state,
        difficulty: newDifficulty,
        tilesArray: generateTilesArray(newDifficulty),
        timeLeft: time
      };

    case 'game:setTimeLeft': 
      const timeLeft = state.timeLeft - second;
      const otherState = {
        ...state,
        timeLeft
      };
      if( timeLeft <= 0 ) {
        otherState.playing = false;
        otherState.gameWon = false;
      }
      return otherState;

    default:
      return state;
  }
}

export const gameContext = createContext();

export const GameProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { tilesArray, playing } = state;

  useEffect(()=>{
    const visibleTiles = tilesArray.filter(( { visible, matched } ) => {
      return visible && !matched;
    });
    if( visibleTiles.length === 2 ) {
      const[visibleTile1, visibleTile2 ] = visibleTiles;
      if( visibleTile1.id !== visibleTile2.id ){
        timerId = setTimeout(()=>{
          const newTiles = tilesArray.slice();
          visibleTile1.visible = false;
          visibleTile2.visible = false;
          dispatch({
            type: 'game:setTilesArray',
            payload: newTiles
          });
        }, 1000 * 1 );
      }
    }
  }, [tilesArray, dispatch]);

  useEffect(() => {
    if( playing === true ){
      if( timeLeftIntervalId > 0 ){
        clearInterval(timeLeftIntervalId);
        timeLeftIntervalId = -1;
      }
      timeLeftIntervalId = setInterval(()=>{
        dispatch({
          type:"game:setTimeLeft"
        });
      }, second);
      return () => {
        clearInterval(timeLeftIntervalId);
      }
    } else {
      clearInterval(timeLeftIntervalId);
      timeLeftIntervalId = -1;
    }
  }, [playing]);

  return (
    <gameContext.Provider value={{state, dispatch}}>
      { children }
    </gameContext.Provider>
  );
};