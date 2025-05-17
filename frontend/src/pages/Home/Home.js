import React from "react";
import DiscoverContainer from "./components/DiscoverContainer";
import Footer from "./components/Footer";import GenersContainer from "./components/GenersContainer";
import UserReviews from "./components/UserReviews";



const Home = props =>{
    document.title =  `Freelance` 
    return <div >


        <DiscoverContainer />
        <GenersContainer />
         <UserReviews />
        {/* <hr style={{color:'#D3DEDC', opacity:0.4}} /> */}

        <Footer />

    </div>
}


export default Home