import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

const MyPopupMarker = ({ map, position, text }) => (
  <Marker map={map} position={position}>
    <Popup>
      <span>{text}</span>
    </Popup>
  </Marker>
);

const MyMarkersList = ({ map, markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} map={map} {...props} />
  ));
  return <div style={{ display: "none" }}>{items}</div>;
};

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: [props.latCenter, props.lngCenter],
      secondPosition: [props.secondLatCenter, props.secondLngCenter],
      allowDragableMarker: false
    };

    this.moveMarker = this.moveMarker.bind(this);
    this.moveSecondMarker = this.moveSecondMarker.bind(this);
  }

  componentDidMount() {
    this.setState({
      allowDragableMarker: this.props.allowDragableMarker
        ? this.props.allowDragableMarker
        : false
    });
  }

  moveMarker(event) {
    this.props.setNewCoords(event.target._latlng.lat, event.target._latlng.lng);
  }

  moveSecondMarker(event) {
    this.props.setNewSecondCoords(
      event.target._latlng.lat,
      event.target._latlng.lng
    );
  }

  render() {
    return (
      <div>
        <Map
          center={
            this.props.centerCoord
              ? this.props.centerCoord
              : this.state.position
          }
          zoom={13}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
          {this.props.markersData ? (
            <MyMarkersList markers={this.props.markersData} />
          ) : (
            ""
          )}
          {this.props.displayFirstMarker ? (
            <Marker
              position={this.state.position}
              draggable={this.state.allowDragableMarker}
              onDragend={this.moveMarker}
            />
          ) : (
            ""
          )}
          {this.props.displaySecondMarker ? (
            <Marker
              position={this.state.secondPosition}
              draggable={this.state.allowDragableMarker}
              onDragend={this.moveSecondMarker}
            />
          ) : (
            ""
          )}
          }
        </Map>
      </div>
    );
  }
}

export default MapComponent;
