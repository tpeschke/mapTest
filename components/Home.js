import React, {Component} from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            lat: null,
            long: null
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        if (this.state.lat) {
            this.props.navigation.navigate('Map',{lat: this.state.lat, long: this.state.long})
        } else {
            navigator.geolocation
                .getCurrentPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }, _=>this.props.navigation.navigate('Map',{lat: this.state.lat, long: this.state.long}) ),
              (error) => alert(JSON.stringify(error)),
              { enableHighAccuracy: true})
        }
      }

    render(){
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#4169e1" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })