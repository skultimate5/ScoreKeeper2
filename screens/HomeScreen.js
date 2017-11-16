import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Header } from 'react-native-elements';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            hasCurrentGame : false
        }
    }

    componentDidMount () { 
        this._getCurrentGame().then((data) => {
            this.setState({hasCurrentGame : data.name ? true : false})
        })
      } 

    async _getCurrentGame() {
        let response = await AsyncStorage.getItem('currentGame')
        let currentGame = await JSON.parse(response) || {}

        return currentGame
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
        <View>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                centerComponent={{ text: 'Home', style: { color: '#fff', fontSize:20 } }} 
            />
            <View style={{paddingTop:100}}>
                <View style={styles.button}>
                    <Button
                    raised
                    disabled={!this.state.hasCurrentGame}
                    icon={{name: 'directions-run'}}
                    buttonStyle={[{backgroundColor: '#02968A'}]}
                    textStyle={{textAlign: 'center'}}
                    title={`Current Game`}
                    onPress={() => navigate('TrackScore')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    raised
                    icon={{name: 'add-circle-outline'}}
                    buttonStyle={[{backgroundColor: '#2095F2'}]}
                    textStyle={{textAlign: 'center'}}
                    title={`New Game`}
                    onPress={() => navigate('CreateNewGame')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    raised
                    icon={{name: 'history'}}
                    buttonStyle={[{backgroundColor: '#9C28B0'}]}
                    textStyle={{textAlign: 'center'}}
                    title={`Past Scores`}
                    onPress={() => navigate('PastScores')}
                    />
                </View>
            </View>
        </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:30
    },
    button: {
        borderRadius: 10,
        marginTop: 25
    }
});

