import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { MenuOptions } from './types/common.types';
import CreateMemeContext from './context/CreateContext';
import CreateMeme from './components/CreateMeme';
import BrowseMeme from './components/BrowseMeme';
import { MemeData, TextDirection, MemeSide } from './types/common.types'

const initCreateContext: MemeData = {
  imgTxt: {
    txtleft: "",
    txtright: ""
  },
  imgUrl: {
    imgurlleft: "",
    imgurlright: ""
  },
  txtDirection: {
    txtdirectionleft: TextDirection.UP,
    txtdirectionright: TextDirection.UP
  },
}

function App() {
  const [appmode, setAppmode] = useState<MenuOptions>(MenuOptions.BROWSE);

  const [state, setState] = useState(initCreateContext)


  const menuSelect = (option: MenuOptions) => {
    setAppmode(option)
  }

  const handleImgText = (val: string, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.imgTxt.txtleft = val;
    } else {
      newState.imgTxt.txtright = val;
    }
    setState(newState)
  }

  const handleDirection = (val: TextDirection, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.txtDirection.txtdirectionleft = val;
    } else {
      newState.txtDirection.txtdirectionright = val;
    }
    setState(newState)
  }

  const handleImgURL = (val: string, side: MemeSide) => {
    const newState = { ...state }
    if (side === MemeSide.LEFT) {
      newState.imgUrl.imgurlleft = val;
    } else {
      newState.imgUrl.imgurlright = val;
    }
    setState(newState)
  }

  return (
    <>
      <Header appmode={appmode} menuSelect={menuSelect} />
      {
        appmode === MenuOptions.CREATE ?
          <CreateMemeContext.Provider value={state}>
            <CreateMeme handleImgText={handleImgText} handleDirection={handleDirection} handleImgURL={handleImgURL} />
          </CreateMemeContext.Provider>
          : <BrowseMeme id={null}/>
      }
    </>
  );
}

export default App;
