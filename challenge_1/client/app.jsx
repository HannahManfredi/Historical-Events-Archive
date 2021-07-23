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
      keyword: ''
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
    console.log('page clicked')
    if (!kw) {
      kw = 'Greece';
    }
    axios
    .get(`http://localhost:3000/events?q=${kw}`)
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
    const selectedPage = e.selected;
    console.log('selectedPage: ', selectedPage)
    const offset = selectedPage * this.state.perPage;
    console.log('offset: ', offset)
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getData()
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
        <div>
          {this.state.postData}
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={6}
              pageRangeDisplayed={10}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));

