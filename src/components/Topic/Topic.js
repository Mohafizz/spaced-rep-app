import React, { Component } from "react";
import "./Topic.css";
import Card from "../Card/Card";
import DrawCard from "../DrawCard/DrawCard";
import { DB_CONFIG } from "../../Config/Firebase/db_config";
import firebase from "firebase/app";
import "firebase/database";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const options = ["Arrays", "Topic 1", "Topic 2"];

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      selected: options[0],
      cards: [],
      currentCard: {}
    };
    this._onSelect = this._onSelect.bind(this);
    this.updateCard = this.updateCard.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("title")
      .child(this.state.selected)
      .child("cards");
  }

  _onSelect(option) {
    this.setState({ selected: option.value });
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

  render() {
    const defaultOption = this.state.selected;
    return (
      <div className="Topic">
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          // placeholder="Please select"
        />
        <Card
          question={this.state.currentCard.question}
          answer={this.state.currentCard.answer}
          id={parseInt(this.state.currentCard.id) + 1}
          total={this.state.cards.length}
        />
        <br />
        <DrawCard drawCard={this.updateCard} />
      </div>
    );
  }
}

export default Topic;
