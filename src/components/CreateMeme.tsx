import { useContext } from "react";
import CreateMemeContext from "../context/CreateContext";
import './CreateMeme.scss'
import { TextDirection, MemeSide, MemeData } from '../types/common.types'
import MemePanel from "./MemePanel";
import { db } from '../firebase/firebase'
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { imgPlaceholder, memeTitleLeftPlaceholder, memeTitleRightPlaceholder } from '../constants'


const CreateMeme: React.FC = () => {
    const ctx = useContext(CreateMemeContext)
    const ctxState = ctx.state

    const canSubmit = async () => {

        let err = ""

        if (!(ctxState.memeLeft.memeTitle && ctxState.memeLeft.memeTitle.length && ctxState.memeLeft.memeTitle != memeTitleLeftPlaceholder && ctxState.memeLeft.memeTitle.trim().length > 0)) {
            err += "LEFT meme text is not set\n"
        }

        if (!(ctxState.memeRight.memeTitle && ctxState.memeRight.memeTitle.length && ctxState.memeRight.memeTitle != memeTitleRightPlaceholder && ctxState.memeRight.memeTitle.trim().length > 0)) {
            err += "RIGHT meme text is not set\n"
        }

        if (!(ctxState.memeLeft.memeImageURL && ctxState.memeLeft.memeImageURL.trim().length > 0 && ctxState.memeLeft.memeImageURL != imgPlaceholder)) {
            err += "LEFT meme image is not set\n"
        }

        if (!(ctxState.memeRight.memeImageURL && ctxState.memeRight.memeImageURL.trim().length > 0 && ctxState.memeRight.memeImageURL != imgPlaceholder)) {
            err += "RIGHT meme image is not set\n"
        }

        if (!(ctxState.memeLeft.memeTitleDirection != TextDirection.NOTSELECTED && ctxState.memeRight.memeTitleDirection != TextDirection.NOTSELECTED)) {
            err += "Meme text direction is not set\n"
        }

        if (err.length) {
            window.alert("ERROR!\n\n" + err)
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
                memeTitle: ctxState.memeLeft.memeTitle,
                memeImageURL: ctxState.memeLeft.memeImageURL,
                memeTitleDirection: ctxState.memeLeft.memeTitleDirection
            },
            memeRight: {
                memeTitle: ctxState.memeRight.memeTitle,
                memeImageURL: ctxState.memeRight.memeImageURL,
                memeTitleDirection: ctxState.memeRight.memeTitleDirection
            }
        }

        let res = await docRef.add(data); // MEME ADDED WITH ID : res.id
        const docRefUpdateTime = db.collection('memes').doc(res.id)

        await updateDoc(docRefUpdateTime, {
            createdAt: serverTimestamp()
        });

        ctx.handleMemeTitle!("", MemeSide.LEFT)
        ctx.handleMemeImgURL!("", MemeSide.LEFT)
        ctx.handleMemeTitleDirection!(TextDirection.UP, MemeSide.LEFT)

        ctx.handleMemeTitle!("", MemeSide.RIGHT)
        ctx.handleMemeImgURL!("", MemeSide.RIGHT)
        ctx.handleMemeTitleDirection!(TextDirection.UP, MemeSide.RIGHT)

        ctx.gotoMeme!(res.id)
    }

    return (
        <div className="main">
            <div className="creatememe">
                <div className="canvas">
                    <MemePanel side={MemeSide.LEFT} />
                    <MemePanel side={MemeSide.RIGHT} />
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