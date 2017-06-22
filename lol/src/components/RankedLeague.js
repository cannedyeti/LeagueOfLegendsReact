const React = require('react');


class RankedHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: props.leagueInfo
    }
  }
  leagueType() {
    var queue = this.state.league.queueType;
    if(queue === 'RANKED_FLEX_SR') {
      return 'Ranked Flex'
    } else if (queue === 'RANKED_FLEX_TT') {
      return 'Ranked 3v3'
    } else if (queue === 'RANKED_SOLO_5x5') {
      return 'Ranked Solo/Duo'
    }
  }
  render() {
    var league = this.state.league;
    return(
      <div>
        {console.log(this.state.league)}
        <h1>{this.leagueType()}</h1>
        <h2>{league.tier} {league.rank}</h2>
        <h4>League Points: {league.leaguePoints}</h4>
      </div>
    )
  }
}

module.exports = RankedHistory;