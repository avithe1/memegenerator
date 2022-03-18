import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.scss'
import { ModeType } from '../types/common.types'

interface Props {
    appmode: ModeType,
    modeSelect: (modeType: ModeType) => void
}

const Header: React.FC<Props> = ({ appmode, modeSelect }) => {
    return (
        <header className="header">
            <div className="header_left">
                <span className='appname'>Meme Generator</span>
            </div>
            <div className="header_right">
                <button
                    className={appmode == ModeType.CREATE ? "header_button header_button__selected" : "header_button"}
                    onClick={() => modeSelect(ModeType.CREATE)}
                >
                    <FontAwesomeIcon icon={faPlus} size={'lg'} className="header_button__icon" />
                    <span>Create new</span>
                </button>
                <button
                    className={appmode == ModeType.BROWSE ? "header_button header_button__selected" : "header_button"}
                    onClick={() => modeSelect(ModeType.BROWSE)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={'lg'} className="header_button__icon" />
                    <span>Browse</span>
                </button>
            </div>
        </header>
    )
}
export default Header;