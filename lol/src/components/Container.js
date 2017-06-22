const React = require('react')
const SummonerInfo = require('./SummonerInfo')

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: null
    }
    this.search = this.search.bind(this);
  }

  search() {
    var name = document.getElementById('search');
    if (this.state.summoner !== null ){
      this.setState({summoner: null})
      setInterval(() => {
        this.setState({summoner: name.value})
      }, 1);
    } else {
      this.setState({summoner: name.value});
    }
  }
  render() {
    let summoner = this.state.summoner;
    return (
      <div>
        <input id="search" type="text" placeholder="Summoner name..."/>
        <button onClick={this.search}>Search</button>
        {!summoner ? <p>Search for a summoner</p> : <SummonerInfo summonerName={summoner}/>}
      </div>
    );
  }
}

module.exports = Container;
