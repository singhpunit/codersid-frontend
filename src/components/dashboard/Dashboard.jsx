import FirstImage from '../../assets/Dashboard1.png';
import SecondImage from '../../assets/Dashboard2.png';
import ThirdImage from '../../assets/Dashboard3.png';
import FourthImage from '../../assets/Dashboard4.png';
import FifthImage from '../../assets/Dashboard5.png';
import SixthImage from '../../assets/Dashboard6.png';
import SimpleImageSlider from "react-simple-image-slider";
import '../../styles/dashboard/dashboard.css';

const Dashboard = () => {
    const screenSize = window.innerWidth

    const images = [
        { url: SecondImage },
        { url: FirstImage },
        { url: ThirdImage },
        { url: FourthImage },
        { url: FifthImage },
        { url: SixthImage },
    ];
    return (
        <div className="card">
            <SimpleImageSlider
                width={screenSize === 393 ? "99%": "99%"}
                height={590}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
            />
        </div>
    );
}

export default Dashboard;
