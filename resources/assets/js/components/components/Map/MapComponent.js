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
    defaultZoom={props.mapZoom}
    defaultOptions={defaultMapOptions}
    ref={map => (this._map = map)}
    center={{ lat: Number(props.lat), lng: Number(props.lng) }}
  >
    {props.showSearchBox && (
      <SearchBox
        ref={searchBox => (this._searchBox = searchBox)}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={map => {
          props.changeStateCoords(
            this._searchBox.getPlaces()[0].geometry.location.lat(),
            this._searchBox.getPlaces()[0].geometry.location.lng()
          );
          //console.log(this._searchBox.getPlaces()[0].geometry.location.lat());
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
    {props.latCenter && props.lngCenter && props.allowDragableMarker ? (
      <Marker
        draggable={true}
        position={{
          lat: Number(props.latCenter),
          lng: Number(props.lngCenter)
        }}
        key="addNewMeetingStart"
        ref={marker1 => (this._marker1 = marker1)}
        onDragEnd={() => {
          props.setNewCoords(
            this._marker1.getPosition().lat(),
            this._marker1.getPosition().lng()
          );
          // console.log(this._marker1.getPosition().lat());
        }}
      />
    ) : (
      <Marker
        draggable={false}
        position={{
          lat: Number(props.latCenter),
          lng: Number(props.lngCenter)
        }}
      />
    )}

    {props.secondLatCenter &&
    props.secondLngCenter &&
    props.allowDragableSecondMarker ? (
      <Marker
        draggable={true}
        position={{
          lat: Number(props.secondLatCenter),
          lng: Number(props.secondLngCenter)
        }}
        key="addNewMeetingStop"
        ref={marker2 => (this._marker2 = marker2)}
        onDragEnd={() => {
          props.setNewSecondCoords(
            this._marker2.getPosition().lat(),
            this._marker2.getPosition().lng()
          );
        }}
      />
    ) : (
      <Marker
        position={{
          lat: Number(props.secondLatCenter),
          lng: Number(props.secondLngCenter)
        }}
      />
    )}

    {props.markersData &&
      props.markersData.map((singleMarker, i) => {
        //console.log(singleMarker);
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
    let lattitude = "";
    let longitude = "";

    if (!lat && !lng) {
      lattitude = this.state.lat;
      longitude = this.state.lng;
    } else {
      lattitude = lat;
      longitude = lng;
    }

    console.log([lattitude, longitude]);

    this.props.setNewCenterCoords(lattitude, longitude, true);
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
          showSearchBox={this.props.showSearchBox}
          allowDragableMarker={this.props.allowDragableMarker}
          allowDragableSecondMarker={this.props.allowDragableSecondMarker}
          setNewCoords={this.props.setNewCoords}
          setNewSecondCoords={this.props.setNewSecondCoords}
          displayFirstMarker={this.props.displayFirstMarker}
          displaySecondMarker={this.props.displaySecondMarker}
          mapZoom={this.props.mapZoom ? this.props.mapZoom : 13}
        />
      </div>
    );
  }
}
