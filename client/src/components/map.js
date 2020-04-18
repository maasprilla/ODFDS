import React, { Component } from "react";
import ReactMapGL, {GeolocateControl} from "react-map-gl";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
class Map extends Component {
  state={
    order: this.props.order,
    start: [-122.486052, 37.830348],
    end: [-122.49378204345702, 37.83368330777276],
    zoom: 15,
    geojson : {},
    token: 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg',
    viewport:{
      width: "100vw",
      height: "100vh",
      latitude: 37.83368330777276,
      longtitude: -122.49378204345702,
      zoom: 12
    },
    searchResultLayer: null
  };

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }

    // componentDidMount(){
    //     var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    //     var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
    //     mapboxgl.accessToken = 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    //     var map = new mapboxgl.Map({
    //       container: 'drivermap',
    //       style: 'mapbox://styles/mapbox/streets-v11',
    //       center: this.state.start,
    //       zoom: this.state.zoom
    //     });
        
    //     var geocoder = new MapboxGeocoder({
    //       accessToken: mapboxgl.accessToken,
    //       types: 'poi',
    //       // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
    //       render: function(item) {
    //       // extract the item's maki icon or use a default
    //       var maki = item.properties.maki || 'marker';
    //       return (
    //       "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
    //       maki +
    //       "-15.svg'><span class='geocoder-dropdown-text'>" +
    //       item.text +
    //       '</span></div>'
    //       );
    //       },
    //       mapboxgl: mapboxgl
    //       });
    //       map.addControl(geocoder);

    //     // Add zoom and rotation controls to the map.
    //     //map.addControl(new mapboxgl.NavigationControl());

    //     map.on('load', function() {
    //       map.addSource('route', {
    //       'type': 'geojson',
    //       'data': {
    //         'type': 'Feature',
    //         'properties': {},
    //         'geometry': {
    //         'type': 'LineString',
    //         'coordinates': [
    //         [-122.48369693756104, 37.83381888486939],
    //         [-122.48348236083984, 37.83317489144141],
    //         [-122.48339653015138, 37.83270036637107],
    //         [-122.48356819152832, 37.832056363179625],
    //         [-122.48404026031496, 37.83114119107971],
    //         [-122.48404026031496, 37.83049717427869],
    //         [-122.48348236083984, 37.829920943955045],
    //         [-122.48356819152832, 37.82954808664175],
    //         [-122.48507022857666, 37.82944639795659],
    //         [-122.48610019683838, 37.82880236636284],
    //         [-122.48695850372314, 37.82931081282506],
    //         [-122.48700141906738, 37.83080223556934],
    //         [-122.48751640319824, 37.83168351665737],
    //         [-122.48803138732912, 37.832158048267786],
    //         [-122.48888969421387, 37.83297152392784],
    //         [-122.48987674713133, 37.83263257682617],
    //         [-122.49043464660643, 37.832937629287755],
    //         [-122.49125003814696, 37.832429207817725],
    //         [-122.49163627624512, 37.832564787218985],
    //         [-122.49223709106445, 37.83337825839438],
    //         [-122.49378204345702, 37.83368330777276]
    //         ]
    //         }
    //         }
    //       });
    //       map.addLayer({
    //       'id': 'route',
    //       'type': 'line',
    //       'source': 'route',
    //       'layout': {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //       },
    //       'paint': {
    //       'line-color': '#888',
    //       'line-width': 8
    //       }
    //       });
    //       });

    //     // Add geolocate control to the map.
    //     map.addControl(
    //     new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //     enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    //     })
    //     );
    //   }
  
    // componentWillUnmount() {
    //   this.map.remove();
    // }
  
    render() {
      const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: 0,
        bottom: 0,
        width: '70%',
        height: '50%'
      };

      const { viewport, searchResultLayer, token} = this.state
      return (
      //<div style={style} id="drivermap"> </div> 
      <div >
        <ReactMapGL 
        ref={this.mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={token}
        >
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        <Geocoder 
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={token}
          position='top-right'
        />
        </ReactMapGL>
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </div>
      
      );
    }
  }
  
  export default Map;