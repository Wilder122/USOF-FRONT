import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createComments} from "../../Api/comments";
import {useParams} from "react-router-dom";
import './CreateComment.css'

function CreateComment() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.authorizationStatus);

    const [createComment, setCreateComment] = useState({});
    const {postId} = useParams()

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            dispatch({type: "LOG_IN"});
        }
        else{
            dispatch({type: "LOG_OUT"});
        }
        // eslint-disable-next-line
    },[]);

    async function click() {
        const response = await createComments(postId, createComment);
        console.log(response)
        console.log(createComment)
    }

    if(isAuth) {
        return (
            <div>
                <h1>Create comments</h1>
                <textarea
                    name={'content'}
                    className={'create_content create_comment'}
                    cols={30}
                    rows={10}
                    onChange={e => setCreateComment({...createComment, content: e.target.value})}
                    placeholder={'Your comment'}
                />
                <button className={'comment_btn'} onClick={click}>Create Answer</button>
            </div>
        )
    }

    return (
        <div className={'logged_mess'}>
            You must be logged in to create comment
        </div>
    );
}

export default CreateComment;
