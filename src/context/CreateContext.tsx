import { createContext } from "react";
import { MemeData, TextDirection } from '../types/common.types'

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

const CreateMemeContext = createContext(initCreateContext)

export default CreateMemeContext;