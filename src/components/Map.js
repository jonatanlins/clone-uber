import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import Search from './Search';
import Directions from './Directions';
import Details from './Details';
import { getPixelSize } from '../utils';
import { googleMapsApiKey } from '../constants';
import markerImage from '../assets/images/marker.png';
import backImage from '../assets/images/back.png';

Geocoder.init(googleMapsApiKey);

class Map extends React.Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };

  componentDidMount() {
    const error = () => {};

    navigator.geolocation.getCurrentPosition(this.updatePosition, error, {
      timeout: 2000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    });
  }

  updatePosition = async ({ coords: { latitude, longitude } }) => {
    const geocode = await Geocoder.from({ latitude, longitude });
    const address = geocode.results[0].formatted_address;
    const location = address.split(',')[0];

    this.setState({
      location,
      region: {
        ...this.state.region,
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      },
    });
  };

  handleLocationSelected = (data, details) => {
    this.setState({
      destination: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        title: data.structured_formatting.main_text,
      },
    });
  };

  handleDirection = result => {
    this.setState({ duration: Math.round(result.duration) });

    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(350),
      },
    });
  };

  goBack = () => {
    this.setState({ destination: null });
  };

  render() {
    const { region, destination, duration, location } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <>
              <Directions
                origin={region}
                destination={destination}
                onReady={this.handleDirection}
              />
              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <View style={styles.locationBox}>
                  <View style={styles.locationTimeBox}>
                    <Text style={styles.locationTimeText}>{duration}</Text>
                    <Text style={styles.locationTimeTextSmall}>MIN</Text>
                  </View>
                  <Text style={styles.locationText}>{location}</Text>
                </View>
              </Marker>
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <View style={styles.locationBox}>
                  <Text style={styles.locationText}>{destination.title}</Text>
                </View>
              </Marker>
            </>
          )}
        </MapView>

        {destination ? (
          <>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <Image source={backImage} />
            </TouchableOpacity>
            <Details />
          </>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationBox: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.1,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    flexDirection: 'row',
    marginTop: 20,
  },
  locationText: {
    marginVertical: 8,
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  locationTimeBox: {
    backgroundColor: '#222',
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  locationTimeText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  locationTimeTextSmall: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({ android: 40, ios: 60 }),
    left: 20,
  },
});

export default Map;
