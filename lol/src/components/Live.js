const React = require('react');

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: props.matchData
    }
  }
  render() {
    return(
      <div>
        {console.log(this.state.matchData)}
      </div>
    )
  }
}


module.exports = Live;