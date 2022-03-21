import { useEffect, useState } from "react";
import './CreateMeme.scss'
import { MemeSide, MemeData } from '../types/common.types'
import MemeSideComponentRO from "./MemeSideRO";
import { db } from '../firebase/firebase'

interface Props {
    id: string | null
}

const BrowseMeme: React.FC<Props> = ({ id }) => {

    const [memeData, setMemeData] = useState<MemeData | null>(null)
    const [fetchStatus, setFetchStatus] = useState("Loading...")

    const fetchData = async (): Promise<MemeData[]> => {
        if (!id) {
            const first = db.collection('memes')
                .orderBy('createdAt')
                .limit(1);

            const snapshot = await db.collection('memes').limit(1).get();

            if (snapshot.docs.length) {
                const dataRef = db.collection('memes').doc(snapshot.docs[snapshot.docs.length - 1].id);
                const doc = await dataRef.get();

                if (!doc.exists) {
                    setMemeData(null)
                    setFetchStatus("Meme does not exist")
                } else {
                    setMemeData(doc.data() as MemeData)
                }

                // Get the last document
                //const last = snapshot.docs[snapshot.docs.length - 1];

                // Construct a new query starting at this document.
                // Note: this will not have the desired effect if multiple
                // cities have the exact same population value.
                // const next = db.collection('memes')
                //     .startAfter(snapshot.docs[snapshot.docs.length - 1].id)
                //     .limit(1);
            } else {
                setFetchStatus("There are no memes")
            }
        }
        return [];
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
                                        <button className="submit_btn">NEXT</button>
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