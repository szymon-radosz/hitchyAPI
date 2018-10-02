import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import axios from "axios";

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseEvents: true,
            touchEvents: true,
            defaultZoom: 12
        };
    }

    render() {
        return (
            <Map
                center={
                    this.props.center
                        ? this.props.center
                        : [this.props.latCenter, this.props.lngCenter]
                }
                defaultZoom={this.state.defaultZoom}
                onBoundsChanged={
                    this.props.handleBoundsChange
                        ? this.props.handleBoundsChange
                        : ""
                }
                mouseEvents={this.state.mouseEvents}
                touchEvents={this.state.touchEvents}
            >
                {this.props.meetingsData ? (
                    this.props.meetingsData.map((meeting, i) => {
                        return (
                            <Marker
                                key={i}
                                anchor={[
                                    parseFloat(meeting.lattitude),
                                    parseFloat(meeting.longitude)
                                ]}
                                payload={1}
                            />
                        );
                    })
                ) : (
                    <Marker
                        key={this.props.latCenter ? this.props.latCenter : 1}
                        anchor={
                            this.props.center
                                ? this.props.center
                                : [
                                      parseFloat(this.props.latCenter),
                                      parseFloat(this.props.lngCenter)
                                  ]
                        }
                        payload={1}
                    />
                )}
            </Map>
        );
    }
}

export default MapComponent;
