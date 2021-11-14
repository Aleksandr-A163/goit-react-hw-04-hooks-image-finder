import { useState } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";
import PropTypes from 'prop-types'

function SearchBar ({onSubmit}) {

  const [searchQuery, setQuery] = useState('');
    
  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);

    if (searchQuery.trim() === '') {
      toast.error("Please enter the query of the request");
      return;
    }
    setQuery("");
  };


    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleChange}
          />        </form>
      </header>
    );
}
  
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default SearchBar;