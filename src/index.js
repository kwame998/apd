import React,{Component} from 'react';
import './index.css';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { StoreContext, useDispatch } from 'redux-react-hook';
import {makeStore} from './store'
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

const store = makeStore();

const AppDesigner = ({height = 800}) => {
  const canvas = { type: 'canvas', id: 'canvas', height, x:0, y: 0, innerX: 16, innerY: 16 };
  return (
    <DndProvider backend={HTML5Backend}>
      <StoreContext.Provider value={store}>
        <Toolbar />
        <Canvas item={canvas}/>
      </StoreContext.Provider>
    </DndProvider>
  );
};

export default AppDesigner;