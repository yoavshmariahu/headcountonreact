/*global google*/
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



const containerStyle = {

  width: '100%',
  height: '95%'
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
        img: null
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


     fetch('/get-markers-info').then(res => res.json()).then((data) => {
        this.setState({
         loading: false,
            stores:data
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

    var i;
    var toReturn = [];

    for (i = 0; i < stores.length; i++) {
      var marker = stores[i];
      var title=marker.title;
      var people=parseFloat(marker.subtitle);
      var status;
      var dash = '-';
      if (people >= 15) {
        status = "red";
      } else {
        status = "green";
      }

      var img_str = '/img/';
      var img = img_str.concat(title,dash,status).concat(".png");


      var image = {
        url: img,

      };
      toReturn.push((

      <Marker
        key={marker.key}
        onClick={this.onMarkerClick}
        name={marker.subtitle.toString()}
        position={{lat: marker.latitude, lng: marker.longitude }}
        icon={{url:img, scaledSize: {width: 90, height: 25}}}

        //symbol={{path: "../img/trader-joes-red.pdf"}}
        //label={{color: "blue", text: "hello", fontFamily: "Avenir", fontWeight: "bold"}}
        //shape={{type: "rect", coord: [37, 122, 45, 150]}}


      />
    ))
    }
    return toReturn;
    


    /*
    return stores.map(mark => (

      <Marker
        key={mark.key}
        onClick={this.onMarkerClick}
        name={mark.subtitle.toString()}
        position={{lat: mark.latitude, lng: mark.longitude }}
        
        
        
      />
    ));*/
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return null;
    }
    if (!this.props) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Map
              google={this.props.google}
              zoom={14}
              containerStyle={containerStyle}
              center={this.state.region}
              initialCenter={this.state.region}
              disableDefaultUI={true}
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