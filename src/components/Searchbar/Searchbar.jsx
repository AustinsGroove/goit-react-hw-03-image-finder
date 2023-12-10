import { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      query: value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const searchParameter = this.state.query.trim();
    if (!searchParameter) {
      alert('Please enter your search query!');
      return;
    }
    return this.props.onSubmit(searchParameter);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
