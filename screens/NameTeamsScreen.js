import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';

class WithLabel extends React.Component {
    render() {
      return (
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text>{this.props.label}</Text>
          </View>
          {this.props.children}
        </View>
      );
    }
  }

export class NameTeamsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.nameOfGame}`,
    header: null
  });

  constructor(props) {
      super(props);
      var numTeams = this.props.navigation.state.params.numTeams,
        emptyTeamNames = Array(parseInt(numTeams)).fill('')

      this.state = { 
          nameOfGame : this.props.navigation.state.params.nameOfGame,
          numTeams: this.props.navigation.state.params.numTeams,
          teamNames: emptyTeamNames
      }
  }

  render() {
    const { params } = this.props.navigation.state;
    const numArrayForTeams = Array(parseInt(params.numTeams)).fill().map((v,i)=>(i+1));
    return (
      <View>
         <Header
          outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('CreateNewGame', {nameOfGame : this.state.nameOfGame, numTeams: this.state.numTeams}),
          }}
          centerComponent={{ text: 'Name Teams', style: { color: '#fff', fontSize:20 } }} 
          rightComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Home'),
          }}
        />
        <ScrollView >
          <View style={{marginTop: 70}}>
            {numArrayForTeams.map(i => {
                return <View key={i}>
                  <FormLabel>{`Team Name ${i}`}</FormLabel>
                  <FormInput placeholder={`${i}`} onChangeText={(text) => this.updateTeamNames(text, i)}/>
                </View>
            })}

            <View style={styles.button}>
              <Button
                raised
                buttonStyle={[{backgroundColor: '#2095F2'}]}
                textStyle={{textAlign: 'center'}}
                onPress={this.goToTrackScores.bind(this)}
                title="Start Game"
              />
            </View>
          </View>
        </ScrollView >
                    
      </View>
    )
  }

  goToTrackScores() {

    var currentGame = {
      name: this.props.navigation.state.params.nameOfGame,
      teams: []
    }

    this.state.teamNames.forEach((name) => {
      currentGame.teams.push({name : name, score: 0})
    })

    AsyncStorage.setItem('currentGame', JSON.stringify(currentGame));

    this.props.navigation.navigate('TrackScore', {teamNames: this.state.teamNames, nameOfGame: this.props.navigation.state.params.nameOfGame})
  }

  updateTeamNames(text, i){
      var newTeamNames = this.state.teamNames
      newTeamNames[i-1] = text
      this.setState({teamNames: newTeamNames})
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