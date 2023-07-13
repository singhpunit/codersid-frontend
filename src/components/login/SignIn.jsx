import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { login } from '../../postdata/postdata';
import CodersIDLogo from '../../assets/CodersidLogo.png';
import LoginImageBackground from '../../assets/LoginImageBackground.png';
import LoginImage from '../../assets/LoginImage.png';
import EmailIcon from '../../assets/EmailIcon.png';
import PasswordIcon from '../../assets/PasswordIcon.png';
import LaptopLogo from '../../assets/LaptopLogo.png';
import { Blocks } from 'react-loader-spinner'
import '../../styles/login/signin.css';

const SignIn = () => {
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const handleChange = (event) => {
        setLogindata({
            ...logindata,
            [event.target.name]: event.target.value
        })
    }


    const handleLogin = (event) => {
        event.preventDefault();
        login(logindata)
            .then((response) => {
                if (response.data.role === 'admin') {
                    setLoader(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    setTimeout(() => {
                        navigate('/dashboard');
                        setLoader(false)
                        window.location.reload(false);
                    }, 200)
                }
                else {
                    setLoader(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    setTimeout(() => {
                        navigate('/dashboard');
                        setLoader(false)
                        window.location.reload(false);
                    }, 200)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })

    }

    return (
        <div>
            {loader ? <div className='text-center'><Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            /></div> : null}

            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <img className='siginlogo' src={CodersIDLogo} alt="CodersIDLogo" />
                        <div className='signin-container'>
                            <div className="signin-box">
                                <p className='member-login-text'>Member Login</p>
                                <p className='member-login-sub-text'>Fill out the form below to
                                    <span className='login-text'>login</span>
                                </p>
                                <form onSubmit={handleLogin}>
                                    <div className='signin-login-box'>
                                        <div className="d-flex">
                                            <input type="email" name='email' className='ps-3 sigin-input-box' placeholder='Email' required
                                                onChange={handleChange} />
                                            <img className='signin-email-icon' src={EmailIcon} alt="EmailIcon" />
                                        </div>
                                        <div className="signin-horizontal-line"></div>
                                        <div className="d-flex">
                                            <input type="password" name='password' className='ps-3 sigin-input-box' placeholder='Password' required
                                                onChange={handleChange} />
                                            <img className='signin-password-icon' src={PasswordIcon} alt="PasswordIcon" />
                                        </div>
                                    </div>
                                    <button className='signin-button' type='submit'>
                                        <p className='signin-button-text'>Login</p>
                                    </button>
                                </form>
                                <div className="d-flex">
                                    <input className='signin-checkbox' type="checkbox" name='RememberMe' />
                                    <p className='signin-remember-me'>Remember me</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <img className='signin-background-image' src={LoginImageBackground} alt="LoginImageBackground" />
                        <img className='signin-background-image' src={LoginImage} alt="LoginImage" />
                        <img className='signin-laptop-logo' src={LaptopLogo} alt="LaptopLogo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;