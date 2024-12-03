import './CreatePost.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePost, createPost} from "../../Api/createPost";
import {getCategories} from "../../Api/category";
import {Navigate} from "react-router-dom";

function CreatePost(props) {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.authorizationStatus);

    const [post, setPost] = useState({title: '', content: ''});
    const [checked, setChecked] = useState([]);
    const [checkList, setChecklist] = useState([])
    const [isCreate, setIsCreate] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            dispatch({type: "LOG_IN"});
        }
        else{
            dispatch({type: "LOG_OUT"});
        }
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        async function fetchData() {
            const response = await getCategories();
            let result = [];

            response.data.forEach(item => {
                result.push(item.title);
            })
            setChecklist(result);
        }
        fetchData().then().catch(e => console.log(e));
        setPost(props.data)

    }, [props.data])

    async function click() {
        await createPost(post)
            .then(response => {
                console.log(response);
                setIsCreate(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    async function changePostClick() {
        await changePost(props.data.id, post)
            .then(response => {
                console.log(response);
                setIsCreate(true);
            })
            .catch(e => {
                console.log(e);
            });
    }
    function handleCheck(e) {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
        setPost({...post, categories: updatedList});
    }

    if(isAuth) {

        if(isCreate) {
            return (
                <Navigate to={'/posts'}/>
            );
        }
        return (
            <div>
                <div className={'create_container'}>
                    <div className={'create_wrapper'}>
                        <h1 className={'create_head'}>Fill in all the fields</h1>
                        <input
                            type={'text'}
                            className={'create_title'}
                            onChange={e => setPost({...post, title: e.target.value})}
                            placeholder={'Title of your post'}
                            value={post ? post.title : ''}
                        />
                        <textarea
                            name={'content'}
                            className={'create_content'}
                            cols={30}
                            rows={10}
                            onChange={e => setPost({...post, content: e.target.value})}
                            placeholder={'Content of your post'}
                            value={post ? post.content : ''}
                        />
                        <div className={'category_create'}>
                            {checkList.map((item, index) => (
                                <div className={'radio_block'} key={index}>
                                    <label>
                                        <input className={'real__radio'} value={item} type="checkbox" onChange={handleCheck} />
                                        <span className={'custom__radio'}>{item}</span>
                                    </label>
                                </div>

                            ))}
                        </div>
                        {props.data ? <button onClick={changePostClick} className={'create_btn'}>Change</button> : <button onClick={click} className={'create_btn'}>Create</button>}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className={'logged'}>You must be logged in</div>
        </div>
    )

}

export default CreatePost;
