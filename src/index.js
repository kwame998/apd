import React, { useMemo, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { StoreContext } from 'redux-react-hook';
import {makeStore} from './store'
import Canvas from './components/Canvas';
import locale from './locales/index';
import { LangContext } from './utils/context';

const store = makeStore();

const AppDesigner = ({height = 800,lang = "zh",data,onChange = () => {}}) => {
  const i18n = useMemo(() => locale[lang.toLowerCase()], [lang]);
  useEffect(() => {
    if(data)
      store.dispatch({ type: 'setValue', payload: {widgets:data} });
    return store.subscribe(() => onChange(store.getState().widgets))
  },[]);
  return (
    <DndProvider backend={HTML5Backend}>
      <StoreContext.Provider value={store}>
        <LangContext.Provider value={{i18n,lang}}>
          <Canvas height={height} />
        </LangContext.Provider>
      </StoreContext.Provider>
    </DndProvider>
  );
};

export default AppDesigner;
