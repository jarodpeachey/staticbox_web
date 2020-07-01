import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from '../components/sections/Hero';
// import { ThemeContext } from '../components/theme';
import logo from '../images/logo.png';
import Row from '../components/grid/Row';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StylesProvider } from '../providers/StylesProvider';
import '../components/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faPuzzlePiece,
  faPalette,
  faCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { theme } from '../components/theme';
import Alert from '../components/Alert';
import SEO from '../components/SEO';
import image from '../images/main.png';

library.add(faBolt, faPuzzlePiece, faPalette, faCheck, faExclamationCircle);

const IndexPage = ({ data }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async (e) => {
    setSubmittedOnce(true);
    setError(false);
    if (regex.test(email)) {
      const res = await fetch('/.netlify/functions/signup', {
        method: 'post',
        body: JSON.stringify({
          email,
        }),
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log('data from function', data);
          setSubmitSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setSubmitError(true);
        });
    } else {
      setError(true);
    }
  };

  const onChange = (e) => {
    if (!regex.test(e.target.value) && submittedOnce) {
      setError(true);
    } else {
      setError(false);
    }
    setEmail(e.target.value);
  };

  return (
    <StylesProvider>
      <Hero />
      <SEO
        title='Staticbox - JAMstack Commenting System'
        description='A blazing-fast commenting system built for static websites. Fully customizable, fully static.'
        image={image}
      />
      <BackgroundWrap id='blur'>
        <div
          className='mobile block'
          style={{
            height: '150px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox='0 0 500 150'
            preserveAspectRatio='none'
            style={{ height: '100%', width: '100%' }}
          >
            <path
              d='M-9.31,100.16 C223.76,158.38 294.86,23.19 520.97,52.78 L500.00,150.00 L0.00,150.00 Z'
              style={{ stroke: 'none', fill: '#fff' }}
            ></path>
          </svg>
        </div>
        <div
          className='tablet block'
          style={{
            height: '150px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox='0 0 500 150'
            preserveAspectRatio='none'
            style={{ height: '100%', width: '100%' }}
          >
            <path
              d='M-13.11,93.25 C275.50,159.38 266.02,-5.42 518.58,54.77 L500.00,150.00 L0.00,150.00 Z'
              style={{ stroke: 'none', fill: '#fff' }}
            ></path>
          </svg>
        </div>
        <div
          className='desktop block'
          style={{
            height: '150px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox='0 0 500 150'
            preserveAspectRatio='none'
            style={{ height: '100%', width: '100%' }}
          >
            <path
              d='M-13.11,93.25 C244.89,173.19 262.38,-30.09 550.29,48.84 L500.00,150.00 L0.00,150.00 Z'
              style={{ stroke: 'none', fill: '#fff' }}
            ></path>
          </svg>
        </div>
      </BackgroundWrap>
      <div style={{ zIndex: 999, position: 'relative', background: 'white' }}>
        <div className='container' style={{ paddingTop: 0 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}
          >
            <img
              style={{
                width: 94,
              }}
              src={logo}
            />
            {/* <h1 style={{ fontFamily: 'Exo', fontWeight: '700', fontSize: 38, margin: 0, marginLeft: 12, marginTop: -3 }}>
              Staticbox
            </h1> */}
          </div>

          <Title>
            A blazing-fast commenting system, built for the JAMstack
          </Title>
          <p style={{ fontSize: 20 }}>
            The future of website development is the JAMstack. Static websites
            that are blazing fast, ultra-secure and dead-simple to manage. By
            connecting your site to a headless CMS and a hosting platform, you
            get a fully-functioning website at little to no cost.
          </p>
          <p style={{ fontSize: 20 }}>
            But there's never been a simple way to add dynamic comments to your
            site.
          </p>
          <p style={{ fontSize: 20 }}>Until now.</p>
          <br />
          <Row breakpoints={[769, 960]} spacing={[12]}>
            <div widths={[6, 4]}>
              <Info>
                <Icon>
                  <FontAwesomeIcon icon='puzzle-piece' />
                </Icon>
                <InfoTitle>Dead-Simple Setup</InfoTitle>
                <InfoDescription>
                  With Staticbox, you can set up comments on your site in just 5
                  minutes. Just create an account, grab your API key and you're
                  good to go!
                </InfoDescription>
              </Info>
            </div>
            <div widths={[6, 4]}>
              <Info>
                <Icon>
                  <FontAwesomeIcon icon='bolt' />
                </Icon>
                <InfoTitle>Blazing Fast</InfoTitle>
                <InfoDescription>
                  Staticbox takes advantage of serverless architecture and
                  static sites generators by loading your comments before you
                  deploy.
                </InfoDescription>
              </Info>
            </div>
            <div widths={[6, 4]}>
              <Info>
                <Icon>
                  <FontAwesomeIcon icon='palette' />
                </Icon>
                <InfoTitle>Fully Customizable</InfoTitle>
                <InfoDescription>
                  Integrate fully with your site by customizing every aspect of
                  the comments form, display, text and more; All with an
                  intuitive visual editor.
                </InfoDescription>
              </Info>
            </div>
          </Row>
          <br />

          <p>
            Not only does Staticbox offer moderation, custom filters, custom
            styles and more; it's also the first commenting system that's built
            specifically for static sites.
          </p>
          <p>What does that mean?</p>
          <p>
            Staticbox retrieves your comments when you build your site, meaning
            they're pre-loaded when a user visits your website. This means that
            loading your comments won't slow down your page or add ANY bloat,
            like with other commenting systems.
          </p>
        </div>
        <div style={{ background: `${theme.color.primary.main}10` }}>
          <div className='container'>
            <Container size='sm'>
              {!submitError && !submitSuccess ? (
                <>
                  <h2
                    style={{
                      fontSize: 40,
                      fontWeight: 600,
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    Get Notified
                  </h2>
                  <p style={{ textAlign: 'center' }}>
                    Sign up to get notified when Staticbox releases, and get a
                    lifetime discount!
                  </p>
                  <Container size='sm'>
                    <Row spacing={[8, 8]} breakpoints={[576, 800]}>
                      <div widths={[9, 10]}>
                        <Input
                          state={error ? 'error' : null}
                          color={error ? 'error' : 'primary'}
                          size='large'
                          fullWidth
                          placeholder='user@mail.com'
                          onChange={onChange}
                        />
                      </div>
                      <div widths={[3, 2]}>
                        <Button
                          onClick={onSubmit}
                          color='primary'
                          size='large'
                          fullWidth
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Container>
                </>
              ) : submitError ? (
                <Alert
                  color='error'
                  icon={<FontAwesomeIcon icon='exclamation-circle' />}
                >
                  Ah, snap! There was an error signing you up. If you'd still
                  like to subscribe, you can email me at jarodpeachey@gmail.com
                  and I'll add you manually.
                </Alert>
              ) : (
                <Alert color='success' icon={<FontAwesomeIcon icon='check' />}>
                  You've been successfully signed up! Check your email for a
                  confirmation link, and then you're good to go!
                </Alert>
              )}
            </Container>
          </div>
        </div>
      </div>
    </StylesProvider>
  );
};

const Info = styled.div`
  text-align: center;
  background: ${(props) => props.theme.color.primary.main}10;
  padding: 16px;
  padding-top: 26px;
`;
const Icon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 999px;
  * {
    font-size: 48px !important;
    margin: 0 auto !important;
    color: ${(props) => props.theme.color.primary.main} !important;
  }
`;
const InfoTitle = styled.h3`
  font-size: 24px;
`;
const InfoDescription = styled.p``;

const BackgroundWrap = styled.div`
  filter: drop-shadow(
    0 -16px 12px ${(props) => props.theme.color.primary.dark}10
  );
  display: block;
  width: 110%;
  z-index: 999;
  padding-left: 5%;
  padding-right: 5%;
  left: -5%;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 0 auto;
  @media (min-width: 769px) {
    font-size: 60px;
  }
  // font-family: 'overpass', sans-serif !important;
  font-weight: 700;
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
const Wrapper = styled.div``;

export const IndexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;
