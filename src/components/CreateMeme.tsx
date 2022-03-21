import { useContext, useState } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { TextDirection, MemeSide, MemeData } from '../types/common.types'
import MemeSideComponent from "./MemeSide";
import { db } from '../firebase/firebase'
import { updateDoc, serverTimestamp } from "firebase/firestore";

interface Props {
    handleMemeTitle: (val: string, side: MemeSide) => void,
    handleMemeImgURL: (val: string, side: MemeSide) => void,
    handleMemeTitleDirection: (val: TextDirection, side: MemeSide) => void,
    gotoMeme: (id: string) => void
}

const CreateMeme: React.FC<Props> = ({ handleMemeTitle, handleMemeImgURL, handleMemeTitleDirection, gotoMeme }) => {
    const ctx = useContext(CreateMemeContext)

    const canSubmit = async () => {

        let err = ""

        if (!(ctx.memeLeft.memeTitle && ctx.memeLeft.memeTitle.length && ctx.memeLeft.memeTitle != "Edit to enter text for LEFT meme image" && ctx.memeLeft.memeTitle.trim().length > 0)) {
            err += "LEFT meme text is not set\n"
        }

        if (!(ctx.memeRight.memeTitle && ctx.memeRight.memeTitle.length && ctx.memeRight.memeTitle != "Edit to enter text for RIGHT meme image" && ctx.memeRight.memeTitle.trim().length > 0)) {
            err += "RIGHT meme text is not set\n"
        }

        if (!(ctx.memeLeft.memeImageURL && ctx.memeLeft.memeImageURL.trim().length > 0 && ctx.memeLeft.memeImageURL != "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png")) {
            err += "LEFT meme image is not set\n"
        }

        if (!(ctx.memeRight.memeImageURL && ctx.memeRight.memeImageURL.trim().length > 0 && ctx.memeRight.memeImageURL != "https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png")) {
            err += "RIGHT meme image is not set\n"
        }

        if (!(ctx.memeLeft.memeTitleDirection != TextDirection.NOTSELECTED && ctx.memeRight.memeTitleDirection != TextDirection.NOTSELECTED)) {
            err += "Meme text direction is not set\n"
        }

        if (err.length) {
            window.alert(err)
            return false
        } else {
            await saveMeme()
        }

        return true;

    }

    const saveMeme = async () => {
        const docRef = db.collection('memes');
        const data: MemeData = {
            memeLeft: {
                memeTitle: ctx.memeLeft.memeTitle,
                memeImageURL: ctx.memeLeft.memeImageURL,
                memeTitleDirection: ctx.memeLeft.memeTitleDirection
            },
            memeRight: {
                memeTitle: ctx.memeRight.memeTitle,
                memeImageURL: ctx.memeRight.memeImageURL,
                memeTitleDirection: ctx.memeRight.memeTitleDirection
            }
        }
        let res = await docRef.add(data);
        console.log("meme added with id:", res.id)

        const docRefUpdateTime = db.collection('memes').doc(res.id)

        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRefUpdateTime, {
            createdAt: serverTimestamp()
        });

        handleMemeTitle("", MemeSide.LEFT)
        handleMemeImgURL("", MemeSide.LEFT)
        handleMemeTitleDirection(TextDirection.UP, MemeSide.LEFT)

        handleMemeTitle("", MemeSide.RIGHT)
        handleMemeImgURL("", MemeSide.RIGHT)
        handleMemeTitleDirection(TextDirection.UP, MemeSide.RIGHT)

        gotoMeme(res.id)
    }

    return (
        <div className="main">
            <div className="creatememe">
                <div className="canvas">
                    <MemeSideComponent side={MemeSide.LEFT} handleMemeTitle={handleMemeTitle} handleMemeImgURL={handleMemeImgURL} handleMemeTitleDirection={handleMemeTitleDirection} />
                    <MemeSideComponent side={MemeSide.RIGHT} handleMemeTitle={handleMemeTitle} handleMemeImgURL={handleMemeImgURL} handleMemeTitleDirection={handleMemeTitleDirection} />
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