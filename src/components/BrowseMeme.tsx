import { useEffect, useState } from "react";
import './CreateMeme.scss'
import { MemeSide, MemeData } from '../types/common.types'
import MemeSideComponentRO from "./MemeSideRO";
import { db } from '../firebase/firebase'
import { DocumentData } from 'firebase/firestore'

interface Props {
    id: string | null
}

const BrowseMeme: React.FC<Props> = ({ id }) => {

    const [memeData, setMemeData] = useState<MemeData | null>(null)
    const [fetchStatus, setFetchStatus] = useState("Loading...")
    const [lastVisible, setLastVisible] = useState<DocumentData | null>(null)


    const fetchData = async () => {
        if (!id && !lastVisible) {
            var first = db.collection('memes').orderBy("createdAt", "desc").limit(1);
            console.log("FIRST MEME!")
            first.get().then(function (documentSnapshots) {
                if (documentSnapshots.docs.length) {
                    setFetchStatus("")
                    setMemeData(documentSnapshots.docs[documentSnapshots.docs.length - 1].data() as MemeData)
                    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1])
                } else {
                    setFetchStatus("There are no memes available")
                }
            });
        } else {
            if (id && !lastVisible) {
                const dataRef = db.collection('memes').doc(id!);
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
        console.log("next")
        if (lastVisible) {
            console.log("lastVisible: ", lastVisible.data().createdAt)
            var next = db.collection('memes').orderBy("createdAt", "desc")
                .startAfter(lastVisible!.data().createdAt).limit(1);

            next.get().then(function (docSn) {
                console.log("SECOND QUERY!")
                if (docSn.docs.length) {
                    setMemeData(docSn.docs[docSn.docs.length - 1].data() as MemeData)
                    setLastVisible(docSn.docs[docSn.docs.length - 1])
                } else {
                    setFetchStatus("No more memes")
                }
            });
        } else {
            console.log("NO lastVisible: ")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="main">
            <p>{fetchStatus}</p>
            {
                memeData ?
                    <>
                        <div className="creatememe">
                            <div className="canvas">
                                <MemeSideComponentRO side={MemeSide.LEFT} data={memeData} />
                                <MemeSideComponentRO side={MemeSide.RIGHT} data={memeData} />
                            </div>
                        </div>
                        <div className="btn_container">
                            {
                                id ?
                                    <button className="submit_btn">Browse from start</button>
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