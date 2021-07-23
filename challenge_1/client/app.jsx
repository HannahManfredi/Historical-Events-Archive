import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      // search_data: [],
      keyword: '',

      // pageCount: 0
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.getData = this.getData .bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount = () => {
    this.getData('Greece')
  }

  getData = (kw) => {
    axios
    .get(`http://localhost:3000/events?q=${kw}&_page=1&_limit=10`)
    .then(res => {
      const data = res.data;
      const slice = data.slice(0, 10)
      const postData = slice.map(result =>
        <React.Fragment>
          <ul>
            <li>{result.date}</li>
            <li>{result.category2}</li>
            <li>{result.description}</li>
        </ul>
        </React.Fragment>)
    if (this.state.loading) {
      this.setState({
        loading: !this.state.loading,
        pageCount: Math.ceil(res.data.length / this.state.perPage),


        postData
      });
    } else {
      this.setState({
        pageCount: Math.ceil(res.data.length / this.state.perPage),


        postData
      });
    }
  })
  }

  handlePageClick = (e) => {
    e.preventDefault();
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getData(this.state.keyword)
    });

  };

  change = (e) => {
    e.preventDefault()
    this.setState({
      keyword: e.target.value
    });
  }

  submit = (e) => {
    alert('submit button clicked')
    e.preventDefault()
    console.log('state after submit button clicked: ', this.state);
    this.search(this.state.keyword);
  }

  render() {
    return (
      <div>
        <h1>The Historical Places Archive</h1>
        <div>
          {this.state.postData}
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
        </div>
        <div className="form-container">
          <div className="form">
            <form onSubmit={this.submit}>
              <label>
                Dig up an artifact:
                <br></br><input type="text" name="keyword" onChange={this.change}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));


//OVERALL OBJECTIVE:
//Paginate the list of events using react-paginate, loading no more than ten at a time.
//Ensure you are implementing server-side pagination  NOT client-side pagination.

// Reminder: emphasis should be placed on creating well-defined interfaces, writing code with a clear separation of concerns, and using the principles of modularity, encapsulation, abstraction.

// Advanced Content
// That data is messy! Add an edit button on the UI to allow the historical event information to be edited. Allow those edits to be saved back to the server using a save button.
// Add the feature of "Favoriting" a historical event: when the user favorites an event, they are prompted for a "Favorite Set". The user may select an already existing "Favorite Set" or may wish to create a new "Favorite Set." What's a Favorite Set? Instead of having only one set of favorites, some sites (like Airbnb) allow users to create many sets of favorites, where each set has a unique name. For example, a user might favorite some events into "War Story" favorites and others into "Science Story" favorites.
// Use react-router to navigate throughout the app. Allow the user to navigate to a page where they can see all of their Favorite Sets and another page to see all the events of a selected Favorite Set. Don't forget to let the user navigate back to the search page.
// Nightmare Mode
// Replace json-server with your own server, created using Express+MongoDB