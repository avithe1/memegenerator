import { faPlus, faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.scss'
import { MenuOptions } from '../types/common.types'
import { useState } from "react";

interface Props {
    appmode: MenuOptions,
    menuSelect: (option: MenuOptions) => void
}

const Header: React.FC<Props> = ({ appmode, menuSelect }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (option: MenuOptions) => {
        if (option === MenuOptions.DISMISS_MENU) {
            setShowMenu(prev => !prev)
        } else {
            menuSelect(option)
            setShowMenu(false)
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
                        className={appmode == MenuOptions.CREATE ? "header_button header_button__selected" : "header_button"}
                        onClick={() => toggleMenu(MenuOptions.CREATE)}
                    >
                        <FontAwesomeIcon icon={faPlus} size={'lg'} className="header_button__icon" />
                        <span>Create new</span>
                    </button>
                    <button
                        className={appmode == MenuOptions.BROWSE ? "header_button header_button__selected" : "header_button"}
                        onClick={() => toggleMenu(MenuOptions.BROWSE)}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={'lg'} className="header_button__icon" />
                        <span>Browse</span>
                    </button>
                </div>
                <div className="header_right__menu">
                    <button
                        className="header_button"
                        onClick={() => toggleMenu(MenuOptions.DISMISS_MENU)}
                    >
                        <FontAwesomeIcon icon={faBars} size={'lg'} className="header_button__icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}
export default Header;