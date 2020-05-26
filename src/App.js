import React, { Component } from "react";
import SelectedFilms from "./components/SelectedFilms";
import Multiselect from "./components/Multiselect";
import { H5, Switch  ,Card, Elevation ,Colors} from "@blueprintjs/core";

const films = require("./components/films").Films;

class App extends Component {
  constructor(props) {
    super(props);
    this.element=React.createRef()
    this.state = {
      availableFilms: films,
      selectedFilms: [],
      allowCreate: true,
      fill: false
    };
  }
  handleFillChange = e => {
    this.handleSwitchChange("fill",e);
  };
  handleAllowCreateChange = e => {
    this.handleSwitchChange("allowCreate",e);
  };

  handleSwitchChange = (prop,e) => {
      const checked = e.currentTarget.checked;
    
      this.setState(
        state => ({ ...state, [prop]: checked }), () => {
        }
      ); 
  };

  handleSelected = film => {
        let index=this.state.selectedFilms.indexOf(film);
        this.setState({
              selectedFilms:(index!==-1)? (this.state.selectedFilms.filter(a=>a!==film)) : [...this.state.selectedFilms,film]
    })
  };


  handleCreate = customFilm => {
      let index=this.state.availableFilms.indexOf(customFilm);
      this.setState({
          availableFilms:(index!==-1)? this.state.availableFilms : [...this.state.availableFilms,{title:customFilm}],
      },()=>{
          this.handleSelected(customFilm);
      }
    )
  };

  render() {
    return (
    <>
    <div style={{textAlig:'center' ,width:'500px' , padding :'5px', margin:'auto' , marginTop:'10px' }} ><h2>Multiselect Film App</h2></div>
        <Multiselect   
              availableFilms={this.state.availableFilms} 
              selectedFilms={this.state.selectedFilms}
              handleSelected={this.handleSelected}
              handleCreate={this.handleCreate}
              allowCreate={this.state.allowCreate}
              fill={this.state.fill}
            
      />   
          {this.state.selectedFilms.length > 0 && (
                <SelectedFilms selectedFilms={this.state.selectedFilms} />
          )} 
    
       <Card interactive={true} elevation={Elevation.TWO} style={{ alignContent:'center' ,color: Colors.BLACK, background: Colors.INDIGO5 , width:'500px' ,margin :'auto' ,marginTop:'10px' ,justifyContent:'flex-end'}} >
          <H5>Customize your selection with following Props</H5>
          <Switch
                label="Allow creating new films"
                checked={this.state.allowCreate}
                onChange={this.handleAllowCreateChange}
          />
          <Switch
                label="Fill container width"
                checked={this.state.fill}
                onChange={this.handleFillChange}
          />
        </Card>
    </> 
    );
  }
}

export default App;
