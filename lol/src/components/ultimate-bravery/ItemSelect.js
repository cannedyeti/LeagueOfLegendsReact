const React = require('react');
const ItemAPI = require('../../utilities/ItemApi');

class ItemSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: ItemAPI.getUltimateItems,
      ultimateItems: null,
      boots: ItemAPI.getBoots,
      smite: props.smiteBool
    }
  }
  componentWillMount() {
    var smiteItems = ItemAPI.getSmite;
    var ultimateArray = this.state.items;
    var bootsArr = this.state.boots;    
    var arr = []
    var boots = bootsArr[Math.floor(Math.random()*bootsArr.length)]

    if(this.state.smite) {
      arr.push(smiteItems[Math.floor(Math.random()*smiteItems.length)])
    } else {
      arr.push(ultimateArray[Math.floor(Math.random()*ultimateArray.length)])
    }
    arr.push(ultimateArray[Math.floor(Math.random()*ultimateArray.length)])
    arr.push(ultimateArray[Math.floor(Math.random()*ultimateArray.length)])
    arr.push(ultimateArray[Math.floor(Math.random()*ultimateArray.length)])
    arr.push(ultimateArray[Math.floor(Math.random()*ultimateArray.length)])

    this.setState({
      ultimateItems: arr,
      boots: boots
    })
  }
  render() {
    return(
      <div>
        <img alt={this.state.boots.name} src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/' + this.state.boots.image.full} />
        {this.state.ultimateItems.map((item, index)=> {
          return <img key={index} alt={item} src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/' + item + '.png'} />
        })}
      </div>
    )
  }
}

module.exports = ItemSelect;