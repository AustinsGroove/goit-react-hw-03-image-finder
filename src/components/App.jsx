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
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ loader: true });
      getImages(this.state.query, this.state.page).then(data => {
        if (this.state.query !== prevState.query) {
          this.setState({
            images: data.hits,
            loadMore: this.state.page < Math.ceil(data.totalHits / 12),
            loader: false,
          });
        } else {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...data.hits],
              loadMore: this.state.page < Math.ceil(data.totalHits / 12),
              loader: false,
            };
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.search} />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.loadMore && <LoadMoreButton onClick={this.loadMore} />}
        {this.state.loader && <Loader />}
        {this.state.showModal && (
          <Modal image={this.state.modalImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export { App };
