const React = require('react');
const SingleMatch = require('./SingleMatch');

class RecentMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: props.matches
    }
  }
  render() {
    var matches = this.state.matches;
    return (
      <div>
        <h1>Recent Matches</h1>
        <ul>
          {!matches ? <p>Getting Matches...</p> : 
            matches.map((match) => {
              return (
                <li key={match.gameId}>
                  <SingleMatch game={match}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

}

module.exports = RecentMatches;