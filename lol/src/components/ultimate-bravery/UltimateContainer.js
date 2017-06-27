const React = require('react');
const UltimateChamps = require('./UltimateChamps');
const RandomChampion = require('./RandomChampion');

class UltimateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChampion: null,
      champArr: []
    }
    this.getChampions = this.getChampions.bind(this);
    this.getChampion = this.getChampion.bind(this);
  }

  getChampion() {
    if(this.state.selectedChampion !==null) {
      this.setState({
        selectedChampion: null
      })
      setTimeout(()=> {
        var arr = this.state.champArr;
        var champ = arr[Math.floor(Math.random()*arr.length)];
        this.setState({
          selectedChampion: champ
        })
      },1)
    } else {
      var arr = this.state.champArr;
      var champ = arr[Math.floor(Math.random()*arr.length)];
      this.setState({
        selectedChampion: champ
      })
    }
  }
  getChampions(arr) {
    this.setState({
      champArr: arr
    })
  }

  render() {
    return(
      <div className='row ultimate-container'>
        <div className="col-xs-4 col-xs-offset-1">
          <button onClick={this.getChampion} className="brave-button">Make a mother fucker brave</button>
          {!this.state.selectedChampion ? <p>Please select a champion...</p> : 
            <RandomChampion id={this.state.selectedChampion} />
          }
        </div>
        <UltimateChamps getChamp={this.getChampions} idArray={this.state.champArr}/>
      </div>
    )
  }
}

module.exports = UltimateContainer;