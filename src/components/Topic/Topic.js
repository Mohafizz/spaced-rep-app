import React, { Component } from "react";
import "./Topic.css";
import Card from "../Card/Card";
import DrawCard from "../DrawCard/DrawCard";
import { DB_CONFIG } from "../../Config/Firebase/db_config";
import firebase from "firebase/app";
import "firebase/database";

class Topic extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("title")
      .child("Functions")
      .child("cards");

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      title: {},
      cards: [],
      currentCard: {}
    };
  }

  componentWillMount() {
    const currentCards = this.state.cards;

    this.database.on("child_added", snap => {
      currentCards.push({
        id: snap.key,
        question: snap.val().question,
        answer: snap.val().answer
      });
      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      });
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
        <h1>
          {Object.keys(this.state.title).map((element, i) => {
            return <li index={i}>{element}/></li>;
          })}
        </h1>

        <Card
          question={this.state.currentCard.question}
          answer={this.state.currentCard.answer}
          id={parseInt(this.state.currentCard.id) + 1}
        />
        <br />
        <DrawCard drawCard={this.updateCard} />
      </div>
    );
  }
}

export default Topic;
