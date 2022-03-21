import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import { MemeSide, TextDirection, MemeData } from "../types/common.types";
import { faEdit as editIcon, faArrowUp, faArrowDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MemePanel.scss'
import { imgPlaceholder, memeTitleLeftPlaceholder, memeTitleRightPlaceholder } from '../constants'

interface Props {
    side: MemeSide
}

const defaultMemeData: MemeData = {
    memeLeft: {
        memeTitle: memeTitleLeftPlaceholder,
        memeImageURL: imgPlaceholder,
        memeTitleDirection: TextDirection.UP,
    },

    memeRight: {
        memeTitle: memeTitleRightPlaceholder,
        memeImageURL: imgPlaceholder,
        memeTitleDirection: TextDirection.UP,
    }
}

const MemePanel: React.FC<Props> = ({ side }) => {

    const [edit, setEdit] = useState(false)
    const ctx = useContext(CreateMemeContext);
    const ctxState = ctx.state

    const imgTxt = side === MemeSide.LEFT ? ctxState.memeLeft.memeTitle.length ? ctxState.memeLeft.memeTitle : defaultMemeData.memeLeft.memeTitle
        : ctxState.memeRight.memeTitle.length ? ctxState.memeRight.memeTitle : defaultMemeData.memeRight.memeTitle

    const textDirectionContext = side === MemeSide.LEFT ? ctxState.memeLeft.memeTitleDirection : ctxState.memeRight.memeTitleDirection
    const imgTxtContext = side === MemeSide.LEFT ? ctxState.memeLeft.memeTitle : ctxState.memeRight.memeTitle

    const textDirectionDefault = side === MemeSide.LEFT ? defaultMemeData.memeLeft.memeTitleDirection : defaultMemeData.memeRight.memeTitleDirection
    const imgTxtDefault = side === MemeSide.LEFT ? defaultMemeData.memeLeft.memeTitle : defaultMemeData.memeRight.memeTitle

    const imgUrl = side === MemeSide.LEFT ?
        ctxState.memeLeft.memeImageURL.length ? ctxState.memeLeft.memeImageURL : defaultMemeData.memeLeft.memeImageURL
        : ctxState.memeRight.memeImageURL.length ? ctxState.memeRight.memeImageURL : defaultMemeData.memeRight.memeImageURL

    const imgAlt = side === MemeSide.LEFT ? "Meme picture LEFT" : "Meme picture RIGHT"
    const imgPlaceHolder = side === MemeSide.LEFT ? "Enter image URL for LEFT side" : "Enter image URL for RIGHT side"


    const [tempImgUrlLeft, setTmpImgUrlLeft] = useState(ctxState.memeLeft.memeImageURL.length ? ctxState.memeLeft.memeImageURL : "")
    const [tempImgUrlRight, setTmpImgUrlRight] = useState(ctxState.memeRight.memeImageURL.length ? ctxState.memeRight.memeImageURL : "")

    const handleEditToggle = () => {
        if (!edit) {
            setEdit(true)
        } else {
            if (side === MemeSide.LEFT) {
                if (tempImgUrlLeft !== imgUrl) {
                    ctx.handleMemeImgURL!(tempImgUrlLeft, MemeSide.LEFT)
                }
            } else {
                if (tempImgUrlRight !== imgUrl) {
                    ctx.handleMemeImgURL!(tempImgUrlRight, MemeSide.RIGHT)
                }
            }
            setEdit(false)
        }
    }

    const handleImageUrlEditorLeft = (e: React.ChangeEvent<HTMLInputElement>) => { //Image URL
        setTmpImgUrlLeft(e.target.value)
    }

    const handleImageUrlEditorRight = (e: React.ChangeEvent<HTMLInputElement>) => { //Image URL
        setTmpImgUrlRight(e.target.value)
    }

    const handleImageUrlEditor = side === MemeSide.LEFT ? handleImageUrlEditorLeft : handleImageUrlEditorRight

    const imgTxtHandler = (e: React.ChangeEvent<HTMLInputElement>, side: MemeSide) => {  //this has nothing to do with image URL , it is the top or bottom meme text handler
        if (e.target.value.length < 100) {
            ctx.handleMemeTitle!(e.target.value, side)
        }
    }

    const imgError = () => {
        window.alert("Image could not be loaded, reverting to default.")
        ctx.handleMemeImgURL!(imgPlaceholder, side)
        if (side === MemeSide.LEFT) {
            setTmpImgUrlLeft(defaultMemeData.memeLeft.memeImageURL)
        } else {
            setTmpImgUrlRight(defaultMemeData.memeRight.memeImageURL)
        }
    }

    return (
        <div className={side === MemeSide.LEFT ? "canvas_left" : "canvas_right"}>
            <div className={side === MemeSide.LEFT ? "config_left" : "config_right"} onClick={handleEditToggle}>
                <FontAwesomeIcon icon={edit ? faFloppyDisk : editIcon} size={'lg'} className="edit_icon" /> <span className="edittxt">{edit ? "Save" : "Edit"}</span>
            </div>
            {
                edit ?
                    <div
                        className={`canvas_txt ${textDirectionContext === TextDirection.NOTSELECTED ?
                            textDirectionDefault === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom' :
                            textDirectionContext === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'
                            }`}>
                        <div className="arrowContainer">
                            {
                                textDirectionContext === TextDirection.NOTSELECTED ?
                                    textDirectionDefault === TextDirection.UP ?
                                        <button type="button" className="arrow_button" onClick={() => ctx.handleMemeTitleDirection!(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => ctx.handleMemeTitleDirection!(TextDirection.UP, side)}>
                                            <FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" />
                                        </button>
                                    : textDirectionContext === TextDirection.UP ?
                                        <button type="button" className="arrow_button" onClick={() => ctx.handleMemeTitleDirection!(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => ctx.handleMemeTitleDirection!(TextDirection.UP, side)}>
                                            <FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" />
                                        </button>
                            }
                        </div>
                        <div className="inputContainer">
                            <input
                                value={imgTxtContext}
                                onChange={(e) => imgTxtHandler(e, side)}
                                className="text_input"
                                type="text"
                                placeholder={imgTxtDefault} />
                        </div>
                    </div>
                    :
                    <p
                        className={`canvas_txt ${textDirectionContext === TextDirection.NOTSELECTED ?
                            textDirectionDefault === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom' :
                            textDirectionContext === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'
                            }`}>
                        {imgTxt}
                    </p>
            }
            <img
                className="canvas_img"
                src={imgUrl}
                onError={imgError}
                alt={imgAlt} />
            {
                edit ?
                    <input className="url_input" type="text" placeholder={imgPlaceHolder} onChange={handleImageUrlEditor} value={side === MemeSide.LEFT ? tempImgUrlLeft : tempImgUrlRight} />
                    : null
            }

        </div>
    )
}

export default MemePanel;