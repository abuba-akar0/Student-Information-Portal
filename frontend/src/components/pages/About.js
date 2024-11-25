import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About SIP</h1>
            <hr className="about-hr" />
            <div className="about-text">
                <h2>Welcome to the Student Information Portal</h2>
                <p1 className="about-paragraph">
                    Our platform is designed to provide students with comprehensive resources for career counseling, university search, and scholarship opportunities. We aim to empower students by offering the necessary tools and information to make informed decisions about their education and career paths.
                </p1>
                <h2>Our Mission</h2>
                <p1>
                    Our mission is to bridge the gap between students and educational opportunities. We strive to support students in achieving their academic and career goals through personalized guidance and access to valuable resources.
                </p1>
                <h2>Features</h2>
                <ul>
                    <li>Career Counseling: Personalized career advice and guidance.</li>
                    <li>University Search: Detailed information on universities worldwide.</li>
                    <li>Scholarship Search: Access to a wide range of scholarships.</li>
                    <li>Student Support: Resources and support for student success.</li>
                </ul>
                <h2>Our Team</h2>
                <p1>
                    Our team consists of experienced educators, career counselors, and technology experts dedicated to helping students achieve their academic and career goals. We are passionate about education and committed to providing the best possible service to our users.
                </p1>
                <h2>Contact Us</h2>
                <p1>
                    If you have any questions or need further assistance, please feel free to contact us. We are here to help you every step of the way.
                </p1>
            </div>
        </div>
    );
}

export default About;