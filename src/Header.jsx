
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/font.css'
import './css/components.css'
import './css/Header.css'
import { useTheme } from './theme'




function Header({ onNewTask, onNavigate }) {

    const { theme, setTheme } = useTheme()

    const switchTheme = (e) => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    };


    return (
        <>
            <header>
                <div className="header__top-row">
                    <div className="flex-col-center-center header__logo-column">
                        <p className="header__logo ui text size-text3x1">Logo</p>
                    </div>

                    <label className='switch'>
                        <input
                            type='checkbox'
                            onChange={switchTheme} />
                        <span className="slider"></span>
                    </label>


                </div>

                <div className="header__nav-row">
                    <ul className="header__nav-menu">
                        <li>
                            {/* Добавили обработчик клика */}
                            <button className="menu-item" onClick={onNewTask}>
                                <p style={{ fontFamily: "Darker Grotesque" }} className="header__menu-item ui text size-textxl">New task</p>
                            </button>
                        </li>

                        <li>
                            <button className="menu-item" onClick={() => onNavigate("history")} >
                                <p style={{ fontFamily: "Darker Grotesque" }} className="ui text size-textxl">History</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            <div className="columnview">
                <p className="frame-one__our-menu ui text size-text3x1">Your tasks</p>
            </div>
        </>
    );
}

export default Header;

