import React from 'react';
import './index.less';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { StoreContext, } from 'redux-react-hook';
import {makeStore} from './store'
import Canvas from './components/Canvas';

const store = makeStore();

const AppDesigner = ({height = 800}) => {
  const canvas = { type: 'canvas', id: 'canvas',};
  return (
    <DndProvider backend={HTML5Backend}>
      <StoreContext.Provider value={store}>
        <Canvas item={canvas} height={height}/>
      </StoreContext.Provider>
    </DndProvider>
  );
};

export default AppDesigner;
