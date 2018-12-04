import React, { Component } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import axios from "axios";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const defaultMapOptions = {
  fullscreenControl: false,
  disableDefaultUI: true,
  styles: [
    {
      stylers: [
        {
          hue: "#007fff"
        },
        {
          saturation: 89
        }
      ]
    },
    {
      featureType: "water",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ]
};

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCE_A8CoQsymuTUwtLLdwt4IyIBBhGsu3Q&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{
          width: "100%",
          marginLeft: 0
        }}
      />
    ),
    mapElement: (
      <div
        className="hitchyMapComponent"
        style={{
          height: 520,
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          padding: 0
        }}
      />
    )
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultOptions={defaultMapOptions}
    ref={map => (this._map = map)}
    /*onDragEnd={map => {
      props.getMapCoords(this._map);
    }}*/
    center={{ lat: props.lat, lng: props.lng }}
  >
    {!props.hideSearchBox && (
      <SearchBox
        ref={searchBox => (this._searchBox = searchBox)}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={map => {
          props.changeStateCoords(
            this._searchBox.getPlaces()[0].geometry.location.lat(),
            this._searchBox.getPlaces()[0].geometry.location.lng()
          );
        }}
      >
        <input
          type="text"
          placeholder="Szukaj w ..."
          style={{
            boxSizing: `border-box`,
            border: `1px solid #e3e6e8`,
            width: `60%`,
            maxWidth: "400px",
            height: `40px`,
            margin: `10px auto 0 auto`,
            padding: `10px`,
            borderRadius: `8px`,
            boxShadow: `0 0 15px rgba(0, 0, 0, 0.22)`,
            fontSize: `12px`,
            outline: `none`,
            fontWeight: "300"
          }}
        />
      </SearchBox>
    )}
    {props.latCenter &&
      props.lngCenter && (
        <Marker
          position={{
            lat: Number(props.latCenter),
            lng: Number(props.lngCenter)
          }}
        />
      )}

    {props.secondLatCenter &&
      props.secondLngCenter && (
        <Marker
          position={{
            lat: Number(props.secondLatCenter),
            lng: Number(props.secondLngCenter)
          }}
        />
      )}

    {props.markersData &&
      props.markersData.map((singleMarker, i) => {
        console.log(singleMarker);
        return (
          <Marker
            key={i}
            position={{
              lat: Number(singleMarker.position[0]),
              lng: Number(singleMarker.position[1])
            }}
            ref={marker => (this._marker = marker)}
            onClick={() => {
              props.toggleLocationsActive(i);
              // this.setCurrentLocation(location.latitude, location.longitude);
            }}
          >
            {i === props.activeKey && (
              <InfoWindow>
                <div>{singleMarker.text}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
  </GoogleMap>
));

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.latCenter ? this.props.latCenter : 52.22977,
      lng: this.props.lngCenter ? this.props.lngCenter : 21.01178,
      markersData: [],
      activeKey: ""
    };

    this.changeStateCoords = this.changeStateCoords.bind(this);
    this.loadPoints = this.loadPoints.bind(this);
    this.toggleLocationsActive = this.toggleLocationsActive.bind(this);
  }

  toggleLocationsActive(locationKey) {
    this.setState({
      activeKey: locationKey
    });
  }

  async changeStateCoords(lat, lng) {
    await this.setState({ lat: lat, lng: lng });
    await this.loadPoints(lat, lng);
  }

  async loadPoints(lat, lng) {
    let response;
    let lattitude = "";
    let longitude = "";

    if (!lat && !lng) {
      lattitude = this.state.lat;
      longitude = this.state.lng;
    } else {
      lattitude = lat;
      longitude = lng;
    }

    try {
      response = await axios.get(
        `/getPointsNearCoords/${lattitude}/${longitude}`,
        {
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
        }
      );
    } catch (err) {
      console.log(err);
    }

    console.log(response.data);

    //await this.setState({ markersList: response.data.location });
  }

  async componentDidMount() {
    await this.loadPoints(this.state.lat, this.state.lng);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.centerCoord !== this.props.centerCoord) {
      this.setState({
        lat: Number(nextProps.centerCoord[0]),
        lng: Number(nextProps.centerCoord[1])
      });
    }
  }

  render() {
    return (
      <div>
        <MyMapComponent
          lat={this.state.lat}
          lng={this.state.lng}
          changeStateCoords={this.changeStateCoords}
          markersData={this.props.markersData}
          activeKey={this.state.activeKey}
          toggleLocationsActive={this.toggleLocationsActive}
          latCenter={this.props.latCenter}
          lngCenter={this.props.lngCenter}
          secondLatCenter={this.props.secondLatCenter}
          secondLngCenter={this.props.secondLngCenter}
          hideSearchBox={this.props.hideSearchBox}
        />
      </div>
    );
  }
}
