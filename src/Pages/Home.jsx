import React from 'react';
import Banner from '../Components/Banner';
import RecentlyLostItems from '../Components/RecentlyLostItems';
import Categories from '../Components/Categories';
import Statistics from '../Components/Statistics';
import LatestFindAndLostItems from '../Components/LatestFindAndLostItems';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestFindAndLostItems></LatestFindAndLostItems>
            <RecentlyLostItems></RecentlyLostItems>
            <Categories></Categories>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;