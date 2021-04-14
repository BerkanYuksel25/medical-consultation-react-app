import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  HeatMap,
} from "google-maps-react";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
};

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)",
];

const positions = [
  { lat: 37.782551, lng: -122.445368 },
  { lat: 37.782745, lng: -122.444586 },
  { lat: 37.782842, lng: -122.443688 },
  { lat: 37.782919, lng: -122.442815 },
  { lat: 37.782992, lng: -122.442112 },
  { lat: 37.7831, lng: -122.441461 },
  { lat: 37.783206, lng: -122.440829 },
  { lat: 37.783273, lng: -122.440324 },
  { lat: 37.783316, lng: -122.440023 },
  { lat: 37.783357, lng: -122.439794 },
  { lat: 37.783371, lng: -122.439687 },
  { lat: 37.783368, lng: -122.439666 },
  { lat: 37.783383, lng: -122.439594 },
  { lat: 37.783508, lng: -122.439525 },
  { lat: 37.783842, lng: -122.439591 },
  { lat: 37.784147, lng: -122.439668 },
];

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      currentLatLng: {
        lat: 0,
        lng: 0,
        zoom: 15,
      },
      clickedMarker: {
        lat: 0,
        lng: 0,
        zoom: 15,
      },
      open: false,
      readyMap: false,
      positions: [],
      finishPos: false,
      reportedCovidCases: [],
    };

    this.mapClicked = this.mapClicked.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation();
    }, 2000);

    setTimeout(() => {}, 2000);
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState((prevState) => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            readyMap: true,
          }));
        },
        function error(msg) {
          alert(msg);
          this.setState({ readyMap: true });
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Get current location error");
    }
  };

  mapClicked(mapProps, map, clickEvent) {
    console.log("CLICKEVENT", clickEvent.latLng.lat(), clickEvent.latLng.lng());
    this.setState({
      clickedMarker: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      },
    });
  }

  render() {
    return (
      <div>
        {this.state.readyMap ? (
          <Map
            google={this.props.google}
            zoom={this.state.zoom}
            style={mapStyles}
            initialCenter={{
              lat: this.state.currentLatLng.lat,
              lng: this.state.currentLatLng.lng,
            }}
            onClick={this.mapClicked}
          >
            <Marker
              label={"Current Location"}
              name={"Current Location"}
              position={this.state.currentLatLng}
            />

            <HeatMap
              gradient={gradient}
              opacity={0.3}
              positions={positions}
              radius={20}
            />
          </Map>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB9txFFascb8Jcj8qV6ET2mtXZtwqqzMiU",
  libraries: ["visualization"],
})(LocationPage);
