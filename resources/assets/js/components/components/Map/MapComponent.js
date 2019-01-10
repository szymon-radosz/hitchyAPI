import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import markerIcon from "./../../images/marker.png";

const defaultMapOptions = {
  fullscreenControl: false,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#737373"
        }
      ]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2"
        }
      ]
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          hue: "#ff0000"
        }
      ]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [
        {
          lightness: "100"
        }
      ]
    },
    {
      featureType: "landscape.man_made",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          lightness: "100"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "landscape.natural.landcover",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        }
      ]
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "geometry",
      stylers: [
        {
          lightness: "100"
        }
      ]
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off"
        },
        {
          lightness: "23"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#6a8ad4"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#ffd900"
        },
        {
          visibility: "on"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          color: "#e6e6e6"
        }
      ]
    },
    {
      featureType: "water",
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
    onDragEnd={map => {
      props.changeStateCoords(
        this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.center.lat(),
        this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.center.lng()
      );
    }}
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
    {props.latCenter && props.lngCenter && props.allowDragableMarker && (
      <Marker
        draggable={true}
        icon={{
          url: markerIcon,
          scaledSize: { width: 32, height: 32 }
        }}
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
    )}

    {props.secondLatCenter &&
    props.secondLngCenter &&
    props.allowDragableSecondMarker ? (
      <Marker
        draggable={true}
        icon={{
          url: markerIcon,
          scaledSize: { width: 32, height: 32 }
        }}
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
        icon={{
          url: markerIcon,
          scaledSize: { width: 32, height: 32 }
        }}
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
            icon={{
              url: markerIcon,
              scaledSize: { width: 32, height: 32 }
            }}
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
                <div className="mapInfoWindow">
                  <p className={"mapInfoWindowTitle"}>{singleMarker.text}</p>
                  {singleMarker.desc && <p>{singleMarker.desc}</p>}
                  {singleMarker.sumOfVotes && (
                    <p>
                      Ocena:{" "}
                      {(
                        Number(singleMarker.sumOfVotes) /
                        Number(singleMarker.votesCount)
                      ).toFixed(2)}
                    </p>
                  )}
                  {singleMarker.votesCount && (
                    <p>Ilość głosów: {singleMarker.votesCount}</p>
                  )}
                  {singleMarker.limit && (
                    <p>Limit uczestników: {singleMarker.limit}</p>
                  )}
                  {singleMarker.countUsers && (
                    <p>Wzięło udział: {singleMarker.countUsers}</p>
                  )}
                  {singleMarker.limit &&
                    singleMarker.countUsers == singleMarker.limit && (
                      <p>
                        <strong>Osiągnięto limit</strong>
                      </p>
                    )}
                </div>
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
          mapZoom={this.props.mapZoom ? this.props.mapZoom : 6}
        />
      </div>
    );
  }
}
