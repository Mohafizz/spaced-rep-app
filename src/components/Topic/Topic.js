import React, { Component } from "react";
import "./Topic.css";
import Card from "../Card/Card";
import DrawCard from "../DrawCard/DrawCard";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
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

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({ currentCard: this.getRandomCard(currentCards) });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Topic">
        <h1>{this.props.title}</h1>
        <Card
          question={this.state.currentCard.question}
          answer={this.state.currentCard.answer}
        />
        <DrawCard drawCard={this.updateCard} />
      </div>
    );
  }
}

export default Topic;
