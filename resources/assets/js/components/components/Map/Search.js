import {
  Map,
  TileLayer,
  Marker,
  MapControl,
  Popup,
  withLeaflet
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class Search extends MapControl {
  createLeafletElement() {
    const provider = new OpenStreetMapProvider();
    return GeoSearchControl({ provider: provider });
  }
}

export default Search;
