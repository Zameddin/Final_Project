import React, { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Contextpage from '../Contextpage';
import './Login.css'

function Login() {
    const {GoogleLogin} = useContext(Contextpage);
    return (
        <div className="login-container">
            <div className='login-button' onClick={GoogleLogin}>
                <FcGoogle className='login-google' />
                <h1 className='login-text'>Sign in with Google</h1>
            </div>
        </div>
    )
}
export default Login