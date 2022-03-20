import { createContext } from "react";
import { MemeData, TextDirection } from '../types/common.types'

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
    }
}

const CreateMemeContext = createContext(initCreateContext)

export default CreateMemeContext;