import PropTypes from "prop-types";
import style from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGallertItem";


export default function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={style.imageGallery}>
       {images.map((image) => (
         <ImageGalleryItem {...image} 
           key={image.id}
           onOpenModal={onOpenModal} />
         ))}
    </ul>
  );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired
};