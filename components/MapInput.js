import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import Button from 'apsl-react-native-button'
import MapDrop from './MapDrop'

export default class MapInput extends Component {

    render() {
        const { destination } = this.props;

        const destinationDisplay = function () {
            if (destination.length >= 45) {
                return destination.substring(0, 42) + '...'
            }
            return destination
        }

        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.setModalVisible(true);
                        }}
                        style={styles.destination}>
                        <Text>{!destination || destination === '' ? 'Where Would You Like to Go?' : destinationDisplay()}</Text>
                    </TouchableHighlight>
                    <Button
                        style={{ height: 30, width: 30, backgroundColor: '#4169e1' }}
                        textStyle={{ fontSize: 17, color: 'whitesmoke' }}
                    >-></Button>
                </View>
                <MapDrop
                    modalVisible={this.props.modalVisible}
                    setModalVisible={this.props.setModalVisible}
                    destination={destination}
                    captureInput={this.props.captureInput}
                    predictions={this.props.predictions}
                    setDestination={this.props.setDestination}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22
    },
    inputContainer: {
        ...StyleSheet.absoluteFillObject,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    destination: {
        width: 325,
        height: 30,
        backgroundColor: 'whitesmoke',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});