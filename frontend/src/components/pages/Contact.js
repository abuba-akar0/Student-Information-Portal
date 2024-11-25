import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Message: ", message
        );
    };

    const containerStyle = {
        marginTop: "80px",
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

    const formControlStyle = {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        marginBottom: "15px"
    };

    const buttonStyle = {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s"
    };

    return (
        <div style={containerStyle}>
            <h1>Contact Us</h1>
            <hr style={hrStyle} />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={textLightStyle}>
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={formControlStyle}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={textLightStyle}>
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={formControlStyle}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label" style={textLightStyle}>
                        Message
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={formControlStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Contact;