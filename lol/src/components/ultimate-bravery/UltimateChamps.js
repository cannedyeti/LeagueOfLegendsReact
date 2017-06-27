const React = require('react');
const ChampAPI = require('../../utilities/ChampApi');
const Champion = require('./Champion');

class UltimateChamps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champs: ChampAPI.champ,
      champIdArray: null
    }
    this.changeChamp = this.changeChamp.bind(this);
  }

  changeChamp(champId) {
    var array = this.state.champIdArray || [];
    if(array.includes(champId)) {
      var remove = array.indexOf(champId)
      array.splice(remove,1);
      this.props.getChamp(array)
      this.setState({
        champIdArray: array
      })
    } else if (!array.includes(champId)) {
      var newArr = array.concat(champId);
      this.props.getChamp(newArr)
      this.setState({
        champIdArray: newArr
      })
    }
  }

  render() {
    var champs = this.state.champs
    var tempA = []
    var currentChamps = tempA.concat(this.state.champIdArray)
    var champArr = []
    var champIds = []
    for (var c in champs.champs.data) {
         champArr.push(champs.champs.data[c])
         champIds.push(champs.champs.data[c].id)
    }
    champArr.sort(function(a, b) {
      var nameA = a.name
      var nameB = b.name
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    return ( 
      <div className='col-xs-6 col-xs-offset-1'>
        <button onClick={() => {
          this.props.getChamp(champIds)
          this.setState({
            champIdArray: champIds
          })  
        }}>Select All Champions</button>

        <button onClick={() => {
          this.props.getChamp([])
          this.setState({
            champIdArray: []
          })  
        }}>Deselect All Champions</button>

        <br />
        {champArr.map((champ, index) => {
          return <Champion key={index} onSelect={this.changeChamp} champId={currentChamps} champion={champ}/>
        })}
      </div>
    )
  }
}

module.exports = UltimateChamps;