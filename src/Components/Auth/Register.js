import {useState} from "react";
import {register} from "../../Api/auth";
import Header from "../UI/Header/Header";
import './Auth.css'
import {Link} from "react-router-dom";

function Register() {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    async function registerUser() {
        await register(user)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
        })
            .catch(err => {
                console.log(err.response);
                setError('ERROR');
        });
    }

    return (
        <div>
            <Header/>
            <div className={'auth_form'}>
                <h1>Sign up</h1>
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
                <input
                    className={'auth_input'}
                    type={"password"}
                    onChange={e => setUser({...user, pass: e.target.value})}
                    placeholder={'Confirm password'}
                    size={25}
                />
                <input
                    className={'auth_input'}
                    type={"text"}
                    onChange={e => setUser({...user, fullName: e.target.value})}
                    placeholder={'Full Name'}
                    size={25}
                />
                <input
                    className={'auth_input'}
                    type={"text"}
                    onChange={e => setUser({...user, email: e.target.value})}
                    placeholder={'Email'}
                    size={25}
                />
                <button className={'auth_btn'} onClick={registerUser}>Register</button>
                <br/>
                <Link to={'/login'}>Login</Link>
                <div>{error}</div>
            </div>
        </div>
    );
}

export default Register;