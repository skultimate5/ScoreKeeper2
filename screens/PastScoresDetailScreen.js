import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Badge, Button, Header, Icon, List, ListItem } from 'react-native-elements';


import renderIf from '../renderIf'

export class PastScoresDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Past Scores',
    header: null
  };

  constructor(props) {
    super(props)

    this.state = {
        item: this.props.navigation.state.params.item,
        pastGames: this.props.navigation.state.params.pastGames
    }
  }

  render() {
    const { params } = this.props.navigation.state
    return (
        <View>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('PastScores'),
                }}
                centerComponent={{ text: `${this.state.item.name}`, style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                icon: 'home',
                color: '#fff',
                onPress: () => this.props.navigation.navigate('Home'),
                }}
            />
            <ScrollView >
                <View style={{marginTop: 70}}>
                    {this.state.item.teams.map((team, i) => {
                        return <View key={i} style={styles.teamContainer}>
                        <Text style={styles.text}>{`${team.name}  :  `}</Text>
                        <Badge containerStyle={{ backgroundColor: '#2095F2', paddingRight: 10}}>
                        <Text style={styles.text}>{`${team.score}`}</Text>
                        </Badge>

                        </View>
                    })}
                    <View style={[{marginTop:25}]}>
                        <Text style={[styles.text,{marginBottom: 25, textAlign: 'center'}]}>Start Time : {(new Date(this.state.item.startTime)).toLocaleString()}</Text>
                        <Text style={[styles.text,{marginBottom: 10, textAlign: 'center'}]}>End Time : {(new Date(this.state.item.endTime)).toLocaleString()}</Text>
                        <View style={styles.button}>
                            <Button
                                raised
                                icon={{name: 'trash', type: 'entypo'}}
                                buttonStyle={{backgroundColor: 'red'}}
                                textStyle={{textAlign: 'center'}}
                                title={`Delete Game`}
                                onPress={() => this.deleteGame()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View>
    )
  }

  deleteGame() {
    console.log("Deleting game")
    var pastGames = this.state.pastGames,
        index = this.state.item.key

    pastGames.splice(index,1);

    AsyncStorage.setItem('pastGames', JSON.stringify(pastGames)).then((data) => {
        this.props.navigation.navigate('PastScores')
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
    scrollView: {
      flex: 1
    },
    teamContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    button: {
        borderRadius: 10,
        marginTop: 50
      },
});