import { createContext } from "react";
import { MemeData, TextDirection, ContextValue } from '../types/common.types'

const init: MemeData = {
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

const value: ContextValue = {
    state: init
}

const CreateMemeContext = createContext<ContextValue>(value)

export default CreateMemeContext;