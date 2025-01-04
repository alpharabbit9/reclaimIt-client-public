import img1 from '../assets/New folder/banner01.webp';
import img2 from '../assets/New folder/banner02.png';
import img3 from '../assets/New folder/banner04.png';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full">
                {/* Slide 1 */}
                <div id="item1" className="carousel-item relative w-full h-[700px]">
                    <img src={img1} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                        <h1 className="text-4xl font-bold mb-2">Welcome to Lost and Found</h1>
                        <p className="text-lg">Find what you’ve lost or reunite someone with their belongings.</p>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="item2" className="carousel-item relative w-full h-[700px]">
                    <img src={img2} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                        <h1 className="text-4xl font-bold mb-2">Your Trusted Lost and Found</h1>
                        <p className="text-lg">Helping you reconnect with what matters most.</p>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="item3" className="carousel-item relative w-full h-[700px]">
                    <img src={img3} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                        <h1 className="text-4xl font-bold mb-2">Lost Something? Found Something?</h1>
                        <p className="text-lg">Join our community to search or share lost items.</p>
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center gap-2 py-2 bg-gray-900">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>
    );
};

export default Banner;
