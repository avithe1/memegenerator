import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import { MemeSide, TextDirection, MemeData } from "../types/common.types";
import { faEdit as editIcon, faArrowUp, faArrowDown, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MemeSide.scss'

interface Props {
    side: MemeSide
    handleImgText: (val: string, side: MemeSide) => void,
    handleDirection: (val: TextDirection, side: MemeSide) => void
    handleImgURL: (val: string, side: MemeSide) => void
}

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

const MemeSideComponent: React.FC<Props> = ({ side, handleDirection, handleImgText, handleImgURL }) => {

    const [edit, setEdit] = useState(false)
    const ctx = useContext(CreateMemeContext);


    const imgTxt = side === MemeSide.LEFT ? ctx.imgTxt.txtleft.length ? ctx.imgTxt.txtleft : defaultMemeData.imgTxt.txtleft
        : ctx.imgTxt.txtright.length ? ctx.imgTxt.txtright : defaultMemeData.imgTxt.txtright

    const textDirectionContext = side === MemeSide.LEFT ? ctx.txtDirection.txtdirectionleft : ctx.txtDirection.txtdirectionright
    const imgTxtContext = side === MemeSide.LEFT ? ctx.imgTxt.txtleft : ctx.imgTxt.txtright

    const textDirectionDefault = side === MemeSide.LEFT ? defaultMemeData.txtDirection.txtdirectionleft : defaultMemeData.txtDirection.txtdirectionright
    const imgTxtDefault = side === MemeSide.LEFT ? defaultMemeData.imgTxt.txtleft : defaultMemeData.imgTxt.txtright

    const imgUrl = side === MemeSide.LEFT ?
        ctx.imgUrl.imgurlleft.length ? ctx.imgUrl.imgurlleft : defaultMemeData.imgUrl.imgurlleft
        : ctx.imgUrl.imgurlright.length ? ctx.imgUrl.imgurlright : defaultMemeData.imgUrl.imgurlright

    const imgAlt = side === MemeSide.LEFT ? "Meme picture LEFT" : "Meme picture RIGHT"
    const imgPlaceHolder = side === MemeSide.LEFT ? "Enter image URL for LEFT side" : "Enter image URL for RIGHT side"


    const [tempImgUrlLeft, setTmpImgUrlLeft] = useState(ctx.imgUrl.imgurlleft.length ? ctx.imgUrl.imgurlleft : "")
    const [tempImgUrlRight, setTmpImgUrlRight] = useState(ctx.imgUrl.imgurlright.length ? ctx.imgUrl.imgurlright : "")

    const handleEditToggle = () => {
        if (!edit) {
            setEdit(true)
        } else {
            if (side === MemeSide.LEFT) {
                if (tempImgUrlLeft !== imgUrl) {
                    handleImgURL(tempImgUrlLeft, MemeSide.LEFT)
                }
            } else {
                if (tempImgUrlRight !== imgUrl) {
                    handleImgURL(tempImgUrlRight, MemeSide.RIGHT)
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
            handleImgText(e.target.value, side)
        }
    }

    const imgError = () => {
        let placeHolderURL = "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png"
        window.alert("Image could not be loaded, reverting to default.")
        handleImgURL(placeHolderURL, side)
        if (side === MemeSide.LEFT) {
            setTmpImgUrlLeft(defaultMemeData.imgUrl.imgurlleft)
        } else {
            setTmpImgUrlRight(defaultMemeData.imgUrl.imgurlright)
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
                                        <button type="button" className="arrow_button" onClick={() => handleDirection(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => handleDirection(TextDirection.UP, side)}>
                                            <FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" />
                                        </button>
                                    : textDirectionContext === TextDirection.UP ?
                                        <button type="button" className="arrow_button" onClick={() => handleDirection(TextDirection.DOWN, side)}>
                                            <FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" />
                                        </button>
                                        : <button type="button" className="arrow_button" onClick={() => handleDirection(TextDirection.UP, side)}>
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

export default MemeSideComponent;