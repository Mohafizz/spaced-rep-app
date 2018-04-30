import React, { Component } from "react";
import "./Topic.css";
import Card from "../Card/Card";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { id: 1, question: "Qn_1", answer: "Ans_1" },
        { id: 2, question: "Qn_2", answer: "Ans_2" },
        { id: 3, question: "Qn_3", answer: "Ans_3" },
        { id: 4, question: "Qn_4", answer: "Ans_4" },
        { id: 5, question: "Qn_5", answer: "Ans_5" }
      ],
      currentCard: {}
    };
  }

  componentWillMount() {
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    });
  }

  getRandomCard(currentCards) {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Topic">
        <Card
          question={this.state.currentCard.question}
          answer={this.state.currentCard.answer}
        />
      </div>
    );
  }
}

export default Topic;
