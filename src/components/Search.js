import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googleMapsApiKey } from '../constants';

const Search = ({ onLocationSelected }) => {
  const [searchFocused, setSearchFocused] = React.useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      placeholderTextColor="#333"
      onPress={onLocationSelected}
      onFocus={() => setSearchFocused(true)}
      onBlur={() => setSearchFocused(false)}
      listViewDisplayed={searchFocused}
      query={{ key: googleMapsApiKey, language: 'pt' }}
      textInputProps={{ autoCapitalize: 'none', autoCorrect: false }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={styles}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 40 }),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 54,
    marginHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 54,
    borderRadius: 3,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    fontSize: 18,
  },
  listView: {
    borderRadius: 3,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 20,
    height: 58,
  },
});

export default Search;
