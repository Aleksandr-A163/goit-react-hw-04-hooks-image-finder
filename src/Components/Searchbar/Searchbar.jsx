import { Component } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";
import PropTypes from 'prop-types'

class SearchBar extends Component {

    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      searchQuery: PropTypes.string
  }
  
  state = {
    searchQuery: '',
  };


    
  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchQuery} = this.state;

    if (searchQuery.trim() === '') {
      toast.error("Please enter the query of the request");
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: "" });

  };
  render() {
      const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}



export default SearchBar;