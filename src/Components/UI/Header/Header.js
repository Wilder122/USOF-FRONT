import {Link, useSearchParams} from "react-router-dom";
import './Header.css'
import AuthButton from "./AuthButton";
import logo from '../../../assets/USOF.jpg'
import {useState} from "react";
import searchIc from '../../../assets/free-icon-magnifier-2319177.png'

function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('')

    function searchClick() {
        if (search) {
            searchParams.set('search', search)
            setSearchParams(searchParams);
        }
    }
    return (
        <div className={'header'}>
            <div className={'logo'}>
                <img src={logo} alt="logo"/>
                <Link to={'/'}>WildUsof</Link>
            </div>
            <div className={'head_list'}>
                <ul>
                    <li><Link to={'/posts'}>Posts</Link></li>
                    <li><Link to={'/categories'}>Tags</Link></li>
                </ul>
            </div>
            {window.location.pathname === '/posts' ?
                <div className={'search_area'}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={'search_input'}
                        placeholder={'Search...'}
                    />
                    <button className={'search_btn'} onClick={searchClick}><img src={searchIc} alt=""/></button>
                </div> : ''
            }
            <div>
                <AuthButton/>
            </div>
        </div>
    );
}

export default Header;