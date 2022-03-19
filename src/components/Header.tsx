import { faPlus, faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.scss'
import { ModeType } from '../types/common.types'
import { useState } from "react";

interface Props {
    appmode: ModeType | null,
    modeSelect: (modeType: ModeType | null) => void
}

const Header: React.FC<Props> = ({ appmode, modeSelect }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (type: ModeType | null) => {
        if (type != null) {
            modeSelect(type)
            setShowMenu(false)
        } else {
            setShowMenu(prev => !prev)
        }
    }

    return (
        <header className="header">
            <div className="header_left">
                <span className='appname'>Meme Generator</span>
            </div>
            <div className="header_right">
                <div className={`header_right__buttons${showMenu ? '__show' : ''}`}>
                    <button
                        className={appmode == ModeType.CREATE ? "header_button header_button__selected" : "header_button"}
                        onClick={() => toggleMenu(ModeType.CREATE)}
                    >
                        <FontAwesomeIcon icon={faPlus} size={'lg'} className="header_button__icon" />
                        <span>Create new</span>
                    </button>
                    <button
                        className={appmode == ModeType.BROWSE ? "header_button header_button__selected" : "header_button"}
                        onClick={() => toggleMenu(ModeType.BROWSE)}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={'lg'} className="header_button__icon" />
                        <span>Browse</span>
                    </button>
                </div>
                <div className="header_right__menu">
                    <button
                        className="header_button"
                        onClick={() => toggleMenu(null)}
                    >
                        <FontAwesomeIcon icon={faBars} size={'lg'} className="header_button__icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}
export default Header;