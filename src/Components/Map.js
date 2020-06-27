import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../Map.css'


const containerStyle = {

  width: '100%',
  height: '95%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      region: {
            lat: 37.3230,
            lng: -122.0322,
          },
      loading: true,
        img: null
    };
  }

  componentDidMount(prevProps) {
    const currentComponent = this;
    if(prevProps !== this.props){
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

      fetch('https://headcount.pythonanywhere.com/get-markers-info', {
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
          body: JSON.stringify({'user': '10sfull', 'pwd': 'half-cap-pppoker'})
      })
          .then(response => response.json())
          .then(data => this.setState({ loading: false, stores:data }));

      
    }

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
      var rec;
      var percent_str;
      var percent;
      var dash = '-';
      if (marker['histogram'].capacity >= 0.75) {
        status = "red";
        percent= marker['histogram'].capacity * 100;
        rec = "The store is at ".concat(percent, "% capacity. It may be risky to come now.");
      } else {
        status = "green";
        percent = marker['histogram'].capacity * 100;
        percent_str = "The store is at ".concat(percent, "% capacity.");
        rec = "Now is a good time to leave.";
      }

      var img_str = '/img/';
      var img = img_str.concat(title,dash,status).concat(".png");
      
      var scale = 55*(title.length/parseFloat(8));
      toReturn.push((

      <Marker
        key={marker.key}
        onClick={this.onMarkerClick}
        name={marker.subtitle.toString()}
        title={marker.display}
        cap = {marker.capacity}
        recommendation = {rec}
        percent_string = {percent_str}
        capacity = {percent}
        position={{lat: marker.latitude, lng: marker.longitude }}
        icon={{url:img, scaledSize: {width: 100, height: 25}}}

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
      return (<Map
              google={this.props.google}
              zoom={14}
              containerStyle={containerStyle}
              center={this.state.region}
              initialCenter={this.state.region}
              disableDefaultUI={true}
            >

            </Map>);
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
              zoom={16}
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

                  <h1>{this.state.selectedPlace.title}</h1>
                  <div> 
                    <h3>Our recommendation:</h3> {this.state.selectedPlace.recommendation}
                  </div>
                  <div>
                    <h3>People:</h3> {this.state.selectedPlace.name}
                  </div>
                  <div>
                    <h3>Capacity:</h3> {this.state.selectedPlace.capacity}%
                  </div>
                 
                  
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