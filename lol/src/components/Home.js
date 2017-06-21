const React = require('react');
const Container = require('./Container');

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home!</h1>
        <Container/>
      </div>
    )
  }
}

module.exports = Home;