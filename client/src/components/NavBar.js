import logo from "/Users/net/OnlineCarRentalSystem/client/src/components/assets/images/logo.png";
import CategoryBar from "/Users/net/OnlineCarRentalSystem/client/src/components/CategoryBar.js";
import categoryList from "/Users/net/OnlineCarRentalSystem/client/src/components/categoryList.js";

function NavBar({ toggleCartPopup, cartItems, setFilteredCars, cars }) {
    const handleLogoClick = () => {
        window.location.reload();
      };

    return (
        <>
            <nav className="navBar-container">
                <div className="navBar-container-brand">
                    <div className="navBar-container-item">
                        <img className="navBar-container-logo" src={logo} alt="Logo" onClick={handleLogoClick} />
                    </div>
                    <div className="navBar-container-item">
                        <CategoryBar categoryList={categoryList} setFilteredCars={setFilteredCars} cars={cars}/>
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
