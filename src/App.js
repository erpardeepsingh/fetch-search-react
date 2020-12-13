import React from 'react';
import './App.css';
import Card from './components/card'
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      query: "",
      page_no: 1,
      text: "Search results are empty"
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  callApi() {
    let number = window.getComputedStyle(document.getElementById("grid")).getPropertyValue("grid-template-columns").split(" ").length * 5;
    fetch(`https://api.jikan.moe/v3/search/anime?q="${this.state.query}"&limit=${number > 10 ? number : 10}&page=${this.state.page_no}`)
      .then(res => res.json())
      .then(res => {
        if (res.results)
          this.setState({ values: this.state.values.concat(res.results), text: "", error: res.results.length > 0 ? false : true });
      }).catch(err => {
        this.setState({ error: true })
      });
  }
  handleSearchChange = debounce(e => {
    this.setState({ query: e, page_no: 1, values: [], text: "loading..." }, () =>
      this.callApi());
  }, 500);
  componentDidMount() {
    this.callApi();
  }
  render() {
    return (
      <div className="App">
        <header>
          <input placeholder="Please enter query to get results" className="text-box" type="search" onChange={(e) => this.handleSearchChange(e.target.value)} />
        </header>
        <div id="grid" className="results">
          {this.state.values.length > 0 &&
            this.state.values.map(ele => <Card data={ele} />)
          }
        </div>

        {this.state.values.length > 0 && !this.state.error ?
          <button onClick={() => this.setState({ page_no: this.state.page_no + 1, text: "loading..." }, () => this.callApi())}>Load More</button>
          : <h1 style={{ color: "white" }}>{this.state.text}</h1>

        }</div>
    );
  }
}

export default App;
