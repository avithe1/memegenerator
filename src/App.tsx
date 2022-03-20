import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { MenuOptions } from './types/common.types';
import CreateMemeContext from './context/CreateContext';
import CreateMeme from './components/CreateMeme';
import BrowseMeme from './components/BrowseMeme';
import { MemeData, TextDirection } from './types/common.types'

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
    txtdirectionleft: TextDirection.NOTSELECTED,
    txtdirectionright: TextDirection.NOTSELECTED
  },
}

function App() {
  const [appmode, setAppmode] = useState<MenuOptions>(MenuOptions.BROWSE);

  const [state, setState] = useState(initCreateContext)


  const menuSelect = (option: MenuOptions) => {
    setAppmode(option)
  }

  const handleLeftImgText = (val: string) => {
    const newState = { ...state }
    newState.imgTxt.txtleft = val;
    setState(newState)
  }

  const handleLeftDirection = (val: TextDirection) => {
    const newState = { ...state }
    newState.txtDirection.txtdirectionleft = val;
    setState(newState)
  }

  return (
    <>
      <Header appmode={appmode} menuSelect={menuSelect} />
      {
        appmode === MenuOptions.CREATE ?
          <CreateMemeContext.Provider value={state}>
            <CreateMeme handleLeftImgText={handleLeftImgText} handleLeftDirection={handleLeftDirection}/>
          </CreateMemeContext.Provider>
          : <BrowseMeme />
      }
    </>
  );
}

export default App;
