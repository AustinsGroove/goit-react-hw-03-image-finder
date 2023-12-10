import { Component } from 'react';

class Modal extends Component {
  handleClick = e => {
    if (e.target.className === 'Overlay') {
      this.props.closeModal();
    }
  };

  handleEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { image } = this.props;
    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
