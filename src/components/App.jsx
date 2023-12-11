import { Component } from 'react';

import getImages from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loadMore: false,
    loader: false,
    modalImage: {},
    showModal: false,
  };

  search = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  openModal = image => {
    this.setState({
      modalImage: image,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ loader: true });
      this.getData();
    }
  }

  async getData() {
    const { page, query } = this.state;
    const data = await getImages(query, page);
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...data.hits],
        loadMore: page < Math.ceil(data.totalHits / 12),
        loader: false,
      };
    });
  }

  render() {
    const { images, loadMore, loader, showModal, modalImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.search} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loadMore && <LoadMoreButton onClick={this.loadMore} />}
        {loader && <Loader />}
        {showModal && <Modal image={modalImage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export { App };
