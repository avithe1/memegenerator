import { MemeSide, TextDirection, MemeTitleImageDirection } from "../types/common.types";
import './MemeSide.scss'

interface Props {
    side: MemeSide
    data: MemeTitleImageDirection
}

const MemeSideComponentRO: React.FC<Props> = ({ side, data }) => {
    const imgAlt = side === MemeSide.LEFT ? "Meme pic left" : "Meme pic right"
    return (
        <div className={side === MemeSide.LEFT ? "canvas_left" : "canvas_right"}>
            <p className={`canvas_txt ${data.memeTitleDirection === TextDirection.UP ? 'canvas_txt__top' : 'canvas_txt__bottom'}`}>
                {data.memeTitle}
            </p>
            <img
                className="canvas_img"
                src={data.memeImageURL}
                alt={imgAlt} />
        </div>
    )
}

export default MemeSideComponentRO;