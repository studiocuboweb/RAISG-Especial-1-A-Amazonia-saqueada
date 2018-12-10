/* global window */
import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
//import MAP_STYLE from './style.json';
// import MAP_STYLE from './mapbox/styles/map1.json';
import {fromJS} from 'immutable';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import LegendMap from './mapbox/LegendMap';
import Fullscreenable from 'react-fullscreenable';
// import Map1_2 from './mapbox/LegendMap2';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaW5mb2FtYXpvbmlhIiwiYSI6InItajRmMGsifQ.JnRnLDiUXSEpgn7bPDzp7g'; // Set your mapbox token here

class MapBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapStyle: '',
      updated: true,
      viewport: {
        width: this.props.containerWidth,
        height: this.props.containerHeight,
        latitude: this.props.coordinates[1],
        longitude: this.props.coordinates[0],   
        minZoom: this.props.zoomMin,
        maxZoom: this.props.zoomMax,   
        zoom: this.props.zoomNumber
      }
    }
  }

  _onViewportChange = viewport => {
    this.setState({viewport});
  }

  //_onViewportChange = viewport => this.setState({viewport});
  _onStyleChange = mapStyle => {  
    this.setState({mapStyle});
  };
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    //if (nextProps.update !== this.props.update) {
      if ((this.props.isFullscreen !== nextProps.isFullscreen) || (nextProps.update !== this.props.update)) {
        if (nextProps.isFullscreen || nextProps.update !== this.props.update) {
          //setTimeout(function(){this.setState({updated:false})}.bind(this),100)
          console.log('nextProps.update !== this.props.update')
          //console.log(window.innerWidth);
          this.setState({updated:false})
          setTimeout(
            function() {
              this.setState(
                {
                  mapStyle: '',
                  updated:true,
                  viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    latitude: this.props.coordinates[1],
                    longitude: this.props.coordinates[0],   
                    minZoom: this.props.zoomMin,
                    maxZoom: this.props.zoomMax,   
                    zoom: this.props.zoomNumber
                  }
                })
            }
            .bind(this),
            100
          )
        }
      }
    //}
  }
  render() {
    const {viewport, mapStyle, updated} = this.state;
    return (
      <div>
        <button style={{position:"absolute", right: 0,cursor: 'pointer',color:'rgb(192, 192, 192)',display: 'block',padding:'0.3rem',border: 0,zIndex:9999,backgroundColor:"#ffffff"}} className="fa fa-arrows-alt" onClick={this.props.toggleFullscreen}></button>
      {
        updated &&
          <ReactMapGL
            {...viewport}
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            //mapStyle={defaultMapStyle}
            mapboxApiAccessToken={MAPBOX_TOKEN} >
            <LegendMap mapStyle='' map={this.props.map} showExtraLayers={this.props.showExtraLayers} containerComponent={this.props.containerComponent} 
            legend={this.props.legend} key={this.props.update} onChange={this._onStyleChange} />
          </ReactMapGL>
      }
      </div>
    );
  }
}


// MapBox.defaultProps = {
//   width: 400,
//   height: 400
// }

MapBox.propTypes = {
    isFullscreen: PropTypes.bool,
    toggleFullscreen: PropTypes.func,
    viewportDimensions: PropTypes.object
};

//const FullscreenableMyMap = Fullscreenable()(MapBox);
const FullscreenableMyMap = Dimensions({elementResize: false})(Fullscreenable()(MapBox));

export default FullscreenableMyMap;

// export default 