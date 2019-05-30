import React from "react";
import { connect } from "react-redux";
import { getFavorites, updateFavorite } from "../actions/favoriteActions";
import { toggleShop, setMapType } from "../actions/shopActions";
import styled from "styled-components";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { item, onSubmit } = this.props;
    item.notes = this.textInput.value;
    onSubmit(item);
    this.setState({ isEdit: false });
  };
  render() {
    const { item } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.isEdit ? (
          <React.Fragment>
            <input
              defaultValue={item.notes}
              type="text"
              ref={input => (this.textInput = input)}
              placeholder="Add note..."
            />
            <button type="submit" className="btn-submit">
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => this.setState({ isEdit: false })}
              type="button"
              className="btn-cancel"
            >
              <i className="fas fa-times" />
            </button>
          </React.Fragment>
        ) : item.notes ? (
          <React.Fragment>
            <label>Notes: </label>
            {item.notes}
            <button
              type="button"
              className="btn-edit"
              onClick={() => this.setState({ isEdit: true })}
            >
              <i className="far fa-edit" />
            </button>
          </React.Fragment>
        ) : (
          <button
            type="button"
            className="btn-note"
            onClick={() => this.setState({ isEdit: true })}
          >
            Add Note
          </button>
        )}
      </form>
    );
  }
}

class Favorites extends React.Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  handleSubmit = item => {
    this.props.updateFavorite(item);
  };
  handleLocate = item => {
    this.props.setMapType("ALL");

    this.props.toggleShop(item);
  };
  render() {
    const { favorites, locate } = this.props;
    const mappedFavorites = favorites.map((item, key) => {
      const img = item.images.featured || "https://via.placeholder.com/150x50";
      return (
        <li
          key={key}
          className={`${locate && locate.id === item.id ? "is-active" : ""}`}
        >
          <div className="image" onClick={() => this.handleLocate(item)}>
            <div style={{ backgroundImage: `url(${img})` }}>
              <img src={img} alt={item.name} />
            </div>
          </div>
          <div>
            <h2>
              <a onClick={() => this.handleLocate(item)}>{item.name}</a>
            </h2>
            <p>{item.location.address}</p>
            <Notes onSubmit={this.handleSubmit} item={item} />
          </div>
        </li>
      );
    });

    return (
      <FavoritesStyled>
        <h2>Favorites</h2>
        <ul>{mappedFavorites}</ul>
      </FavoritesStyled>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.shops.locate,
    favorites: state.favorites.items
  };
};

export default connect(
  mapStateToProps,
  { getFavorites, updateFavorite, toggleShop, setMapType }
)(Favorites);

const FavoritesStyled = styled.div`
  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 0;
    padding: 0;
    > li {
      padding: 0.3rem;
      border-radius: 3px;
      &.is-active {
        background-color: ${props => props.theme.primary};
      }
      h2 {
        margin-top: 0.5rem;
        font-size: 18px;
      }
      &:hover {
        .image > div {
          transform: scale(1.1);
        }
        button {
          opacity: 1;
        }
      }
    }
    .image {
      overflow: hidden;
      min-width: 200px;
      width: 100%;
      height: 130px;
      margin-right: 1rem;
      border-radius: 3px;
      cursor: pointer;
    }
    .image > div {
      transition: all 0.3s ease;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      img {
        display: none;
      }
    }
  }

  button {
    opacity: 0;
  }

  .btn-edit {
    background: none;
    border: none;
  }
  .btn-note,
  .btn-submit,
  .btn-cancel {
    border: 1px solid ${props => props.theme.success};
    background-color: ${props => props.theme.success};
    color: #fff;
    padding: 0.3rem 1rem;
    border-radius: 3px;
    margin-right: 0.5rem;
  }
  .btn-cancel {
    background: none;
    color: ${props => props.theme.success};
  }

  input {
    border: 1px solid ${props => props.theme.success};
    border-radius: 3px;
    padding: 0.3rem 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  @media only screen and (min-width: 48em) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media only screen and (min-width: 32em) {
    ul {
      li {
        display: flex;
      }
      .image {
        width: auto;
      }
    }
  }
`;
