import Header from "../UI/Header/Header";
import {useParams} from "react-router-dom";
import CreatePost from "./CreatePost";
import {useEffect, useState} from "react";
import {getPostById} from "../../Api/getPosts";

function ChangePostPage() {
    const {postId} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchData() {
            const postResponse = await getPostById(postId);
            setData(postResponse.data);
        }
        fetchData().then().catch(e => console.log(e));
    }, [postId])

    return (
        <div>
            <Header/>
            <CreatePost
                data={data}
            />
        </div>
    );
}

export default ChangePostPage;
