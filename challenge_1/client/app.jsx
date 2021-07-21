import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      data: []
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount = () => {
    console.log('hello');
  }

  change = (e) => {
    e.preventDefault()
    console.log('e.target.value: ', e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit = (e) => {
    e.preventDefault()
  }

  search = (keyword) => {
    fetch(`http://localhost:3000/events?category2=${keyword}`)
      .then(res => res.json())
      .then(result =>
        this.setState({
          data: result
        })
      )
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        <h1>Hellow World</h1>
        <form onSubmit={this.submit}>
          <label>
            Search our Historical Events Archive:
            <input type="text" name="keyword" default="enter a historical place" onChange={this.change}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

// export default App;

ReactDOM.render(<App />, document.getElementById('app'));