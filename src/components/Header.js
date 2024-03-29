import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { media, color } from 'styles/utils';
import { NavLink, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LanguageSelect from "components/LanguageSelect";
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";

import SiteTitle from './SiteTitle';

const Wrapper = styled.header`
  flex: 0 0 auto;
  padding: .5rem 1rem;
  background: #f3f3f3;
  z-index: 999999;

  .title {
    blo:right;
    font-size: 2rem;
    ${media.phone`
      font-size: 1rem;
    `}
    ${media.phablet`
      font-size: 1rem;
    `}
    ${media.desktop`
      font-size: 2rem;
    `}
    ${media.desktopHD`
      font-size: 2rem;
    `}
  }
  .logo-infoamazonia {
    height:41px;
    margin-right:0px;
    margin-bottom: 1rem;
    vertical-align: middle;
    ${media.phone`
      height:30px;
      margin-bottom: 0.4rem!important;
    `}
    ${media.phablet`
      height:30px;
      margin-bottom: 0.4rem!important;
    `}
    ${media.desktop`
      height:41px;
      margin-bottom: 0.6rem!important;
    `}
    ${media.desktopHD`
      height:41px;
      margin-bottom: 0.6rem!important;
    `}
  }
  .logo-raisg {
    margin-bottom: 1rem;
    vertical-align: middle;
    ${media.phone`
      height:30px;
      margin-bottom: 0.4rem!important;
    `}
    ${media.phablet`
      height:30px;
      margin-bottom: 0.4rem!important;
    `}
    ${media.desktop`
      height:41px;
      margin-bottom: 0.6rem!important;
    `}
    ${media.desktopHD`
      height:41px;
      margin-bottom: 0.6rem!important;
    `}
  }
  .logo-am {
    vertical-align: middle;
  }
  .header-content {
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin: 0 auto;
  }
  ${media.phablet`
    padding: 0.4rem 2rem 0.4rem 0.4rem;
    font-size: 1em;
  `}
  ${media.desktop`
    padding: 1.2vw 8vw;
  `}
  ${media.desktopHD`
    padding: 1.2vw 10vw;
  `}
  .site-title {
    flex: 1 1 100%;
    font-size: .6em;
  }
  img {
    width: auto;
    height: auto;
    max-height: 2vh;
    margin: 0 1rem;
    ${media.phablet`
    max-height: 15vh;
    max-width: 18vw;
    `}
    ${media.phone`
      max-height: 15vh;
      max-width: 18vw;
    `}
    ${media.desktop`
      margin: 0 2rem;
      max-height: 6vh;
    `}
    ${media.desktopHD`
      margin: 0 2rem;
      max-height: 6vh;
    `};
  }
  nav {
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: .8em;
    &.visited {
      color: #000;
    }
    a {
      position: relative;
      color: #999;
      margin-left: 1.5rem;
      transition: all .2s ease-in-out;
      ${media.desktop`
        margin-left: 1rem;
        background: #fff;
        width: 2em;
        height: 2em;
        padding: .3em;
        border-radius: 100%;
        line-height: 2em;
        text-align: center;
        font-size: 1em;
      `}
      &.active,
      &:hover,
      &:active,
      &:focus {
        color: #111;
      }
      &.active {
        transform: scale(1.3);
      }
      .icon-info {
        background: red;
        color: white;
        position: absolute;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        top: -.5rem;
        right: -.5rem;
        display: inline-block;
        text-decoration: none;
        font-size: .5em;
        border-radius: 100%;
        font-weight: 800;
      }
    }
  }
  .active-navlink {
    color: #000;
  }
`

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: true,
      windowWidth: window.innerWidth
    };
  }
  componentDidMount() {
    var mql = window.matchMedia("(orientation: portrait)");
    // If there are matches, we're in portrait
    if(mql.matches) {  
      // Portrait orientation
      this.setState({isLandscape:false})
    }
    
    // Add a media query change listener
    var scope = this
    mql.addListener(function(m) {
        if(m.matches) {
          scope.setState({isLandscape:false})
        }
        else {
          scope.setState({isLandscape:true})
        }
    });

    window.addEventListener("resize", this.checkResize.bind(this));
  }

  checkResize() {
    this.setState({windowWidth:window.innerWidth})
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkResize.bind(this));
  }

  render () {
    const { lastPath,aboutPath, sharePath,dataPath } = this.props;
    const url = process.env.SITE_URL || "";
    return (
      <Wrapper>
        <div className="header-content">
            <div className="site-title clearfix">
              <div style={{'display':'inline-block', 'cursor':'pointer'}}>
                {/* <a href={`${url}${location.pathname}`}> */}
                <NavLink activeClassName="active-navlink" to="/">
                  <h1 className="title">
                  <FormattedMessage
                    id="general.siteTitle3"
                    defaultMessage="Looted Amazon" />
                  </h1>
                </NavLink>
                {/* </a> */}
              </div>
              <div style={{'display':'inline-block'}}>
                <a href="https://infoamazonia.org/" target="_blank">
                  <img src={require("images/partners/infoamazonia-crop.png")} className="logo-infoamazonia" alt="INFOAMAZONIA" />
                </a>
                <a href="https://www.amazoniasocioambiental.org" target="_blank">
                  <img src={require("images/partners/avatar_r_cheio.png")} className="logo-raisg" alt="RAISG"/>
                </a>
              </div>
            </div>
          <nav>
          {
            aboutPath &&
            <NavLink to={aboutPath} title="Créditos">
              <span className="fa fa-info"></span>
            </NavLink>
          }
          {
            sharePath &&
            <NavLink to={sharePath} title="Compartilhe" style={{'marginRight':'20px'}}>
              <span className="fa fa-share-alt"></span>
            </NavLink>
          }
          {(this.state.windowWidth > 567) && 
            <LanguageSelect />
          }
          {/* {
            dataPath &&
            <NavLink to={dataPath} title="Dados">
              <span className="fa fa-database"></span>
            </NavLink>
          } */}
          </nav>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lastPath: state.context.lastPath,
    aboutPath: state.context.aboutPath,
    dataPath: state.context.dataPath,
    sharePath: state.context.sharePath
  };
};

export default connect(mapStateToProps, null)(Header);
