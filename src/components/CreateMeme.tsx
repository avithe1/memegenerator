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
    const ctxStateLeft = ctx.state.memeLeft
    const ctxStateRight = ctx.state.memeRight

    const canSubmit = async () => {

        let err = ""

        if (!(ctxStateLeft.memeTitle && ctxStateLeft.memeTitle.length && ctxStateLeft.memeTitle != memeTitleLeftPlaceholder && ctxStateLeft.memeTitle.trim().length > 0)) {
            err += "LEFT meme text is not set\n"
        }

        if (!(ctxStateRight.memeTitle && ctxStateRight.memeTitle.length && ctxStateRight.memeTitle != memeTitleRightPlaceholder && ctxStateRight.memeTitle.trim().length > 0)) {
            err += "RIGHT meme text is not set\n"
        }

        if (!(ctxStateLeft.memeImageURL && ctxStateLeft.memeImageURL.trim().length > 0 && ctxStateLeft.memeImageURL != imgPlaceholder)) {
            err += "LEFT meme image is not set\n"
        }

        if (!(ctxStateRight.memeImageURL && ctxStateRight.memeImageURL.trim().length > 0 && ctxStateRight.memeImageURL != imgPlaceholder)) {
            err += "RIGHT meme image is not set\n"
        }

        if (!(ctxStateLeft.memeTitleDirection != TextDirection.NOTSELECTED && ctxStateRight.memeTitleDirection != TextDirection.NOTSELECTED)) {
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
                memeTitle: ctxStateLeft.memeTitle,
                memeImageURL: ctxStateLeft.memeImageURL,
                memeTitleDirection: ctxStateLeft.memeTitleDirection
            },
            memeRight: {
                memeTitle: ctxStateRight.memeTitle,
                memeImageURL: ctxStateRight.memeImageURL,
                memeTitleDirection: ctxStateRight.memeTitleDirection
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