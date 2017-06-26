const React = require('react');
const PropTypes = require('prop-types');
const ChampApi = require('../utilities/ChampApi');
const SumApi = require('../utilities/SummonerSpellApi');

class SingleMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.game,
      matchInfo: null,
      win: false,
      player: null
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
    },800)
  }

  checkWin(info) {
    var champ = this.state.match.champion;
    var searchedPlayer = info.participants.filter(function(player) {
      return player.championId === champ
    })
    var player = searchedPlayer[0]
    var winner = info.teams.filter(function(team) {
      return team.teamId === player.teamId
    })
    if (winner[0].win === 'Win') {
      this.setState({win: true, player: player});
    } else {
      this.setState({win: false, player: player});
    }
  }

  render() {
    var champs = ChampApi.champ;
    var spells = SumApi.spells;
    var player = this.state.player;
    var championPlayed = this.state.match.champion;
    var championKeyName = champs.champs.keys[championPlayed];
    var championData = champs.champs.data[championKeyName];
    console.log(championData)
    console.log('spells', spells)
    var findSpell = function(sId) {
      for (var spell in spells.data) {
        if (spells.data[spell].id === sId) {
          return spell
        }
      }
    }
    // var spell1 = findSpell(player.spell1Id)
    // var spell2 = findSpell(player.spell1Id)

    return (
      <div>
        {!player ? null : <div
          className="row"
          style={this.state.win === true ? {border: '1px solid green'} : {border: '1px solid red'} }>

          <div className="col-xs-2">
            {!this.state.win ? <p>Defeat</p> : <p>Victory</p>}
            <img className="recent-match-champ-image" src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + championData.name + ".png"} />
            <p>{championData.name}</p>
          </div>
          <div className="col-xs-2">
            <p>{player.stats.kills}/{player.stats.deaths}/{player.stats.assists}</p>
            <img className="sum-spell" src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/spell/'+ findSpell(player.spell1Id) +'.png' } /><img className="sum-spell" src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/spell/'+ findSpell(player.spell2Id) +'.png'} />
          </div>
          <div className="col-xs-2">
            <p>Level {player.stats.champLevel}</p>
            <p>{player.stats.totalMinionsKilled} CS</p>
          </div>
          <div className="col-xs-3">
          </div>
          <div className="col-xs-3">
          </div>
          {console.log("player", player, "GameID", this.state.match)}
        </div>}
      </div>
    )
  }
}
SingleMatch.propTypes = {
  game: PropTypes.object.isRequired
};

module.exports = SingleMatch;