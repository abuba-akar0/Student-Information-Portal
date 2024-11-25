import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, Link } from "react-router-dom";
import "./Home.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  position: absolute;
  left: 10px;

  &:hover {
    background-color: #c0392b;
  }
`;

const NavBar = styled.nav`
  background-color: #444;
  padding: 1em;
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;
`;

const MainContent = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const WelcomeMessage = styled.h1`
  color: #61e861;
`;

const SectionTitle = styled.h3`
  color: #5ac0f4;
  margin-top: 20px;
`;

const ListGroup = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  color: #5ac0f4;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em;
`;

const ImageSlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
  top: 0;
  background-color: #02396a;
  padding: 20px;
  border-radius: 10px;
`;

const FadeImage = styled.img`
  width: 30%;
  height: auto;
  margin: 0 10px;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  opacity: ${({ currentIndex, index }) => (currentIndex === index ? 1 : 0.5)};
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 65%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

const NextButton = styled(ArrowButton)`
  right: 10px;
`;

const Home = () => {
  const [token, , removeToken] = useCookies(["loginToken"]);
  const [logUser, , removeLogUser] = useCookies(["username"]);
  const [user, setUser] = useState("");
  let history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!token["loginToken"]) {
      history.push("/login");
    } else {
      const username = logUser["username"];
      if (username) {
        setUser(username);
      }
    }
  }, [token, logUser, history]);

  const logoutBtn = () => {
    removeToken("loginToken");
    removeLogUser("username");
    history.push("/login");
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  return (
    <Container>
      <Header>
        <LogoutButton onClick={logoutBtn}>Logout</LogoutButton>
        <h1>Student Information Portal</h1>
      </Header>
      <NavBar>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/career-counseling">Career Counseling</NavLink>
        <NavLink to="/universities">University Search</NavLink>
        <NavLink to="/scholarships">Scholarship Search</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavBar>
      <Main>
        <MainContent>
          <WelcomeMessage>Welcome, {user}!</WelcomeMessage>
          <hr />

          <ImageSlider id="imageSlider">
            <FadeImage
              src="/img.png"
              alt="Career Counselling"
              currentIndex={currentIndex}
              index={0}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            />
            <FadeImage
              src="/img_1.png"
              alt="Student Help"
              currentIndex={currentIndex}
              index={1}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            />
            <FadeImage
              src="/img_2.png"
              alt="University Information"
              currentIndex={currentIndex}
              index={2}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            />
          </ImageSlider>
          <PrevButton onClick={prevSlide}>Prev </PrevButton>
          <NextButton onClick={nextSlide}>Next </NextButton>
          <SectionTitle>Our Services</SectionTitle>
          <ListGroup>
            <ListItem>Student Career Counselling</ListItem>
            <ListItem>Student Help and Support</ListItem>
            <ListItem>University and Scholarship Information</ListItem>
            <ListItem>Career Recommendations</ListItem>
          </ListGroup>

          {/* Statistics */}
          <SectionTitle>Statistics</SectionTitle>
          <div className="statistics-section">
            <div className="statistic">
              <h3>1000+</h3>
              <p>Scholarships Available</p>
            </div>
            <div className="statistic">
              <h3>500+</h3>
              <p>Universities Listed</p>
            </div>
          </div>
        </MainContent>
      </Main>
      <Footer>
        <p>&copy; 2024 Student Information Portal. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Home;