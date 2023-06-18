import React, { useState } from "react";

function CategoryBar({ categoryList, setFilteredCars, cars }) {
    const handleCategorySelecting = (categoryName, subcategory) => {
        const filtered = cars.filter((car) => car.subcategory === subcategory && car.category === categoryName);
        console.log(cars)
        console.log(subcategory)
        console.log(categoryName)
        console.log(categoryList)
        setFilteredCars(filtered);
        console.log(filtered)

    };

    return (
        <div className="flex-container">
            {categoryList.map((category, index) => (
                <div key={index}>
                    <div className="dropdown">
                        <button className="dropbtn">{category.categoryName}</button>
                        <div className="dropdown-content">
                            {category.subcategories.map((subcategory, subIndex) => (
                                <div
                                    className="dropdown-content-item"
                                    onClick={() => handleCategorySelecting(category.categoryName, subcategory)}
                                    key={subIndex}
                                >
                                    {subcategory}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryBar;
