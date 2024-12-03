import {useEffect, useState} from "react";
import {login} from "../../Api/auth";
import checkAuth from "../../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import Header from "../UI/Header/Header"
import './Auth.css'

function Login() {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.authorizationStatus)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth().then(res => {
                if(res) {
                    dispatch({type: "LOG_IN"});
                    localStorage.setItem('isAuth', 'true');
                }
            })
        }
        // eslint-disable-next-line
    },[])

    async function loginUser() {
        await login(user)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                dispatch({type: "LOG_IN"});
                localStorage.setItem('isAuth', 'true');
            })
            .catch(err => {
                console.log(err.response);
                setError(err.response.data);
            });
    }

    if (isAuth) {
        return (
            <Navigate to={'/'}/>
        )
    }

    return (
        <div>
            <Header/>
            <div className={'auth_form'}>
                <h1>Sign in</h1>
                <input
                    className={'auth_input'}
                    type={"text"}
                    onChange={e => setUser({...user, login: e.target.value})}
                    placeholder={'Login'}
                    size={25}
                />
                <input
                    className={'auth_input'}
                    type={"password"}
                    onChange={e => setUser({...user, pass: e.target.value})}
                    placeholder={'Password'}
                    size={25}
                />
                <button className={'auth_btn'} onClick={loginUser}>Login</button>
                <Link className={'refLog'} to={'/register'}>Register</Link>
                <br/>
                <Link to={'/reset'}>Remind password</Link>
                <div style={{color: 'red'}}>{error}</div>
            </div>
        </div>
    );
}

export default Login;