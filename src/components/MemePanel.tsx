import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import { MemeSide, TextDirection, MemeData } from "../types/common.types";
import { faEdit as editIcon, faArrowUp, faArrowDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MemePanel.scss'

interface Props {
    side: MemeSide
    handleMemeTitle: (val: string, side: MemeSide) => void,
    handleMemeImgURL: (val: string, side: MemeSide) => void,
    handleMemeTitleDirection: (val: TextDirection, side: MemeSide) => void
}

const imgPlaceholder = "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png"

const defaultMemeData: MemeData = {
    memeLeft: {
        memeTitle: "Edit to enter text for LEFT meme image",
        memeImageURL: imgPlaceholder,
        memeTitleDirection: TextDirection.UP,
    },

    memeRight: {
        memeTitle: "Edit to enter text for RIGHT meme image",
        memeImageURL: imgPlaceholder,
        memeTitleDirection: TextDirection.UP,
    }
}

const MemePanel: React.FC<Props> = ({ side, handleMemeTitle, handleMemeImgURL, handleMemeTitleDirection }) => {

    const [edit, setEdit] = useState(false)
    const ctx = useContext(CreateMemeContext);


    const imgTxt = side === MemeSide.LEFT ? ctx.memeLeft.memeTitle.length ? ctx.memeLeft.memeTitle : defaultMemeData.memeLeft.memeTitle
        : ctx.memeRight.memeTitle.length ? ctx.memeRight.memeTitle : defaultMemeData.memeRight.memeTitle

    const textDirectionContext = side === MemeSide.LEFT ? ctx.memeLeft.memeTitleDirection : ctx.memeRight.memeTitleDirection
    const imgTxtContext = side === MemeSide.LEFT ? ctx.memeLeft.memeTitle : ctx.memeRight.memeTitle

    const textDirectionDefault = side === MemeSide.LEFT ? defaultMemeData.memeLeft.memeTitleDirection : defaultMemeData.memeRight.memeTitleDirection
    const imgTxtDefault = side === MemeSide.LEFT ? defaultMemeData.memeLeft.memeTitle : defaultMemeData.memeRight.memeTitle

    const imgUrl = side === MemeSide.LEFT ?
        ctx.memeLeft.memeImageURL.length ? ctx.memeLeft.memeImageURL : defaultMemeData.memeLeft.memeImageURL
        : ctx.memeRight.memeImageURL.length ? ctx.memeRight.memeImageURL : defaultMemeData.memeRight.memeImageURL

    const imgAlt = side === MemeSide.LEFT ? "Meme picture LEFT" : "Meme picture RIGHT"
    const imgPlaceHolder = side === MemeSide.LEFT ? "Enter image URL for LEFT side" : "Enter image URL for RIGHT side"


    const [tempImgUrlLeft, setTmpImgUrlLeft] = useState(ctx.memeLeft.memeImageURL.length ? ctx.memeLeft.memeImageURL : "")
    const [tempImgUrlRight, setTmpImgUrlRight] = useState(ctx.memeRight.memeImageURL.length ? ctx.memeRight.memeImageURL : "")

    const handleEditToggle = () => {
        if (!edit) {
            setEdit(true)
        } else {
            if (side === MemeSide.LEFT) {
                if (tempImgUrlLeft !== imgUrl) {
                    handleMemeImgURL(tempImgUrlLeft, MemeSide.LEFT)
                }
            } else {
                if (tempImgUrlRight !== imgUrl) {
                    handleMemeImgURL(tempImgUrlRight, MemeSide.RIGHT)
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
            handleMemeTitle(e.target.value, side)
        }
    }

    const imgError = () => {
        window.alert("Image could not be loaded, reverting to default.")
        handleMemeImgURL(imgPlaceholder, side)
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
                                        <button type="button" className="arrow_button" onClick={() => handleMemeTitleDirection(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => handleMemeTitleDirection(TextDirection.UP, side)}>
                                            <FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" />
                                        </button>
                                    : textDirectionContext === TextDirection.UP ?
                                        <button type="button" className="arrow_button" onClick={() => handleMemeTitleDirection(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => handleMemeTitleDirection(TextDirection.UP, side)}>
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