import React from "react";
import { connect } from "react-redux";
import { toggleFavorite } from "../actions/favoriteActions";
import styled from "styled-components";
import { isFavorite } from "../utils";
import { closeModal } from "../actions/modalActions";

const Menu = ({ items }) => {
  const mappedItems = items.map((i, key) => {
    return (
      <li key={key}>
        <img alt={i.name} src={i.thumbnail} />
        <div>
          <p>{i.name}</p>${i.price.toFixed(2)}
        </div>
      </li>
    );
  });
  return <MenuStyled>{mappedItems}</MenuStyled>;
};

class Modal extends React.Component {
  toggleFavorite = () => {
    const { details } = this.props;
    this.props.toggleFavorite(details);
  };
  handleClose = () => {
    this.props.closeModal("DETAILS_MODAL");
  };

  render() {
    const { details, modals, favorites } = this.props;
    const show = modals.find(i => i === "DETAILS_MODAL");
    return (
      <React.Fragment>
        {show && (
          <DetailsStyled>
            <div className="content">
              <div
                className="cover"
                style={{ backgroundImage: `url(${details.images.featured})` }}
              >
                <h2>
                  {details.name} <small>Rating: {details.rating}</small>{" "}
                </h2>
              </div>

              <header>
                <button onClick={this.toggleFavorite} className="btn-favorite">
                  {isFavorite(details, favorites) ? (
                    <i className="fas fa-heart" />
                  ) : (
                    <i className="far fa-heart" />
                  )}
                </button>
                <p>
                  <i className="fas fa-map-marker-alt icons" />
                  {details.location.address}
                </p>
                <p>
                  <i className="fas fa-clock  icons" />
                  {details.business_hours.opening} -{" "}
                  {details.business_hours.closing}
                </p>

                <p>
                  <i className="fas fa-info-circle  icons" />
                  {details.short_description}
                </p>
              </header>
              <button onClick={this.handleClose} className="btn-close">
                <i className="fas fa-times" />
              </button>

              <Menu items={details.menu} />
            </div>
          </DetailsStyled>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  details: state.shops.details,
  modals: state.modals.views,
  favorites: state.favorites.items
});

export default connect(
  mapStateToProps,
  { toggleFavorite, closeModal }
)(Modal);

const MenuStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1.5rem;
  li {
    display: flex;
    margin-bottom: 1rem;
    img {
      width: 80px;
      margin-right: 1rem;
      border-radius: 3px;
    }
  }
`;

const DetailsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  &,
  &:before {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  &:before {
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
  }
  .cover {
    height: 200px;
    background-size: cover;
    background-position: center;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    h2 {
      padding: 0.5rem 1.5rem;
      background-color: #ffffff80;
      width: 100%;
      margin: 0;
      display: flex;
      align-items: center;
      small {
        font-size: 11px;
        margin-left: auto;
      }
    }
  }
  .content {
    box-shadow: 0 0 5px 0 #666;
    border-radius: 5px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    .icons {
      margin-right: 0.5rem;
    }
    header {
      background-color: ${props => props.theme.primary};
      padding: 1.5rem;
      position: relative;
    }
  }
  .btn-close,
  .btn-favorite {
    background: none;
    border: none;
  }
  .btn-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background-color: #ffffff80;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    &:hover {
      background-color: #ffffff;
    }
  }
  .btn-favorite {
    font-size: 20px;
    position: absolute;
    right: 1rem;
    bottom: -1rem;
    background: #fff;
    border-radius: 1000px;
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border: 2px solid #eca300;
    color: ${props => props.theme.primary};
    &:hover {
      box-shadow: 0 0 5px 0 ${props => props.theme.primary};
    }
  }
`;
