import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const containerStyle = {

  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      region: {},
      loading: true,
    };
  }

  componentDidMount() {
    const currentComponent = this;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        currentComponent.setState({
          region: {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
          },
          loading: false,
        });
      }, (error) => {
        currentComponent.setState({
          region: {
            lat: 37.3230,
            lng: -122.0322,
          },
          loading: false,
        });
      });
    }

    fetch('http://nikashkhanna.pythonanywhere.com/get-markers-info').then(res => res.json()).then((data) => {
      this.setState({
        stores: data,
        loading: false,
      });
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  displayMarkers(stores) {
    return stores.map(mark => (
      <Marker
        key={mark.key}
        onClick={this.onMarkerClick}
        name={mark.subtitle.toString()}
        position={{lat: mark.latitude, lng: mark.longitude }}
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        label={mark.title}
      />
    ));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Map
              google={this.props.google}
              zoom={12}
              containerStyle={containerStyle}
              center={this.state.region}
              initialCenter={this.state.region}
            >
              {this.displayMarkers(this.state.stores)}
              <InfoWindow
                onClose={this.onClose}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{this.state.selectedPlace.label}</h4>
                  <h4>People:  {this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_KEY), libraries: ['places']
})(MapContainer)