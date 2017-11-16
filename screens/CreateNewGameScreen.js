import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';

export class CreateNewGameScreen extends React.Component {
  static navigationOptions = {
    title: 'Create New Game',
    header: null
  };

  constructor(props) {
      super(props);
      this.state = { 
          nameOfGame : this.props.navigation.state.params ? this.props.navigation.state.params.nameOfGame : '',
          numTeams: this.props.navigation.state.params ? this.props.navigation.state.params.numTeams : ''
      }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
          centerComponent={{ text: 'Create New Game', style: { color: '#fff', fontSize:20 } }} 
          rightComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Home'),
          }}
        />
        <View style={{marginTop: 70}}>
          <FormLabel>Name of Game</FormLabel>
          <FormInput value={this.state.nameOfGame} onChangeText={(nameOfGame) => this.setState({nameOfGame})}/>
          <FormLabel>Number of Teams</FormLabel>
          <FormInput value={this.state.numTeams} onChangeText={(numTeams) => this.setState({numTeams})}/>

          <View style={styles.button}>
            <Button
              raised
              buttonStyle={[{backgroundColor: '#2095F2'}]}
              textStyle={{textAlign: 'center'}}
              onPress={this.nameTeams.bind(this)}
              title="Next"
            />
          </View>
        </View>
      </View>
    )
  }

  nameTeams() {
    this.props.navigation.navigate('NameTeams', {numTeams: this.state.numTeams, nameOfGame: this.state.nameOfGame})
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
      borderRadius: 10,
      marginTop: 25
    },
});