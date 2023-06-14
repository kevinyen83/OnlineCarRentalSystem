import logo from "/Users/net/car-rental-system/clint/src/components/assets/images/logo.png";
import CategoryBar from "/Users/net/car-rental-system/clint/src/components/CategoryBar.js";
import categoryList from "/Users/net/car-rental-system/clint/src/components/categoryList.js";

function NavBar ({toggleCartPopup, cartItems}) {
    return(
        <>
        <nav className="navBar-container">
        <div className="navBar-container-brand">
            <div className="navBar-container-item">
                <img className="navBar-container-logo" src={logo} alt="Logo"/>
            </div>
            <div className="navBar-container-item">
                <CategoryBar categoryList={categoryList} />
            </div>
            <div></div>
            <div></div>
            <div className="navBar-container-item">
                <div className="navBar-container-reservationBtn" onClick={toggleCartPopup}>Car Reservation ({cartItems.length})</div>
            </div>
        </div>
    </nav>
    </>
    )
}

export default NavBar;
