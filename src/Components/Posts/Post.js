import './Post.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {deleteLikeDb, setLikeDb} from "../../Api/likes"
import {deletePost} from "../../Api/getPosts";

function Post(props) {

    const [like, setLike] = useState(props.rating)

    async function addLike() {
        await setLikeDb(props.id)
            .then(response => {
                console.log(response)
                setLike(like + 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    async function deleteLike() {
        await deleteLikeDb(props.id)
            .then(response => {
                console.log(response)
                setLike(like - 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    async function deleteUserPost() {
        await deletePost(props.id);
    }

    return (
        <div className={'post'}>
            <div className={'date'}>{new Date(props.date).toUTCString()}</div>
            <div className={'rating_wrapper'}>
                <button onClick={addLike} className={'like_btn'}>+</button>
                <div className={'rating'}>{like}</div>
                <button onClick={deleteLike} className={'dislike_btn'}>-</button>
            </div>
            <div className={'content_wrapper'}>
                <div className={'title'}>
                    <Link to={`/posts/${props.id}`}>{props.title}</Link>
                </div>
                <div className={'content'}><p className={'content_p'}>{props.content}</p></div>
                <div className={'owner'}>Asked by <Link to={`/users/${props.idOwner}`}>{props.owner}</Link></div>

                <div className={'category'}>
                    {props.category.map(item =>
                        <span key={item} className={'category_badge'}>{item}</span>
                    )}
                </div>
                {props.isUser ?
                    <div className={'del_btn'}>
                        <button onClick={deleteUserPost}>delete</button>
                        <button><Link style={{textDecoration: 'none'}} to={`/changePost/${props.id}`}>Change</Link></button>
                    </div> :
                    ''}
            </div>

        </div>
    );
}

export default Post;
