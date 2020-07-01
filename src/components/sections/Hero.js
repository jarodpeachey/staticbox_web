/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Button from '../Button';
import heroImage from '../../images/hero.png';
import heroImageTwo from '../../images/heroTwo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Hero = ({ children }) => {
  const [scrollValue, setScrollValue] = useState(0);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setScrollValue(window.scrollY);
  //   });
  // });

  return (
    <span>
      {/* // <StaticQuery */}
      {/* query={graphql`
        query {
          desktop: file(relativePath: { eq: "hero_image.jpeg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 4160) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      `}
      render={(data) => {
    Extract imageData.
    const imageData = data.desktop.childImageSharp.fluid; */}
      {/* return ( */}
      {/* <div
        style={{
          backgroundImage: `url(${heroImage})`,
          position: 'absolute',
          top: 0,
          zIndex: -5,
          height: '100vh',
          width: '100%',
          opacity: 1,
          backgroundRepeat: 'repeat',
        }}
      /> */}

      <MainWrapper>
        <BackgroundImage heroImage={heroImageTwo} />
        <Container className='container'>
          {/* <p>
              Staticbox will be released soon! Get notified by following us on
              Twitter.
            </p>
            <br />
            <Button
              center
              size='large'
              color='primary'
              link='https://twitter.com/staticbox_io'
              external
              className='center mt-none'
              customStyles={`display: flex; align-items: center; height: fit-content;`}
            >
              <FontAwesomeIcon
                style={{
                  fontSize: 28,
                  marginRight: 16,
                  position: 'relative',
                  top: 0,
                }}
                icon={['fab', 'twitter']}
              />
              <span style={{ marginTop: -1, display: 'block' }}>
                Get Updates
              </span>
            </Button> */}
        </Container>
        {/* </BackgroundImage> */}
      </MainWrapper>
      {/* // ); */}
      {/* // }} */}
      {/* // /> */}
    </span>
  );
};

const BackgroundImage = styled.div`
  background-image: url(${(props) => props.heroImage});
  position: absolute;
  z-index: 0;
  height: 100vh;
  width: 100%;
  opacity: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 769px) {
    background-position: right top;
  }
  transform: rotate(180deg);
  transition-duration: 0.5s;
  top: 0;
  ::after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    background: linear-gradient(#ffffff00 70%, #ffffff00 100%);
    // filter: grayscale(1);
    backdrop-filter: contrast(1) hue-rotate(-6deg);
    top: 0;
  }
`;

const MainWrapper = styled.div`
  // padding-top: 64px;
  display: flex;
  position: relative;
  align-items: center;
  height: fit-content;
  height: 18vh;
`;

const Container = styled.div`
  z-index: 1;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 0;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 0 auto;
  @media (min-width: 769px) {
    font-size: 64px;
  }
  font-family: Exo;
  // font-family: 'overpass', sans-serif !important;
  margin-bottom: ${(props) => props.theme.spacing.five}px;
`;

const SubTitle = styled.div`
  // color: rgba(81, 160, 249, 0.4);
  font-size: 30px !important;
  font-weight: 400 !important;
  margin-bottom: ${(props) => props.theme.spacing.five}px;
  color: ${(props) => props.theme.color.primary.backgroundDark}cc !important;
  margin: 0 auto;
  max-width: 700px;
`;

const ButtonFlex = styled.div`
  margin: 0 -8px;
  @media (min-width: 520px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  padding-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  padding: 8px !important;
  button {
    margin: 0 !important;
  }
`;

export default Hero;
