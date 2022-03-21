import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { MenuOptions } from './types/common.types';
import CreateMemeContext from './context/CreateContext';
import CreateMeme from './components/CreateMeme';
import BrowseMeme from './components/BrowseMeme';
import { MemeData, TextDirection, MemeSide, ContextValue } from './types/common.types'


const initCreateContext: MemeData = {
  memeLeft: {
    memeTitle: "",
    memeImageURL: "",
    memeTitleDirection: TextDirection.UP
  },
  memeRight: {
    memeTitle: "",
    memeImageURL: "",
    memeTitleDirection: TextDirection.UP
  }
}

function App() {
  const [memeid, setMemeId] = useState("")
  const [appmode, setAppmode] = useState<MenuOptions>(MenuOptions.BROWSE);
  const [state, setState] = useState(initCreateContext)

  const menuSelect = (option: MenuOptions) => {
    setMemeId("")
    setAppmode(option)
  }

  const gotoMeme = (id: string) => {
    setMemeId(id)
    setAppmode(MenuOptions.BROWSE)
  }

  const handleMemeTitle = (val: string, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.memeLeft.memeTitle = val
    } else {
      newState.memeRight.memeTitle = val
    }
    setState(newState)
  }

  const handleMemeImgURL = (val: string, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.memeLeft.memeImageURL = val
    } else {
      newState.memeRight.memeImageURL = val
    }
    setState(newState)
  }

  const handleMemeTitleDirection = (val: TextDirection, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.memeLeft.memeTitleDirection = val
    } else {
      newState.memeRight.memeTitleDirection = val
    }
    setState(newState)
  }

  const value: ContextValue = {
    state,
    handleMemeTitle,
    handleMemeImgURL,
    handleMemeTitleDirection,
    gotoMeme
  }

  return (
    <>
      <Header appmode={appmode} menuSelect={menuSelect} />
      {
        appmode === MenuOptions.CREATE ?
          <CreateMemeContext.Provider value={value}>
            <CreateMeme />
          </CreateMemeContext.Provider>
          :
          <BrowseMeme id={memeid.length ? memeid : null} />
      }
    </>
  );
}

export default App;
