import React from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import animationData from '../../../assets/animations/error.json'; // Replace with your Lottie file path
import './ErrorPage.css';
import Button from "../../common/Button/Button";

function ErrorPage({ title = "Oops! Something went wrong.", message = "We couldn't find the page you were looking for.", lottieData = animationData }) {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-lottie">
                <Lottie animationData={lottieData} loop={true} style={{ width: '150px', height: '150px' }} />
            </div>

            <h1 className="error-title">{title}</h1>
            <p className="error-message">{message}</p>
            <Button
                onClick={() => navigate(-1)}
                variant={"primary"}>
                <i className="bi bi-arrow-left"></i>
                Go Back
            </Button>
            <p className="error-suggestion">If the issue persists, please contact support.</p>
        </div>
    );
}

export default ErrorPage;
