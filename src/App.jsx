import React, { Component } from "react";
import * as API from "./service/service-api";
import Button from "./Components/Button/Button";
import LoaderSpinner from "./Components/Loader/Loader";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import Modal from "./Components/Modal/Modal";
import { mapper } from "./helpers/mapper";
import style from "./App.css";



class App extends Component {

  state = {
  page: 1,
  images: [],
  searchQuery: '',
  isLoading: false,
  largeImage: '',
  showModal: false,
  error: null,
  };
 

  componentDidUpdate(prevProps, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getImages()
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

    onChangeName = (searchQuery) => {
    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
    };
  
  clickLoadMore = (e) => {
     e.preventDefault();
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    })
  };

  modalClose = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  onClickLargeImage = (imageModal) => {
    this.setState({ largeImage: imageModal });
    this.modalClose();
  };

  getImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    API.getImages({ searchQuery, page })
      .then(response => {
      this.setState(prevState => ({
        images: [...prevState.images, ...mapper(response)],
      }));
    })
    .catch((error) => this.setState({ error: error }))
        .finally(() => this.setState({ isLoading: false }));
  };

  render() {
const {  images, showModal, isLoading, largeImage, searchQuery } = this.state;
    return(
      <div className={style.App}>
        <Searchbar onSubmit={this.onChangeName} />
        
        {images.length !== 0 ? (
          <ImageGallery images={images} onOpenModal={this.onClickLargeImage} />
          ) : (
          searchQuery !== '' && <p>No found image</p> 
        )}
        {isLoading && <LoaderSpinner />}
        {images.length >= 12 && <Button onClick={this.clickLoadMore} />}
        {showModal && (
          <Modal
            onClose={this.modalClose}
            imageModal={largeImage.largeImageURL}
          />
        )}

      </div>
    );
  }
}

export default App;
