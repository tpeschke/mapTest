import React, { Component } from 'react'
import { ActivityIndicator, PermissionsAndroid, StyleSheet, Text, View, Alert } from 'react-native';

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
        this.getPermission()
    }

    getPermission = () => {
        async function requestLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Photo App Camera Permission',
                        'message': 'Cool Photo App needs access to your camera ' +
                            'so you can take awesome pictures.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    if (this.state.lat) {
                        this.props.navigation.navigate('Map', { lat: this.state.lat, long: this.state.long })
                    } else {
                        navigator.geolocation
                            .getCurrentPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }, _ => this.props.navigation.navigate('Map', { lat: this.state.lat, long: this.state.long })),
                                (error) => alert(JSON.stringify(error)),
                                { enableHighAccuracy: true, timeout: 10000 })
                    }
                } else {
                    console.log("Camera permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    render() {
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