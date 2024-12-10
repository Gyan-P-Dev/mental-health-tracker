import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess }) => {
    const clientId = "411184488713-utuqr73a85rjvapot15klof4tf4vf3pf.apps.googleusercontent.com";

    const handleLoginSuccess = (response) => {
        const user = JSON.parse(atob(response.credential.split('.')[1])); 
        onSuccess(user);
        localStorage.setItem('userData', user);
    };

    const handleLoginFailure = () => {
        console.error('Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                    <p className="text-center text-gray-600 mb-6">Sign in with your Google account to continue.</p>
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            useOneTap
                            shape="pill"
                            text="signin_with"
                            size="large"
                            className="w-full bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600 transition duration-200"
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
