const ImageGalleryItem = props => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={props.image.webformatURL}
        alt={props.image.tags}
        onClick={() => {
          props.openModal(props.image);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
