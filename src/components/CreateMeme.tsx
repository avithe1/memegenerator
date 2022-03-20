import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { MemeData, TextDirection, MemeSide } from '../types/common.types'
import MemeSideComponent from "./MemeSide";

const defaultMemeData: MemeData = {
    imgTxt: {
        txtleft: "Edit to enter text for LEFT meme image",
        txtright: "Edit to enter text for RIGHT meme image"
    },
    imgUrl: {
        imgurlleft: "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png",
        imgurlright: "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png"
    },
    txtDirection: {
        txtdirectionleft: TextDirection.UP,
        txtdirectionright: TextDirection.UP
    }
}

interface Props {
    handleImgText: (val: string, side: MemeSide) => void,
    handleDirection: (val: TextDirection, side: MemeSide) => void
}

const CreateMeme: React.FC<Props> = ({ handleImgText, handleDirection }) => {
    const ctx = useContext(CreateMemeContext)
    const [editLeft, setEditLeft] = useState(false);
    const [editRight, setEditRight] = useState(false);

    const imgTxtHandler = (e: React.ChangeEvent<HTMLInputElement>, side: MemeSide) => {
        handleImgText(e.target.value, side)
    }

    return (
        <div className="creatememe">
            <div className="canvas">
                <MemeSideComponent side={MemeSide.LEFT} defaultMemeData={defaultMemeData} handleDirection={handleDirection} handleImgText={handleImgText} />
                <MemeSideComponent side={MemeSide.RIGHT} defaultMemeData={defaultMemeData} handleDirection={handleDirection} handleImgText={handleImgText} />
            </div>
        </div>
    )
}

export default CreateMeme;