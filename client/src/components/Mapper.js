import React from "react";
import { Map as LeafletMap, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";
import { getShops, showDetails, setMapType } from "../actions/shopActions";
import { openModal } from "../actions/modalActions";
import styled from "styled-components";
import moment from "moment";

const getTime = time => {
  const [h, m] = time.split(":");
  return moment(`${h}:${m}`, "hh:mm");
};

const checkTime = ({ opening, closing }) => {
  const open = getTime(opening);
  const close = getTime(closing);
  const dd = moment("16:30", "hh:mm");
  return dd.isBetween(open, close);
};

const RestaurantsMarkers = ({ items, selected, onClick }) => {
  return items.map((i, key) => {
    const img = i.images.featured || "https://via.placeholder.com/150x50";

    const {
      business_hours,
      location: { lat, lng }
    } = i;

    const isOpen = checkTime(business_hours);
    const isSelected = selected && selected.id === i.id;
    var myIcon = L.divIcon({
      iconSize: isSelected ? [150, 150] : [100, 100],
      html: `<div class="${
        isOpen ? "" : "is-closed"
      }"><div class="image"  style="background-image:url(${img})"></div><div class="name">${
        i.name
      }</div><span>${isOpen ? "Open" : "Closed"}</span> </div>`,
      className: isSelected ? "map-marker active" : "map-marker"
    });

    return (
      <MarkerStyled
        key={key}
        icon={myIcon}
        onClick={e => {
          onClick(i);
        }}
        position={[parseFloat(lat), parseFloat(lng)]}
      />
    );
  });
};

class Mapper extends React.Component {
  componentDidMount() {
    this.props.getShops();
  }

  componentDidUpdate() {
    const { locate } = this.props;
    if (locate && locate.location.lat) {
      this.node.contextValue.map.flyTo(
        [locate.location.lat, locate.location.lng],
        17
      );
    }
  }
  handleMarkerClick = item => {
    this.props.showDetails(item);
    this.props.openModal(["DETAILS_MODAL"]);
  };
  handleFilterChange = e => {
    this.props.setMapType(e.target.value);
  };

  render() {
    const { shops, locate, type, position, zoom } = this.props;
    const filteredShops =
      type === "ALL" ? shops : shops.filter(i => i.type === parseInt(type));

    const locs = filteredShops.reduce(function(total, value) {
      return total.concat([[value.location.lat, value.location.lng]]);
    }, []);

    const bounds = L.latLngBounds(locs);
    return (
      <MapperStyled>
        <LeafletMap
          ref={node => (this.node = node)}
          center={position}
          zoom={zoom}
          bounds={locs.length ? bounds : null}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RestaurantsMarkers
            onClick={this.handleMarkerClick}
            items={filteredShops}
            selected={locate}
            filter={type}
          />
        </LeafletMap>
        <FilterStyled>
          <select onChange={this.handleFilterChange} value={type}>
            <option value="ALL">All</option>
            <option value="0">Vegetarian</option>
            <option value="1">Pizza & Burgers</option>
            <option value="2">Pasta/Noodles & Rice Bowls</option>
          </select>
        </FilterStyled>
      </MapperStyled>
    );
  }
}

Mapper.Marker = Marker;
Mapper.Popup = Popup;

const mapStateToProps = state => {
  return {
    shops: state.shops.items,
    locate: state.shops.locate,
    type: state.shops.type
  };
};

export default connect(
  mapStateToProps,
  { getShops, showDetails, openModal, setMapType }
)(Mapper);

const MapperStyled = styled.div`
  position: relative;
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: all 0.3s ease;
  }
  .name,
  span {
    position: relative;
    color: #fff;
    text-shadow: 0 0 5px #000;
    width: 100%;
    font-size: 11px;
  }
  .name {
    padding: 0.5rem;
    line-height: 1.2rem;
  }

  span {
    margin-top: auto;
    padding: 0.2rem 0.3rem;
    background-color: #0080005c;
  }

  .is-closed {
    span {
      background-color: #ff00006e;
    }
  }

  .map-marker {
    width: 150px;
    box-shadow: 0 5px 5px 0 #666;
    background-color: #fff;
    border-radius: 5px;
    &:hover {
      .image {
        transform: scale(1.2);
      }
    }

    &.active {
      z-index: 9999 !important;
      &:after {
        background-color: ${props => props.theme.primary};
      }
      > div {
        border-color: ${props => props.theme.primary};
      }
      .name {
        font-size: 14px;
      }
    }
    &:after {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      background-color: #fff;
      bottom: -8px;
      left: 45%;
      transform: rotate(45deg);
      box-shadow: 0 5px 5px 0 #666;
      z-index: -1;
    }
    > div {
      border: 3px solid #fff;
      border-radius: 5px;
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      text-align: center;
    }
  }
`;

const MarkerStyled = styled(Mapper.Marker)``;

const FilterStyled = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 999;

  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  select {
    padding: 0.3rem 1rem;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.primary};
  }
`;
