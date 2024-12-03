import './Categories.css';


function Category(props) {
    return (
        <div>
            <div className={'category_wrapper'}>
                <div className={'category'}><span>{props.data.title}</span></div>
                <div>{props.data.description}</div>
            </div>
        </div>
    );
}

export default Category;
