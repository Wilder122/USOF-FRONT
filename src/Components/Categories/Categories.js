import Header from "../UI/Header/Header";
import {useEffect, useState} from "react";
import {createCategory, getCategories} from "../../Api/category";
import Category from "./Category";
import './Categories.css'

function Categories() {
    const [categories, setCategories] = useState([]);
    const [val, setVal] = useState({});

    useEffect( () => {
        async function fetchData() {
            const response = await getCategories();
            setCategories(response.data);
        }
        fetchData().then().catch(e => console.log(e))
    }, [categories])


    async function click() {
        await createCategory(val);
    }

    return (
        <div>
            <Header/>
            <div className={'container'}>
                <div className={'wrapper'}>
                    {categories.map(item =>
                        <Category data={item}/>
                    )}
                </div>

                <div className={'create_category'}>
                    <h1 className={'create_head'}>Create Category</h1>
                    <input
                        type={'text'}
                        className={'create_title'}
                        onChange={e => setVal({...val, title: e.target.value})}
                        placeholder={'Title of your post'}
                    />
                    <textarea
                        name={'content'}
                        className={'create_content'}
                        cols={30}
                        rows={10}
                        onChange={e => setVal({...val, description: e.target.value})}
                        placeholder={'Content of your post'}
                    />
                    <button className={'create_btn'} onClick={click}>Create</button>
                </div>
            </div>

        </div>
    );
}

export default Categories;
