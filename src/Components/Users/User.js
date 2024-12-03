import Header from "../UI/Header/Header";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getPostsByUser, getUserById} from "../../Api/user";
import './User.css';
import Post from "../Posts/Post";
import jwt_decode from "jwt-decode";
import {changeAvatar} from "../../Api/avatar";
import {useSelector} from "react-redux";

function User() {
    const {userId} = useParams()
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [tempUser, setTempUser] = useState({})
    const isAuth = useSelector(state => state.auth.authorizationStatus)

    const [img, setImg] = useState(null);
    const [avatar, setAvatar] = useState('')

    const sendFile = useCallback(async () => {
        try{
            const data = new FormData();
            console.log(img);
            data.append('avatar', img);
            await changeAvatar(data).then(response => {
                console.log(response.data)
                setAvatar(response.data)
                localStorage.setItem('avatar', response.data)
            });
        }
        catch (e) {
            console.log(e);
        }
    }, [img])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setTempUser(jwt_decode(localStorage.getItem('token')));
        }
        else {
            setTempUser({});
        }

    }, [isAuth])

    useEffect(() => {
        async function fetchData() {
            const response = await getUserById(userId);
            const postsRes = await getPostsByUser(userId);
            setUser(response.data);
            setPosts(postsRes.data);
        }
        fetchData().then().catch(e => console.log(e));

    }, [userId, posts])

    return (
        <div>
            <Header/>
            <div className={'user_container'}>
                <div className={'user_wrapper'}>
                    <div className={'user_info'}>
                        <div className={'login'}>Login: <span>{user.login}</span> </div>
                        <div className={'fullName'}>FullName: <span>{user.fullName}</span></div>
                        <div className={'email'}>Email: <span>{user.email}</span></div>
                        <div className={'Rating'}>Rating: <span>{user.rating}</span></div>
                        <div className={'role'}>Role: <span>{user.roles}</span></div>
                    </div>
                    <div className={'user_ava'}>

                        {avatar ? <img src={`http://localhost:3001/${avatar}`} alt=""/> : <img src={`http://localhost:3001/${user.profilePicture}`} alt=""/>}
                        {tempUser.id === user.id ?
                            <div className={'select_file'}>
                                <input accept={'image/*'} type={"file"} name={'avatar'} onChange={e => setImg(e.target.files[0])}/>
                                <button onClick={sendFile} className={'change_btn'}>Change</button>
                            </div>

                            : ''}

                    </div>
                </div>
                <h1>User's posts</h1>
                <div className={'posts_wrapper'}>
                    {posts.length > 0 ? posts.map(post =>
                        <Post key={post.id} title={post.title}
                              owner={post.owner}
                              content={post.content}
                              date={post.date}
                              category={post.categories}
                              rating={post.rating}
                              id={post.id}
                              idOwner={post.idOwner}
                              isUser={tempUser.id === user.id}
                        />
                    ) : <div style={{fontSize: '32px'}}>Posts not found</div>}

                </div>
            </div>
        </div>
    );
}

export default User;
