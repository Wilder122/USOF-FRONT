import Header from "../UI/Header/Header";
import './Auth.css'
import {useState} from "react";
import {reset} from "../../Api/auth";


function Reset() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    async function resetPass() {
        await reset(email)
            .then()
            .catch(err => {
                console.log(err.response);
                setError('ERROR');
            });
    }

    return (
        <div>
            <Header/>
            <div className={'auth_form'}>
                <h1>Sign in</h1>
                <input
                    className={'auth_input'}
                    type={"text"}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={'Login'}
                    size={25}
                />
                <button className={'auth_btn'} onClick={resetPass}>Send</button>
                <div>{error}</div>
            </div>
        </div>
    );
}

export default Reset;