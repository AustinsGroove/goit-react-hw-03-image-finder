import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = props => {
  return (
    <ul className="ImageGallery">
      {props.images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          openModal={props.openModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
