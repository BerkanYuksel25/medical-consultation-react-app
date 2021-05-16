import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  HeatMap,
  Circle
} from "google-maps-react";
import { Typography, CircularProgress } from "@material-ui/core";

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

const headerStyles = {
  marginLeft: "10px",
};

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
      zoom: 10,
      open: false,
      readyMap: false,
      positions: [],
      finishPos: false,
      reportedCovidCases: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      covidClinicLocations: [],
    };

    this.mapClicked = this.mapClicked.bind(this);
    this.getCases = this.getCases.bind(this);
    this.getCovidClinicsCases = this.getCovidClinicsCases.bind(this);
  }

  componentDidMount() {
    this.getCases();
    this.getCovidClinicsCases();
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation();
    }, 2000);
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

  getCovidClinicsCases() {
    const req = new Request(
      "https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=85da884f-a9f5-4cb3-95e8-d6b81b0d2e3a&q=New_South_Wales"
    );
    fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("clinics", data.result.records);
        this.setState({ covidClinicLocations: data.result.records });
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

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  onMarkerClick = (props, marker) => {
    console.log("Marker Click", props )
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };

  render() {
    return (
      <div>
        <h2 style={headerStyles}>
          Here are the nearby COVID testing clinics near your location:
        </h2>
        {this.state.readyMap ? (
          <Map
            google={this.props.google}
            zoom={this.state.zoom}
            style={mapStyles}
            initialCenter={{
              lat: this.state.currentLatLng.lat,
              lng: this.state.currentLatLng.lng,
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              label={"Current Location"}
              name={"Current Location"}
              position={this.state.currentLatLng}
            />
            <Circle
              radius={2200}
              center={this.state.currentLatLng}
              onMouseover={() => console.log('mouseover')}
              onClick={() => console.log('click')}
              onMouseout={() => console.log('mouseout')}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            />
            <Marker
              onClick={this.onMarkerClick}
              title={"University of Technology Sydney"}
              name={"University of Technology Sydney"}
              position={{ lat: -33.8832, lng: 151.2005 }}
            />
            <Marker
              onClick={this.onMarkerClick}
              title={"John Hunter Hospital"}
              name={"John Hunter Hospital"}
              position={{ lat: -32.9217, lng: 151.6925 }}
            />
            <Marker
              onClick={this.onMarkerClick}
              title={"Royal Prince Alfred Hospital"}
              name={"Royal Prince Alfred Hospital"}
              position={{ lat: -33.8893, lng: 151.1831 }}
            />
            {/* <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <Typography variant="body1" component="p">
                  {this.state.selectedPlace.name}
                </Typography>
              </div>
            </InfoWindow> */}

            <HeatMap
              gradient={gradient}
              opacity={1}
              positions={this.state.positions}
              radius={20}
            />

            {this.state.covidClinicLocations.map((marker, i) => {
              return (
                <Marker
                  id={i}
                  name={marker.title}
                  position={{ lat: marker.Latitude, lng: marker.Longitude }}
                  onClick={this.onMarkerClick}
                ></Marker>
              );
            })}

            <InfoWindow
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h5>{this.state.selectedPlace.name}</h5>
              </div>
            </InfoWindow>
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
