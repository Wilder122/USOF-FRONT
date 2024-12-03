import {Link} from "react-router-dom";
import {useState} from "react";
import {deleteCommentLike, setCommentLike} from "../../Api/comments";

function Comment(props) {

    const [like, setLike] = useState(props.rating)

    async function addLike() {
        await setCommentLike(props.id)
            .then(response => {
                console.log(response)
                setLike(like + 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    async function deleteLike() {
        await deleteCommentLike(props.id)
            .then(response => {
                console.log(response)
                setLike(like - 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div key={props.id} className={'answers_wrapper'}>
            <div  className={'rating_wrapper'}>
                <button onClick={addLike} className={'like_btn'}>+</button>
                <div className={'rating'}>{like}</div>
                <button onClick={deleteLike} className={'dislike_btn'}>-</button>

            </div>
            <div className={'date'}>{new Date(props.date).toUTCString()}</div>
            <div className={'answer_content_wrapper'}>
                <div className={'answer_content'}>{props.content}</div>
                <div className={'owner'}>Answered by <Link to={`/users/${props.idOwner}`}>{props.owner}</Link></div>
            </div>
        </div>
    );
}

export default Comment;
