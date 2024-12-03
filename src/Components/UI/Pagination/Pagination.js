import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import './Pagination.css'
import {getPosts} from "../../../Api/getPosts";

function Pagination(props) {
    const [pagination, setPagination] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState(2);
    let arr = [];


    useEffect( () => {
        async function fetchData() {
            const response = await getPosts(searchParams.toString());
            setPages( response.data[0].pages);
        }
        fetchData().then().catch(e=>console.log(e));
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        for (let i = 1; i <= pages; i++) {
            arr[i] = i
            setPagination(arr)
        }
        // eslint-disable-next-line
    }, [searchParams, pages]);

    function click(e) {
        searchParams.set('page', e.target.value)
        setSearchParams(searchParams);
    }
    return (
        <div className={'pagination'}>
            {pagination.map(page =>
                <button className={'pag_btn'} onClick={click} value={page} key={page}>{page}</button>
            )}
        </div>
    );
}

export default Pagination;