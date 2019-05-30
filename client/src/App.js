import React from "react";
import Mapper from "./components/Mapper";
import DetailsModal from "./components/DetailsModal";
import Favorites from "./components/Favorites";
import "normalize.css";
import styled from "styled-components";

class App extends React.Component {
  handleLocate = item => {
    // this.setState({
    //   position: [item.location.lat, item.location.lng],
    //   zoom: this.state.selected === null ? 15 : 14,
    //   selected: this.state.selected === item ? null : item
    // });
  };
  render() {
    return (
      <div className="App">
        <Mapper
          position={[1.294903, 103.839226]}
          zoom={13}
          onClick={this.handleMapClick}
        />
        <Container>
          <Favorites onClick={this.handleLocate} />
          <DetailsModal />
        </Container>
      </div>
    );
  }
}

export default App;

const Container = styled.div`
  padding: 2rem;
`;
