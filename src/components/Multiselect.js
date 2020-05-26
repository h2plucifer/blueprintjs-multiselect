import * as React from "react";

import {  MenuItem ,Colors} from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

class Multiselect extends React.Component {


getSelectedFilmIndex=(film)=> {
        return this.props.selectedFilms.indexOf(film.title);
}
isFilmSelected=(film)=> {
      return this.getSelectedFilmIndex(film) !== -1;
}

escapeRegExpChars=(text)=> {
    return text.replace(/([.*+?^=!:${}()|\]\\])/g, "\\$1");
}


highlightText=(text, query)=> {
    let lastIndex = 0;
    const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(this.escapeRegExpChars);
  if (words.length === 0) {
      return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens= [];
  while (true) {
      const match = regexp.exec(text);
      if (!match) {
          break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
          tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
      tokens.push(rest);
  }
  return tokens;
}
  itemRenderer=(item, {handleClick,modifiers })=> {
    if (!modifiers.matchesPredicate) {
      return null;
  }
    return (
      <MenuItem
        active={modifiers.active}
        key={item.title}
        label={item.title}
        text={item.title}
        onClick={handleClick}
        onKeyDown={this.keyPress}
        scrollToActiveItem={true}
        fill={true}
        icon={this.isFilmSelected(item) ? "tick" : "blank"}            
      />
    )
  }

  handleclick=(item)=> {
    this.props.handleSelected(item.title)
  }
  keyPress=(e)=>{
    if(e.keyCode === 13 && this.props.allowCreate){
      this.props.handleCreate(e.target.value);
     return
  }
}

handleItemSelect(item) {
  console.log(item);
  this.props.handleSelected(item.title)
}



  renderTag = (pt) => alert(pt);
  render() {
    let classname=(this.props.fill===true)? "bp3-fill":"bp3-popover-target"
   
    return (
      <div style={{width:'500px' , border:`2px solid ${Colors.BLUE3}` , padding :'10px', margin:'auto' , marginTop:'10px' }} >
      <MultiSelect
     
        items={this.props.availableFilms}
        itemRenderer={this.itemRenderer}
        tagRenderer={this.renderTag}
        onKeyDown={this.keyPress}
        noResults={<MenuItem disabled={true} text="No results." />}
        placeholder="Search Film"
        checked={this.props.fill}
        onItemSelect={this.handleItemSelect.bind(this)}
        className={classname}
      >
       
      </MultiSelect>
      </div>
    )
  }
}

export default Multiselect;