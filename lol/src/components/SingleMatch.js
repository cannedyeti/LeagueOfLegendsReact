const React = require('react');
const PropTypes = require('prop-types');

class SingleMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.game,
      matchInfo: null,
      win: false
    }
    this.checkWin = this.checkWin.bind(this);
  }
  componentDidMount() {
    var matchId = this.state.match.gameId
    fetch('https://na1.api.riotgames.com/lol/match/v3/matches/' + matchId + '?api_key=RGAPI-2e3d4429-ce3a-4f34-8301-3ca68c214c9c')
    .then(res => res.json())
    .then(result => this.setState({matchInfo: result}))
    setTimeout(() => {
      var matchInfo = this.state.matchInfo;
      this.checkWin(matchInfo)
    },500)
  }

  checkWin(info) {
    var champ = this.state.match.champion;
    var searchedPlayer = info.participants.filter(function(player) {
      return player.championId === champ
    })
    var playerTeam = searchedPlayer[0].teamId
    var winner = info.teams.filter(function(team) {
      return team.teamId === playerTeam
    })
    console.log('Winner', winner)
    if (winner[0].win === 'Win') {
      this.setState({win: true});
    }
  }

  render() {
    var matchInfo = this.state.matchInfo;
    return (
      <div
        style={this.state.win === true ? {background: 'green'} :  {background: 'red'} }
      >
        {console.log("matchInfo", matchInfo, "GameID", this.state.match)}
        {this.state.match.champion}
      </div>
    )
  }
}
SingleMatch.propTypes = {
  game: PropTypes.object.isRequired
};

module.exports = SingleMatch;