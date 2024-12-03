import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "../../../Api/auth";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";

function AuthButton() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.authorizationStatus)

    async function click() {
        if(isAuth) {
            await logout().then().catch(e=>console.log(e))
            dispatch({type: "LOG_OUT"});
            localStorage.setItem('isAuth', 'false');
            localStorage.removeItem('token');
            localStorage.removeItem('avatar');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            dispatch({type: "LOG_IN"});
        }
        else{
            dispatch({type: "LOG_OUT"});
        }
        // eslint-disable-next-line
    },[]);

    if(isAuth) {
        const user = jwt_decode(localStorage.getItem('token'))
        return (
            <div>
                <button className={'logout_btn'} onClick={click}>Logout</button>
                {localStorage.getItem('avatar')
                    ? <Link to={`/users/${user.id}`}><img className={'avatar'} src={`http://localhost:3001/${localStorage.getItem('avatar')}`} alt=""/></Link>
                    : <Link to={`/users/${user.id}`}><img className={'avatar'} src={`http://localhost:3001/${user.profilePicture}`} alt=""/></Link>}

            </div>
        );
    }
    return (
        <Link className={'login_link'} to={'/login'}>Log In</Link>
    );
}

export default AuthButton;