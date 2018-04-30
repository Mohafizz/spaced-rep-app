import React, { Component } from "react";

class DrawCard extends Component {
  constructor(props) {
    super(props);
    this.drawCard = this.drawCard.bind(this);
  }

  drawCard() {
    this.props.drawCard();
  }

  render(props) {
    return (
      <div className="button-container">
        <button className="btn" onClick={this.drawCard}>
          Draw card
        </button>
      </div>
    );
  }
}

export default DrawCard;
