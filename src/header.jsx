import './header.scss';
import { Link } from 'react-router-dom';
const Header = ()=>{
    return (
        <header>
            <h1>RESTy</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                    <li>
                        {/* <a href="/contact-us">Contact us</a> */}
                        <Link to="/help">Help</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;