import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { TextDirection, MemeSide } from '../types/common.types'
import MemeSideComponent from "./MemeSide";


interface Props {
    handleImgText: (val: string, side: MemeSide) => void,
    handleDirection: (val: TextDirection, side: MemeSide) => void
    handleImgURL: (val: string, side: MemeSide) => void
}

const CreateMeme: React.FC<Props> = ({ handleImgText, handleDirection, handleImgURL }) => {
    const ctx = useContext(CreateMemeContext)


    const canSubmit = () => {

        let err = ""

        if (!(ctx.imgTxt.txtleft && ctx.imgTxt.txtleft.length && ctx.imgTxt.txtleft != "Edit to enter text for LEFT meme image" && ctx.imgTxt.txtleft.trim().length > 0)) {
            err += "LEFT meme text is not set\n"
        }

        if (!(ctx.imgTxt.txtright && ctx.imgTxt.txtright.length && ctx.imgTxt.txtright != "Edit to enter text for RIGHT meme image" && ctx.imgTxt.txtright.trim().length > 0)) {
            err += "RIGHT meme text is not set\n"
        }

        if (!(ctx.imgUrl.imgurlleft && ctx.imgUrl.imgurlleft.trim().length > 0 && ctx.imgUrl.imgurlleft != "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png")) {
            err += "LEFT meme image is not set\n"
        }

        if (!(ctx.imgUrl.imgurlright && ctx.imgUrl.imgurlright.trim().length > 0 && ctx.imgUrl.imgurlright != "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png")) {
            err += "RIGHT meme image is not set\n"
        }

        if (!(ctx.txtDirection.txtdirectionleft != TextDirection.NOTSELECTED && ctx.txtDirection.txtdirectionright != TextDirection.NOTSELECTED)) {
            err += "Meme text direction is not set\n"
        }

        if (err.length) {
            window.alert(err)
            return false
        }

        return true;

    }


    return (
        <div className="main">
            <div className="creatememe">
                <div className="canvas">
                    <MemeSideComponent side={MemeSide.LEFT} handleDirection={handleDirection} handleImgText={handleImgText} handleImgURL={handleImgURL} />
                    <MemeSideComponent side={MemeSide.RIGHT} handleDirection={handleDirection} handleImgText={handleImgText} handleImgURL={handleImgURL} />
                </div>
            </div>
            <div className="btn_container">
                <button
                    className="submit_btn"
                    onClick={canSubmit}>
                    Save Meme
                </button>
            </div>
        </div>
    )
}

export default CreateMeme;