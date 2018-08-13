import React, { Component } from "react";
import MapGL, { MapEvents, Popup } from "react-map-gl-alt";
import MAP_STYLE from "./mbstyle/style.json";
import { fromJS } from 'immutable';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CityInfo from "./PopupInfo";
import MyDrawer from "./myDrawer";

import "./App.css";

const defaultMapStyle = fromJS(MAP_STYLE);

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

var bounds = [
  [-10, 39], // Southwest coordinates
  [14, 54] // Northeast coordinates
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: { defaultMapStyle },
      // loaded: true,
      viewport: {
        mapboxApiAccessToken: "pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig",
        center: [2, 46.5],
        latitude: 46.5,
        longitude: 2.0,
        zoom: 4.5,
        bearing: 0
      },

      popupInfo: null,
      // Holds visible airport features for filtering
      airports: [],

    };
    this._updateViewport = this._updateViewport.bind(this);

  }

  _onStyleChange = mapStyle => this.setState({ mapStyle });

  componentDidMount() {
    window.addEventListener("resize", this._resize, { passive: true });
    //window.addEventListener("resize", this._resize);
    this.setState({
      filterEl: document.getElementById("feature-filter"),
      listingEl: document.getElementById("feature-listing")
    });

    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    var drawerWidth = 1;
    var height = 56;

    if (window.innerWidth > 600) {
      //drawerWidth = 8 * 9; //this.Drawer.theme.spacing.unit * 9;
      height = 64;
      //Detect orientation window (portrait/Landscape)
    } else if (window.innerHeight < window.innerWidth) {
      height = 48;
    }

    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth - drawerWidth,
        height: window.innerHeight - height
      },
      mapWidth: window.innerWidth - drawerWidth,
      mapHeight: window.innerHeight - height
    });
    console.log(this.state.mapWidth);
    console.log(this.state.viewport.width);

  };

  _updateViewport(viewport) { this.setState({ viewport }); }
  // _updateViewport = viewport => {this.setState({ viewport });};

  _renderPopup(event) {
    const { popupInfo } = this.state;

    if (popupInfo === null || event === null) {
      return null;
    } else {
      const { lngLat } = event;
      return (
        popupInfo[0] && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={lngLat[0]}
            latitude={lngLat[1]}
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
  }

  _onClick = event => {
    // const features = event.target.queryRenderedFeatures(event.point);
    // TODO CHeck features[0]
    // this.setState({ popupInfo: features[0] });
    // this._renderPopup(event);
  };

  mapMoveEnd(event) {
    //const visibility  = {this.state.visibility};
    var features = event.target.queryRenderedFeatures({ layers: ['villages-frenchcorrected-3gqhy6'] });

    if (features) {
      var { filterEl } = this.state;
      var uniqueFeatures = this.getUniqueFeatures(features, "iata_code");
      // Populate features for the listing overlay.
      this.renderListings(uniqueFeatures);

      // Clear the input container
      filterEl.value = "";

      // Store the current features in sn `airports` variable to
      // later use for filtering on `keyup`.
      this.setState({ airports: uniqueFeatures });
    }
  }

  mapMouseMove(e) {
    // Change the cursor style as a UI indicator.
    // map.getCanvas().style.cursor = 'pointer';
    // Populate the popup and set its coordinates based on the feature.
    // var feature = e.features[0];
    // popup.setLngLat(feature.geometry.coordinates)
    //     .setText(feature.properties.name + ' (' + feature.properties.abbrev + ')')
    //     .addTo(map);
  }

  state = {
    open: false
  };
  render() {
    const { viewport, mapStyle, mapWidth, mapHeight } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MyDrawer onChange={this._onStyleChange} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <MapGL
              {...viewport}
              mapStyle={mapStyle}
              mapboxApiAccessToken="pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig"
              style={{
                // display: "flex",
                // flex: 1,
                width: mapWidth,
                height: mapHeight
              }}
              maxZoom={14}
              maxBounds={bounds}
              //onChangeViewport={this._updateViewport}
              onChangeViewport={(viewport) => this.setState({ viewport })}
              trackResizeContainerDisabled={false}

            >
              {/* {this._renderPopup(null)} */}

              <MapEvents
                // onLoad={() => {
                //   this.setState({ loaded: true });
                // }}
                // onError={console.error}
                // onMove={this.mapMoveEnd}
                // onMoveEnd={this.mapMoveEnd.bind(this)}
                // onMouseMove={this.mapMouseMove}
                // onMouseLeave={this.mapMouseLeave}
                onClick={this._onClick}
              />
            </MapGL>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
