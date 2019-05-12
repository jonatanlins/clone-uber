import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { googleMapsApiKey } from '../constants';

const Directions = ({ destination, origin, onReady }) => {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey={googleMapsApiKey}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
};

const styles = StyleSheet.create({});

export default Directions;
