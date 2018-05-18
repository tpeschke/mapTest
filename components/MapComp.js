import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, fitToCoordinates } from 'react-native-maps'
import axios from 'axios'
import config from '../config'
import MapInput from './MapInput'
import { extractLine } from './extractCoord'

export default class MapComp extends Component {
  constructor() {
    super()

    this.state = {
      destination: null,
      predictions: [{ id: 1, description: '' }, { id: 2, description: '' }, { id: 3, description: '' }, { id: 4, description: '' }, { id: 5, description: '' }],
      destObj: {},
      directions: {},
      modalVisible: false,
      coords: null,
      wId: null
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    console.log(navigator.geolocation.watchPosition.toString())
    var wId = navigator.geolocation.watchPosition(_=>console.log('hello'), e => console.log(e))
    console.log(wId)
    // this.setState({watchId: watchId})
  }

  componentWillUnmount () {
    navigator.geolocation.stopObserving(this.state.wId)
  }

  captureInput = (e) => {
    this.setState({ destination: e })

    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e}&key=${config.APIKEY}&location=${this.props.lat},${this.props.long}`)
      .then(res => {
        if (e === '') {
          this.setState({ 
            predictions: [{ id: 1, description: '' }, { id: 2, description: '' }, { id: 3, description: '' }, { id: 4, description: '' }, { id: 5, description: '' }]
            , destObj: {} 
            , coords: null
            , directions: {}})
        } else {
          this.setState({ predictions: res.data.predictions })
        }
      })
  }

  setDestination = (obj) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.APIKEY}&place_id=${obj.place_id}`)
      .then(res => {
        let { lat, long } = this.props.navigation.state.params
        let { lat: desLat, lng: desLng } = res.data.results[0].geometry.location
        axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}5%2C${long}&destination=${desLat}5%2C${desLng}&key=${config.APIKEY}&mode=bicycling`).then(result => {
          this.setState({ directions: result.data.routes[0].legs[0].steps, coords: extractLine(result.data.routes[0].overview_polyline), destination: obj.description, modalVisible: false, destObj: res.data.results[0].geometry.location }, _ => {
            this._map.fitToCoordinates([{latitude: lat,longitude: long}, {latitude: desLat,longitude: desLng,}], {
              edgePadding: { top: 125, right: 125, bottom: 125, left: 125 },
              animated: true,
            })
          })
        })
      })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    var { long, lat } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <MapInput
            lat={lat}
            long={long}
            captureInput={this.captureInput}
            setDestination={this.setDestination}
            destination={this.state.destination}
            predictions={this.state.predictions}
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
          />
        </View>
        <View style={{ flex: 8, backgroundColor: 'grey' }}>
          <MapView
            ref = {c => this._map = c}
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
            followsUserLocation={true}>

            {this.state.destObj.lat ?
              <Marker
                coordinate={{
                  latitude: this.state.destObj.lat,
                  longitude: this.state.destObj.lng,
                }}></Marker>
              : null}

            {this.state.coords ?
              <Polyline
                coordinates={this.state.coords}
                strokeColor="#0d98ba"
                strokeWidth={4}
                zIndex={3}
              />
              : null}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 5,
    backgroundColor: 'lightblue'
  },
  input: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 0
  },
});