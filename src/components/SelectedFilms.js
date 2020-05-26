import React, { Component } from "react";
import { H4,Card,Elevation ,Colors} from "@blueprintjs/core";
class SelectedFilms extends Component {
  render() {
    return (
      <div>
      <Card interactive={true} elevation={Elevation.TWO} style={{ alignContent:'center' ,color: Colors.BLACK, background: Colors.INDIGO5 , width:'500px' ,margin:'auto ',marginTop:'15px'}} >
        <h2>---- You Selected ----  </h2>
        {this.props.selectedFilms.map(film => {
          return (
            <div key={film}>
              <H4>- {film}</H4>
            </div>
          );
        })}
        </Card>
      </div>
    );
  }
}
export default SelectedFilms;
