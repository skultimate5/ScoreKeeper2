import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Header, List, ListItem } from 'react-native-elements';


import renderIf from '../renderIf'

export class PastScoresScreen extends React.Component {
  static navigationOptions = {
    title: 'Past Scores',
    header: null
  };

  constructor(props) {
    super(props)

    this.state = {
      pastGames : [],
      isLoading: true
    }
  }

  componentDidMount() {
    this._getPastGames()
  }

  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
          leftComponent={{ icon: 'trash', type: 'entypo', color: '#fff', onPress: () => {this.clearOutScores()} }}
          centerComponent={{ text: 'Past Scores', style: { color: '#fff', fontSize:20 } }} 
          rightComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Home'),
          }}
        />
        {renderIf(this.state.isLoading,
          <View><Text>Loading...</Text></View>
        )}
        {renderIf(!this.state.isLoading && this.state.pastGames != [],
          <View style={{paddingTop:70}}>
            <ScrollView >
              <List style={styles.list}>
                {
                  this.state.pastGames.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.name}
                      subtitle={(new Date(item.endTime)).toLocaleString()}
                      onPress={() => this.props.navigation.navigate('PastScoresDetail', {item: item, pastGames: this.state.pastGames})}
                    />
                  ))
                }
              </List>
            </ScrollView>
          </View>
        )}
        
      </View>
    )
  }

  _goToGameInfo(item) {
    console.log(item)
  }

  async _getPastGames() {
    let response = await AsyncStorage.getItem('pastGames')
    let pastGames = await JSON.parse(response) || []

    pastGames.map((game, index) => {
      game.key = index
      return game
    })

    this.setState({pastGames : pastGames})    
    this.setState({isLoading : false})
  }

  clearOutScores() {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to delete all past game info?',
      [
        {text: 'Yes', onPress: () => this.removePastGames()},
        {text: 'No', onPress: () => (console.log("Nothing to see here"))}
      ],
      { cancelable: false }
    )
  }

  removePastGames() {
    AsyncStorage.removeItem('pastGames').then((data) => {
      this.props.navigation.navigate('Home')
    })
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
      padding: 10,
      height: 44,
    },
    text: {
      fontSize: 18
    },
    list: {
      paddingBottom: 20
    },
    // scrollView: {
    //   flex: 1
    // }
});