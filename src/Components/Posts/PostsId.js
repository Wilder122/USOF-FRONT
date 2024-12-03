import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getComments, getPostById} from "../../Api/getPosts";
import Header from "../UI/Header/Header";
import './Post.css';
import CreateComment from "../Comments/CreateComment";
import Comment from "../Comments/Comment";
import {deleteLikeDb, setLikeDb} from "../../Api/likes";

function PostsId() {

    const {postId} = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(post.rating)

    async function addLike() {
        await setLikeDb(post.id)
            .then(response => {
                console.log(response)
                setLike(like + 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    async function deleteLike() {
        await deleteLikeDb(post.id)
            .then(response => {
                console.log(response)
                setLike(like - 1);
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        async function fetchData() {
            const postResponse = await getPostById(postId);
            const commentsResponse = await getComments(postId);
            setPost(postResponse.data);
            setComments(commentsResponse.data)
            setLike(postResponse.data.rating)
        }
        fetchData().then().catch(e => console.log(e));
        //eslint-disable-next-line
    }, [comments])

    return (
        <div>
            <Header/>
            <div className={'postId_container'}>
                <h1 className={'postId_title'}>{post.title}</h1>
                <div className={'postId_wrapper'}>
                    <div className={'rating_wrapper'}>
                        <button onClick={addLike} className={'like_btn'}>+</button>
                        <div className={'rating'}>{like}</div>
                        <button onClick={deleteLike} className={'dislike_btn'}>-</button>
                    </div>
                    <div className={'id_content_wrapper'}>
                        <div className={'postId_content'}>{post.content}</div>
                        <div className={'owner'}>Asked by <Link to={`/users/${post.idOwner}`}>{post.owner}</Link></div>
                        <div className={'date'}>{new Date(post.date).toUTCString()}</div>
                        <div className={'category'}>
                            {post.categories ? post.categories.map(item =>
                                <span key={item} className={'category_badge'}>{item}</span>
                            ) : ''}
                        </div>
                    </div>
                </div>
                <div className={'answers_container'}>
                    <CreateComment/>
                    <h1>{comments.length} Answers</h1>
                    {comments.map(comment =>
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            date={comment.date}
                            rating={comment.rating}
                            content={comment.content}
                            owner={comment.owner}
                            idOwner={comment.idOwner}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostsId;
