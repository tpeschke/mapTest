import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, StyleSheet } from 'react-native';

export default class MapDrop extends Component {

    render() {
        const predics = this.props.predictions.map((val, i) => {
            return (
                <View key={val.id} style={i === 0 ? styles.firstPredic : styles.predics}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.setDestination(val);
                        }}>
                        <Text>{val.description}</Text>
                    </TouchableHighlight>
                </View>
            )
        })

        return (
            <View style={{ marginTop: 10 }}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={_ => { }}>

                    <View style={{ marginTop: 22 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.props.captureInput(text)}
                            placeholder='Where Would You Like to Go?'
                            value={this.props.destination}
                        />

                        {predics}

                    </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.captureInput('');
                                }}
                                style={styles.buttonClear}>
                                <Text>Clear</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    this.props.setModalVisible(false);
                                }}
                                style={styles.button}>
                                <Text style={{ color: 'white' }}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    predics: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    firstPredic: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderTopColor: '#4169e1',
        borderTopWidth: 4,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: 'grey',
        height: 40
    },
    buttonClear: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: 'lightgrey',
        height: 40
    },
    input: {
        height: 40,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 5,
        marginBottom: 10
    }
});