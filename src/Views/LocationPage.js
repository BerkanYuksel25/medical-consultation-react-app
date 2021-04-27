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
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
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
      zoom:10,
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
    this.getCases();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation();
    }, 2000);

    setTimeout(() => {}, 2000);
  };

  getCases() {
    const req = new Request(
      "https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services/Current_Cases_by_State/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    );
    fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let features = data.features;
        let pos = [];

        {
          features.map((object, i) => {
            if (object["attributes"]["NAME"] == "New South Wales") {
              pos = object["geometry"]["rings"];

              return;
            }
          });
        }

        let posArrFormatted = [];

        {
          pos.map((arr, index) =>
            arr.map((location, index) =>
              posArrFormatted.push({
                lat: parseFloat(location[1]),
                lng: parseFloat(location[0]),
              })
            )
          );
        }

        this.setState({ positions: posArrFormatted });
        console.log(posArrFormatted);
      });
  }

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
              opacity={1}
              positions={this.state.positions}
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
