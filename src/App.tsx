import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { ModeType } from './types/common.types';

function App() {
  const [appmode, setAppmode] = useState<ModeType>(ModeType.BROWSE);

  const modeSelect = (modeType: ModeType) => {
    setAppmode(modeType)
  }

  return (
    <Header appmode={appmode} modeSelect={modeSelect} />
  );
}

export default App;
