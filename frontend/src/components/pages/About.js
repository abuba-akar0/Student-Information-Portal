import React from 'react';

const About = () => {
    const containerStyle = {
        marginTop: "10em",
        color: "white",
        backgroundColor: "rgb(0, 30, 97)",
        padding: "20px",
        borderRadius: "8px",
        marginRight: "10%",
        marginLeft: "10%"
    };

    const hrStyle = {
        backgroundColor: "white",
        height: "1px",
        border: "none"
    };

    const textLightStyle = {
        color: "lightgray"
    };

    return (
        <div style={containerStyle}>
            <h1>About Page</h1>
            <hr style={hrStyle} />
            <p style={textLightStyle}>
                This is a simple web application that allows users to register and login. Once logged in, users can view the home page and the about page. This web application is built using Django for the backend and React for the frontend.
            </p>
        </div>
    );
}

export default About;