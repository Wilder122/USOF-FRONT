import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main/Main";
import Posts from "./Components/Posts/Posts";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Reset from "./Components/Auth/Reset";
import PostsId from "./Components/Posts/PostsId";
import User from "./Components/Users/User";
import CreatePostPage from "./Components/CreatePost/CreatePostPage";
import ChangePostPage from "./Components/CreatePost/ChangePostPage";
import Categories from "./Components/Categories/Categories";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/posts/:postId' element={<PostsId/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/reset' element={<Reset/>}/>
                <Route path='/createPost' element={<CreatePostPage/>}/>
                <Route path='/users/:userId' element={<User/>}/>
                <Route path='/changePost/:postId' element={<ChangePostPage/>}/>
                <Route path='/categories' element={<Categories/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
