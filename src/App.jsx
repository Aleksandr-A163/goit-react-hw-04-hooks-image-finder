import React, { useState, useEffect } from "react";
import * as API from "./service/service-api";
import Button from "./Components/Button/Button";
import LoaderSpinner from "./Components/Loader/Loader";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import Modal from "./Components/Modal/Modal";
import { mapper } from "./helpers/mapper";
import style from "./App.css";



function App () {
 
  const [searchQuery, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const getImages = () => {
      if (!searchQuery) {
        return;
      }
    setIsError(false);
    setIsLoading(true);

    API.getImages({ searchQuery, page })
      .then((response) => {
        setImages((prevImages) => 
          [...prevImages, ...mapper(response)],
        );
      })
      .catch(error => {
        setIsError(error);
      })
      .finally(() => {
        setIsLoading(false);

        if (page > 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
            });
          }
        });
    };
    getImages();
  }, [page, searchQuery]);

const onChangeName = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    };
  
const clickLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

const modalClose = () => {
    setShowModal(!showModal);
  };

const onClickLargeImage = (imageModal) => {
    setLargeImage(imageModal);
    modalClose();
  };

  return(
      <div className={style.App}>
        <Searchbar onSubmit={onChangeName} />
        
        {images.length !== 0 ? (
          <ImageGallery images={images} onOpenModal={onClickLargeImage} />
          ) : (
          isError && <p>No found image</p> 
        )}
        {isLoading && <LoaderSpinner />}
        {images.length >= 12 && <Button onClick={clickLoadMore} />}
        {showModal && (
          <Modal
            onClose={modalClose}
            imageModal={largeImage.largeImageURL}
          />
        )}

      </div>
    );
  }

export default App;
