import {store} from "../../redusers";
import Header from "../UI/Header/Header";
import {Link} from "react-router-dom";

function Main() {
    console.log(store.getState());
    return (
        <div>
            <Header/>
            <div style={{textAlign: 'center', marginTop:'200px'}}>
                <h1>Welcome to <span style={{color: '#F64C72'}}>WildUsof</span></h1>
                <div style={{marginTop:'70px'}}><Link
                    style={{fontSize: '32px', textDecoration: 'none', color:'black'}}
                    to={'/posts'}>Start</Link></div>
            </div>

        </div>
    );
}

export default Main;
