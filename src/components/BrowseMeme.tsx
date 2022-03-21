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
    const fetchData = async (): Promise<MemeData[]> => {
        if (!id && !lastVisible) {
            console.log("here1")


            var first = db.collection('memes').orderBy("createdAt", "desc").limit(1);
            console.log("FIRST QUERY!")
            first.get().then(function (documentSnapshots) {
                setMemeData(documentSnapshots.docs[documentSnapshots.docs.length - 1].data() as MemeData)
                setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1])

            });


        } else {
            console.log("here2")
            if (id && !lastVisible) {
                console.log("here3")
                const dataRef = db.collection('memes').doc(id!);
                const doc = await dataRef.get();

                if (!doc.exists) {
                    setMemeData(null)
                    setFetchStatus("Meme does not exist")
                } else {
                    const data: MemeData = doc.data() as MemeData
                    setMemeData(data)
                }
            }
        }

        return [];
    }

    const showNext = async () => {
        console.log("next")
        if (lastVisible) {
            console.log("lastVisible: ", lastVisible.data().createdAt)
            var next = db.collection('memes').orderBy("createdAt", "desc")
                .startAfter(lastVisible!.data().createdAt).limit(1);

            next.get().then(function (docSn) {
                console.log("SECOND QUERY!")
                docSn.forEach(function (doc) {
                    console.log(doc.data().createdAt.toMillis())
                });

                setMemeData(docSn.docs[docSn.docs.length - 1].data() as MemeData)
                setLastVisible(docSn.docs[docSn.docs.length - 1])
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
                                    <>
                                        <button className="submit_btn">PREV</button>
                                        <button className="submit_btn" onClick={showNext}>NEXT</button>
                                    </>
                            }
                        </div>
                    </>
                    : <p>{fetchStatus}</p>
            }

        </div>
    )
}

export default BrowseMeme;