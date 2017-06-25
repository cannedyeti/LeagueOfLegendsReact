const React = require('react');
const SummonerInfo = require('./SummonerInfo');


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: null,  
    }
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
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
    name.value = '';
  }
  clear() {
    var name = document.getElementById('search');
    if(this.state.summoner !== null) {
      this.setState({summoner: null});
    }
    name.value = '';
  }
  render() {
    let summoner = this.state.summoner;
    return (
      <div className="row">
        <h3>Search for a summoner here..</h3>
        <input id="search" type="text" placeholder="Summoner name..."/>
        <button onClick={this.search}>Search</button>
        <button onClick={this.clear}>Reset</button>
        {!summoner ? null : 
          <div>
            <SummonerInfo summonerName={summoner}/>
          </div>
        }
      </div>
    );
  }
}

module.exports = Container;
