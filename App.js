import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { TrackScoreScreen } from './screens/TrackScoreScreen';
import { CreateNewGameScreen } from './screens/CreateNewGameScreen'
import { PastScoresScreen } from './screens/PastScoresScreen'
import { NameTeamsScreen } from './screens/NameTeamsScreen'
import { PastScoresDetailScreen } from './screens/PastScoresDetailScreen'


const ScoreKeeper = StackNavigator({
    Home: {screen: HomeScreen},
    TrackScore: {screen: TrackScoreScreen},
    CreateNewGame: {screen: CreateNewGameScreen},
    PastScores: {screen: PastScoresScreen},
    NameTeams: {screen: NameTeamsScreen},
    PastScoresDetail : {screen: PastScoresDetailScreen}
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return <ScoreKeeper />;
  }
}
