import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { TextDirection, MemeSide } from '../types/common.types'
import MemeSideComponent from "./MemeSide";


interface Props {
    handleImgText: (val: string, side: MemeSide) => void,
    handleDirection: (val: TextDirection, side: MemeSide) => void
}

const CreateMeme: React.FC<Props> = ({ handleImgText, handleDirection }) => {
    const ctx = useContext(CreateMemeContext)

    const imgTxtHandler = (e: React.ChangeEvent<HTMLInputElement>, side: MemeSide) => {
        handleImgText(e.target.value, side)
    }

    return (
        <div className="creatememe">
            <div className="canvas">
                <MemeSideComponent side={MemeSide.LEFT} handleDirection={handleDirection} handleImgText={handleImgText} />
                <MemeSideComponent side={MemeSide.RIGHT} handleDirection={handleDirection} handleImgText={handleImgText} />
            </div>
        </div>
    )
}

export default CreateMeme;