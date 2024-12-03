import {useEffect, useState} from "react";
import {getPosts} from "../../Api/getPosts";
import Post from "./Post";
import Header from "../UI/Header/Header";
import Pagination from "../UI/Pagination/Pagination";
import {Link, useSearchParams} from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sort, setSort] = useState('')

    useEffect( () => {
        if (!searchParams.has('page')) {
            setSearchParams({page: '1'})
        }
        async function fetchData() {
            const response = await getPosts(searchParams.toString());
            setPosts(response.data);
        }
        fetchData().then().catch(e=>console.log(e));
        //eslint-disable-next-line
    }, [searchParams]);

    function stopSearch() {
        searchParams.delete('search');
        setSearchParams(searchParams);
    }

    function stopDate() {
        searchParams.delete('date');
        setSearchParams(searchParams);
    }

    function setDateFilter() {
        if (startDate && endDate) {
            searchParams.set('date', `${startDate.replace(/-/gi, '.')}-${endDate.replace(/-/gi, '.')}`)
            setSearchParams(searchParams);
        }

    }

    const options = [
        {
            label: 'Sort by',
            value: ''
        },
        {
            label: "date up",
            value: "date-ASC",
        },
        {
            label: "date down",
            value: "date-DESC",
        },
        {
            label: "rating up",
            value: "rating-ASC",
        },
        {
            label: "rating down",
            value: "rating-DESC",
        },
    ];

    function sortPost() {
        if(sort) {
            searchParams.set('sort', sort)
            setSearchParams(searchParams);
        }
    }

    return (
        <div>
            <Header/>
            <div className={'posts_container'}>
                <div className={'post_container'}>
                    <h1 className={'posts_title'}>All Posts</h1>
                    <div className={'create_post_link'}><Link to={'/createPost'}>Create</Link> new post</div>
                    <div className={'filter'}>
                        <div className={'date_filter'}>
                            <input type="date"
                                   onChange={e => setStartDate(e.target.value)}
                            />
                            -
                            <input type="date"
                                   onChange={e => setEndDate(e.target.value)}
                            />
                            <button className={'date_btn'} onClick={setDateFilter}>Set</button>
                        </div>
                        <div className={'sort'}>
                            <select onChange={e => setSort(e.target.value)}>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <button className={'sort_btn'} onClick={sortPost}>Set</button>
                        </div>
                    </div>
                    {searchParams.has('date') ?
                        <div className={'search_results'}>Results by <span className={'search_param'}>{searchParams.get('date')}</span>
                            <button className={'stopSearch_btn'} onClick={stopDate}>delete</button>
                        </div> : ''}
                    {searchParams.has('search') ?
                        <div className={'search_results'}>Results by <span className={'search_param'}>{searchParams.get('search')}</span>
                            <button className={'stopSearch_btn'} onClick={stopSearch}>delete</button>
                        </div> : ''}
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
                            />
                        ) : <div style={{fontSize: '32px'}}>Posts not found</div>}
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
