import { MemeSide, TextDirection, MemeData } from "../types/common.types";
import './MemeSide.scss'

interface Props {
    side: MemeSide
    data: MemeData
}

const MemeSideComponentRO: React.FC<Props> = ({ side, data }) => {
    const imgTxt = side === MemeSide.LEFT ? data.imgTxt.txtleft : data.imgTxt.txtright
    const textDirection = side === MemeSide.LEFT ? data.txtDirection.txtdirectionleft : data.txtDirection.txtdirectionright
    const imgUrl = side === MemeSide.LEFT ? data.imgUrl.imgurlleft : data.imgUrl.imgurlright
    const imgAlt = side === MemeSide.LEFT ? "Meme pic left" : "Meme pic right"

    return (
        <div className={side === MemeSide.LEFT ? "canvas_left" : "canvas_right"}>
            <p className={`canvas_txt ${textDirection === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'}`}>
                {imgTxt}
            </p>
            <img
                className="canvas_img"
                src={imgUrl}
                alt={imgAlt} />
        </div>
    )
}

export default MemeSideComponentRO;