import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class LeafletMapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: [props.latCenter, props.lngCenter],
      allowDragableMarker: false
    };

    this.moveMarker = this.moveMarker.bind(this);
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

  render() {
    return (
      <div>
        <Map center={this.state.position} zoom={13}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
          <Marker
            position={this.state.position}
            draggable={this.state.allowDragableMarker}
            onDragend={this.moveMarker}
          >
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default LeafletMapComponent;
