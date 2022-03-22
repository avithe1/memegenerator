import { useEffect, useState } from "react";
import './CreateMeme.scss'
import { MemeSide, MemeData } from '../types/common.types'
import MemePanelRO from "./MemePanelRO";
import { db } from '../firebase/firebase'
import { DocumentData } from 'firebase/firestore'

interface Props {
    id: string | null
}

const BrowseMeme: React.FC<Props> = ({ id }) => {

    const [_id, setId] = useState(id)
    const [memeData, setMemeData] = useState<MemeData | null>(null)
    const [fetchStatus, setFetchStatus] = useState("Loading...")
    const [lastVisible, setLastVisible] = useState<DocumentData | null>(null)
    const [noMoreMemes, setNoMoreMemes] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        if (!_id && !lastVisible) {
            await getFirstDocument()
        } else {
            if (_id && !lastVisible) {
                const dataRef = db.collection('memes').doc(_id!);
                const doc = await dataRef.get();

                if (!doc.exists) {
                    setMemeData(null)
                    setFetchStatus("Meme does not exist")
                } else {
                    setFetchStatus("")
                    const data: MemeData = doc.data() as MemeData
                    setMemeData(data)
                }
            }
        }
    }

    const showNext = async () => {
        if (lastVisible) {
            var next = db.collection('memes').orderBy("createdAt", "desc")
                .startAfter(lastVisible!.data().createdAt).limit(1);

            next.get().then(function (docSn) {
                if (docSn.docs.length) {
                    setMemeData(docSn.docs[docSn.docs.length - 1].data() as MemeData)
                    setLastVisible(docSn.docs[docSn.docs.length - 1])
                } else {
                    setFetchStatus("No more memes")
                    setNoMoreMemes(true)
                }
            });
        } else {
            console.log("NO lastVisible: ")
        }
    }

    const browseFromStart = async () => {
        setNoMoreMemes(false)
        setId(null)
        await getFirstDocument()
    }

    const getFirstDocument = async () => {
        var first = db.collection('memes').orderBy("createdAt", "desc").limit(1);
        first.get().then(function (documentSnapshots) {
            if (documentSnapshots.docs.length) {
                setFetchStatus("")
                setMemeData(documentSnapshots.docs[documentSnapshots.docs.length - 1].data() as MemeData)
                setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1])
            } else {
                setFetchStatus("There are no memes available")
            }
        });
    }

    return (
        <div className="main">
            <p>{fetchStatus}</p>
            {
                memeData ?
                    <>
                        <div className="creatememe">
                            <div className="canvas">
                                <MemePanelRO side={MemeSide.LEFT} data={memeData.memeLeft} />
                                <MemePanelRO side={MemeSide.RIGHT} data={memeData.memeRight} />
                            </div>
                        </div>
                        <div className="btn_container">
                            {
                                _id || noMoreMemes ?
                                    <button className="submit_btn" onClick={browseFromStart}>Browse from start</button>
                                    :
                                    <button className="submit_btn" onClick={showNext}>NEXT</button>
                            }
                        </div>
                    </> : null
            }

        </div>
    )
}

export default BrowseMeme;