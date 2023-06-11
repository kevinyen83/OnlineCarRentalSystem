import filterItems from "./filterItems";

function CategoryBar({ categoryList }) {
    return (
    <div className="flex-container">
        {categoryList.map((category, index) => (
        <div key={index}>
            <div className="dropdown">
                <button className="dropbtn">{category.categoryName}</button>
                <div className="dropdown-content">
                    {category.subcategories.map((subcategory, subIndex) => (
                        <div className="dropdown-content-item" 
                            onClick={() => filterItems(subcategory)} 
                            key={subIndex}>{subcategory}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        ))}
    </div>
    );
}

{/* <div class="dropdown">
            <button class="dropbtn">Frozen Food</button>
    {/* Subcategory */}
            {/* <div class="dropdown-content">
                <div className="dropdown-content-item" onClick={() => filterItems('Frozen Vegetables')}>Frozen Vegetables</div>
                <div className="dropdown-content-item" onClick={() => filterItems('Frozen Fruits')}>Frozen Fruits</div>   
                <div className="dropdown-content-item" onClick={() => filterItems('Frozen Seafood')}>Frozen Seafood</div>       
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">Fresh Food</button>
            <div class="dropdown-content">
                <div className="dropdown-content-item" onClick={() => filterItems('Fresh Fruits')}>Fresh Fruits</div>
                <div className="dropdown-content-item" onClick={() => filterItems('Fresh Vegetables')}>Fresh Vegetables</div>   
                <div className="dropdown-content-item" onClick={() => filterItems('Fresh Seafood')}>Fresh Seafood</div>       
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">Beverages</button>
            <div class="dropdown-content">
                <div className="dropdown-content-item" onClick={() => filterItems('Milk')}>Milk</div>
                <div className="dropdown-content-item" onClick={() => filterItems('Coffee')}>Coffee</div>   
                <div className="dropdown-content-item" onClick={() => filterItems('Juices')}>Juices</div>   
                <div className="dropdown-content-item" onClick={() => filterItems('Energy drink')}>Energy drink</div>       
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">Home Health</button>
            <div class="dropdown-content">
                <div className="dropdown-content-item" onClick={() => filterItems('Vitamin')}>Vitamin</div>      
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">Pet Food</button>
            <div class="dropdown-content">
                <div className="dropdown-content-item" onClick={() => filterItems('Cat Food')}>Cat Food</div>
                <div className="dropdown-content-item" onClick={() => filterItems('Dog Food')}>Dog Food</div>
                <div className="dropdown-content-item" onClick={() => filterItems('Fish Food')}>Fish Food</div>         
            </div>
        </div> */}

export default CategoryBar;
