import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import uberX from '../assets/images/uberx.png';

const Details = () => {
  const request = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.typeTitle}>Popular</Text>
      <Text style={styles.typeDescription}>
        Viagens baratas para o dia a dia
      </Text>
      <Image style={styles.typeImage} source={uberX} />
      <Text style={styles.typeTitle}>UberX</Text>
      <Text style={styles.typeDescription}>R$ 6,00</Text>
      <TouchableOpacity style={styles.requestButton} onPress={request}>
        <Text style={styles.requestButtonText}>SOLICITAR UBERX</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 300,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
    padding: 20,
  },
  typeTitle: {
    fontSize: 20,
    color: '#222',
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
  },
  typeImage: {
    height: 80,
    marginVertical: 10,
  },
  requestButton: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Details;
