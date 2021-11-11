import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onOpenModal,
}) => {
    return (

        <li className={style.imageGalleryItem}>
          <img
            src={webformatURL}
            alt=""
            className={style.imageGalleryItem__image}
            onClick={() => onOpenModal({ largeImageURL })}
          />
        </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;