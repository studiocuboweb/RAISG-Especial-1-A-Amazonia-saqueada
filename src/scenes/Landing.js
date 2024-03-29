import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { resetContext } from "actions/context";
import { media, color } from "styles/utils";
import Countdown from "react-countdown-now";
import YouTube from "react-youtube";
import "styles/fullbg_video.css";

import SiteTitle from "components/SiteTitle";
import LanguageSelect from "components/LanguageSelect";

import { Link } from "react-router-dom";

const launchDate = process.env.LAUNCH_DATE;
//background-image: url(${require("images/bg_1.jpg")});
const Wrapper = styled.section`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  box-sizing: border-box;
  text-shadow: 0 0 2px #000;
  color: #fff;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:rgba(0, 0, 0, 0.7);;
    z-index: -1;
  }
  &.route-transition-enter {
    opacity: 1;
    background-color: transparent;
    .partners,
    .site-title {
      opacity: 0;
      transform: translate(0, -15px);
    }
    .middle {
      opacity: 0;
      transform: translate(0, 15px);
    }
    &:before,
    h2,
    h3,
    a {
      opacity: 0;
    }
  }
  &.route-transition-enter.route-transition-enter-active {
    opacity: 1;
    transition: all 250ms ease-in;
    z-index: 9999;
    background-color: #000;
    &:before,
    .partners,
    .site-title,
    .middle,
    h2,
    h3,
    a {
      opacity: 1;
      transform: translate(0, 0);
      transition: all 250ms ease-in;
    }
  }
  &.route-transition-exit {
    opacity: 1;
    background-color: #000;
    &:before,
    .partners,
    .site-title,
    .middle,
    h2,
    h3,
    a {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &.route-transition-exit.route-transition-exit-active {
    opacity: 1;
    transition: all 800ms ease-in;
    background-color: transparent;
    .partners,
    .site-title {
      opacity: 0;
      transform: translate(0, -15px);
      transition: all 250ms ease-in;
    }
    .middle {
      opacity: 0;
      transform: translate(0, 15px);
      transition: all 250ms ease-in;
    }
    &:before,
    h2,
    h3,
    a {
      opacity: 0;
      transition: all 250ms ease-in;
    }
  }
  #background-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
    z-index:-1;
  }
`;

const Top = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  .partners {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #fff;
    display: flex;
    flex-direction: columns;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: auto;
      max-height: 2vh;
      margin: 0 1rem;
      ${media.phone`
        max-height: 20vh;
        max-width: 23vw;
      `}
      ${media.phablet`
        max-height: 5vh;
        max-width: 8vw;
      `}
      ${media.desktop`
        margin: 0 2rem;
      `};
    }
  }
  h1 {
    font-size: 1.1em;
    color: #fff;
    .logo {
      margin-left: -1rem;
    }
    ${media.tablet`
      font-size: 1.2em;
    `} ${media.desktopHD`
      font-size: 1.6em;
    `};
  }
  h2 {
    white-space: nowrap;
    color: #fff;
    font-size: 0.8em;
    font-style: italic;
    font-weight: normal;
    border-top: 1px solid #fff;
    margin: 2rem 0 0;
    padding: 0.5rem 2rem;
    ${media.tablet`
      font-size: 1em;
    `} ${media.desktopHD`
      margin: 3rem 0 0;
    `};
  }
  h3 {
    font-size: 0.6em;
    font-style: italic;
    font-weight: normal;
    ${"" /* color: rgba(255,255,255,0.8); */};
  }
`;

const Spacer = styled.div`
  flex: 1 1 25%;
`;

const Middle = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  color: #fff;
  padding: 0;
  box-sizing: border-box;
  width: 95%;
  text-align: center;
  font-size: 0.8em;
  font-family: "Playfair Display";
  ${media.phablet`
    width: 65%;
    padding: 0 3rem;
    font-size: 1em;
  `}
  .description {
    text-align: center;
    margin: 0 0 2rem;
    font-size: 1em;
    ${media.desktopHD`
      font-size: 1.2em;
    `};
  }
  .countdown {
    display: inline-block;
    background: #333;
    color: #f0f0f0;
    text-shadow: 0 0 0;
    padding: 1rem 2rem;
    font-size: 0.6em;
    span {
      display: block;
    }
    .count {
      font-family: monospace;
      font-size: 2em;
    }
  }
  a {
    font-family: "Cinzel";
    font-size: 0.5em;
    letter-spacing: 0.1rem;
    display: inline-block;
    color: #fff;
    border: 1px solid #fff;
    text-align: center;
    margin: -1px -1px 0 0;
    padding: 0.75rem 1rem;
    font-weight: 600;
    width: 210px;
    text-transform: uppercase;
  }
  .language-padding {
    margin-bottom:2.5rem
  }
  @media screen and ( max-height: 1000px ) {
    .language-padding {
      margin-bottom:4.5rem
    }
  }
`;

class Scene extends Component {
  constructor(props) {
    super(props);
  }
  isLaunchDate() {
    if (launchDate) {
      return moment(launchDate).isAfter(window.currentDate);
    } else {
      return false;
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.mute();
  }
  
  _onEnd(event) {
    event.target.playVideo();
  }
  render() {
    const { lastPath, resetContext } = this.props;
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0
      }
    };
    return (
      <Wrapper className="scene landing">
        <Top>
          <div className="partners">
            <img src={require("images/partners/infoamazonia.png")} />
            <img src={require("images/partners/raisg-branco.png")} /> 
          </div>
          <SiteTitle />
          <h2>
            <FormattedMessage
              id="general.author"
              defaultMessage="-"
            />
          </h2>
          <h3>
            <FormattedMessage
              id="general.publishDate"
              defaultMessage="10th December 2018"
            />
          </h3>
        </Top>
        <Spacer />
        <Middle className="middle">
          <p className="description">
            <FormattedMessage
              id="general.tagline"
              defaultMessage="New survey reveals the existence of more than 2000 points and 200 illegal mining areas in six Amazonian countries."
            />
          </p>
          <div class='language-padding'>
            <LanguageSelect />
          </div>
          {this.isLaunchDate() ? (
            <span className="countdown">
              <span className="count">
                <Countdown
                  date={launchDate}
                  onComplete={() => location.reload()}
                />
              </span>
              <span className="desc">
                <FormattedMessage
                  id="general.publishRemaining"
                  defaultMessage="remaining for launch"
                />
              </span>
            </span>
          ) : (
            <div>
              {lastPath ? (
                <div>
                  <Link to="/story" onClick={resetContext}>
                    <FormattedMessage
                      id="general.startOver"
                      defaultMessage="Start Over"
                    />
                  </Link>
                  <Link to={lastPath}>
                    <FormattedMessage
                      id="general.continueReading"
                      defaultMessage="Continue Reading"
                    />
                  </Link>
                </div>
              ) : (
                <Link to="/story">
                  <FormattedMessage
                    id="general.readStory"
                    defaultMessage="Read the Story"
                  />
                </Link>
              )}
            </div>
          )}
        </Middle>
        <video autoPlay muted loop id="background-video">
          <source src={require("images/video_bg.mp4")} type="video/mp4" />
        </video>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lastPath: state.context.lastPath
  };
};

const mapDispatchToProps = {
  resetContext
};

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
