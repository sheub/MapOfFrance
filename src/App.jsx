import React, { Component } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";

import CityInfo from "./city-info.jsx";
import PropTypes from "prop-types";

import MyDrawer from './myDrawer'

import "./App.css";


const styles = theme => ({
  root: {
    display: "flex"
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 0,
    padding: theme.spacing.unit * 0
  }
});

// var bounds = [
//   [12.179, 51.227], // Southwest coordinates
//   [12.6, 51.459] // Northeast coordinates
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: "",
      viewport: {
        mapboxApiAccessToken:
          "pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig",
        latitude: 46.2,
        longitude: 2.0,
        zoom: 5.4,
        bearing: 0
      },
      popupInfo: null,
    };
  }

  _onStyleChange = mapStyle => this.setState({ mapStyle });


  _onVisibilityChange(name, event) {
    const visibility = { ...this.state.visibility, [name]: event.target.checked };
    this.setState({ visibility });
    this._updateMapStyle({
      ...this.state,
      visibility
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    var drawerWidth = 8 * 7; //this.Drawer.theme.spacing.unit * 7;
    var height = 56;

    if (window.innerWidth > 600) {
      drawerWidth = 8 * 9; //this.Drawer.theme.spacing.unit * 9;
      height = 64;
    }

    //Detect orientation window (portrait/Landscape)
    if (window.innerHeight < window.innerWidth && window.innerWidth < 600) {
      height = 48;
    }

    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth - drawerWidth,
        height: this.props.height || window.innerHeight - height
      }
    });
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    if (popupInfo === null) {
      return null;
    }
    return (
      popupInfo[0] && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo
            layerId={popupInfo[0].layer.id}
            info={popupInfo[0].properties}
          />
        </Popup>
      )
    );
  }

  _onClick = event => {
    const { features, lngLat } = event;
    features.longitude = lngLat[0];
    features.latitude = lngLat[1];

    this.setState({ popupInfo: features });
    this._renderPopup();
    console.log(event);
  };

  state = {
    open: false
  };

  render() {
    const { viewport, mapStyle } = this.state;
    const { classes } = this.props;

    return <React.Fragment>
      <div className={classes.root}>
        <MyDrawer onChange={this._onStyleChange}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <ReactMapGL
            {...viewport}
            mapStyle={mapStyle}
            onViewportChange={this._updateViewport}
            onClick={this._onClick}
            mapboxApiAccessToken="pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig"
            maxZoom={14}>

            {this._renderPopup()}

          </ReactMapGL>
        </main>
      </div>
    </React.Fragment>;
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
