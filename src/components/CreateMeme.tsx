import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { MemeData, TextDirection } from '../types/common.types'
import { faSquarePen as editIcon, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    handleLeftImgText: (val: string) => void,
    handleLeftDirection: (val: TextDirection) => void
}

const CreateMeme: React.FC<Props> = ({ handleLeftImgText, handleLeftDirection }) => {
    const ctx = useContext(CreateMemeContext)
    const [editLeft, setEditLeft] = useState(false);

    const leftImgTxtHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleLeftImgText(e.target.value)
    }

    return (
        <div className="creatememe">
            <div className="canvas">

                <div className="canvas_left">
                    <div className="config_left" onClick={() => setEditLeft(prev => !prev)}>
                        <FontAwesomeIcon icon={editIcon} size={'lg'} className="gear_icon" /> <span className="edittxt">{editLeft ? "Done" : "Edit"}</span>
                    </div>
                    {
                        editLeft ?
                            <div
                                className={`canvas_txt ${ctx.txtDirection.txtdirectionleft === TextDirection.NOTSELECTED ?
                                    defaultMemeData.txtDirection.txtdirectionleft === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom' :
                                    ctx.txtDirection.txtdirectionleft === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'
                                    }`}>
                                <div className="arrowContainer">
                                    {
                                        ctx.txtDirection.txtdirectionleft === TextDirection.NOTSELECTED ?
                                            defaultMemeData.txtDirection.txtdirectionleft === TextDirection.UP ?
                                                <button type="button" className="arrow_button" onClick={() => handleLeftDirection(TextDirection.DOWN)}><FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" /></button> : <button type="button" className="arrow_button" onClick={() => handleLeftDirection(TextDirection.UP)}><FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" /></button>
                                            : ctx.txtDirection.txtdirectionleft === TextDirection.UP ?
                                                <button type="button" className="arrow_button" onClick={() => handleLeftDirection(TextDirection.DOWN)}><FontAwesomeIcon icon={faArrowDown} size={'2x'} className="arrow_icon" /></button> : <button type="button" className="arrow_button" onClick={() => handleLeftDirection(TextDirection.UP)}><FontAwesomeIcon icon={faArrowUp} size={'2x'} className="arrow_icon" /></button>
                                    }
                                </div>
                                <div className="inputContainer">
                                    <input
                                        value={ctx.imgTxt.txtleft}
                                        onChange={leftImgTxtHandler}
                                        className="text_input"
                                        type="text"
                                        placeholder={defaultMemeData.imgTxt.txtleft} />
                                </div>
                            </div>
                            :
                            <p
                                className={`canvas_txt ${ctx.txtDirection.txtdirectionleft === TextDirection.NOTSELECTED ?
                                    defaultMemeData.txtDirection.txtdirectionleft === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom' :
                                    ctx.txtDirection.txtdirectionleft === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'
                                    }`}>
                                {ctx.imgTxt.txtleft.length ? ctx.imgTxt.txtleft : defaultMemeData.imgTxt.txtleft}
                            </p>
                    }
                    <img
                        className="canvas_img"
                        src={ctx.imgUrl.imgurlleft.length ? ctx.imgUrl.imgurlleft : defaultMemeData.imgUrl.imgurlleft}
                        alt="Meme picture left" />
                    {
                        editLeft ?
                            <input className="url_input" type="text" placeholder="Enter image URL for left side" />
                            : null
                    }

                </div>

                <div className="canvas_right">
                    <div className="config_right">
                        <FontAwesomeIcon icon={editIcon} size={'lg'} className="gear_icon" /> <span className="edittxt">Edit</span>
                    </div>
                    <p
                        className={`canvas_txt ${ctx.txtDirection.txtdirectionright === TextDirection.NOTSELECTED ?
                            defaultMemeData.txtDirection.txtdirectionright === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom' :
                            ctx.txtDirection.txtdirectionright === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'
                            }`}>
                        {ctx.imgTxt.txtright.length ? ctx.imgTxt.txtright : defaultMemeData.imgTxt.txtright}
                    </p>
                    <img
                        className="canvas_img"
                        src={ctx.imgUrl.imgurlright.length ? ctx.imgUrl.imgurlright : defaultMemeData.imgUrl.imgurlright}
                        alt="Meme picture right" />
                </div>
            </div>
        </div>
    )
}

export default CreateMeme;