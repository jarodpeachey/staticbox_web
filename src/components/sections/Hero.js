/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Button from '../Button';
import heroImage from '../../images/hero.png';
import heroImageTwo from '../../images/heroTwo.png';
import logo from '../../images/logo.png';
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
      <div id='blur'>
        <MainWrapper>
          <BackgroundImage heroImage={heroImageTwo} />
          <Container className='container'>
            <img style={{ marginBottom: 8, width: 120 }} src={logo} />
            <Title>Staticbox</Title>
            <SubTitle className='mb-6'>
              A blazing-fast commenting system built specifically for static
              sites. Say goodbye to page bloat.
            </SubTitle>
            <p>
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
              <span style={{marginTop: -1, display: 'block'}}>Get Updates</span>
            </Button>
          </Container>
          {/* </BackgroundImage> */}
        </MainWrapper>
      </div>
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
  height: calc(100%);
  width: 100%;
  opacity: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 769px) {
    background-position: right center;
  }
  transition-duration: 0.5s;
`;

const MainWrapper = styled.div`
  // padding-top: 64px;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 420px !important;
  margin: 0 auto;
  width: 100%;
  z-index: 1;
  text-align: center;
`;

const Container = styled.div`
  z-index: 1;
  margin-top: -200px;
  text-align: center;
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
