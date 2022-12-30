import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      selectedPokemon: {},
    };
    this.selectPokemon = this.selectPokemon.bind(this);
    this.return = this.return.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.reset = this.reset.bind(this);
    this.postPokemon = this.postPokemon.bind(this);
  }

  async selectPokemon(pokemonId) {
    {
      try {
        const res = await axios.get(`/api/pokemon/${pokemonId}`);
        const selectedPokemon = res.data;
        await this.setState({ selectedPokemon: selectedPokemon });
      } catch (err) {
        console.log("There was a problem selecting a Pokemon");
        console.log(err);
      }
    }
  }

  async deletePokemon() {
    try {
      const id = this.state.selectedPokemon.id;
      console.log("deleting pokemon id:", id);
      window.location.reload();
      await axios.delete(`/api/${id}`, { delete: id });
    } catch (err) {
      console.log("There was a problem deleting your Pokemon!");
      console.log(err);
    }
  }

  async postPokemon() {
    try {
      console.log("hello");
    } catch (e) {
      console.log(e);
    }
  }

  async reset() {
    try {
      const { data } = await axios.get("/api/pokemon");
      await this.setState({ pokemon: data });
      this.return();
      console.log("component mounted!");
    } catch (e) {
      console.log("There was a problem in the reset");
    }
  }

  async componentDidMount() {
    {
      try {
        this.reset();
      } catch (err) {
        console.log("There was a problem making contact!");
        console.log(err);
      }
    }
  }

  async return() {
    try {
      this.setState({ selectedPokemon: {} });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Pokemon Dealer's Choice</h1>
        <div>
          {this.state.selectedPokemon.id ? (
            <div>
              <h1> {this.state.selectedPokemon.name} </h1>
              <h2> {this.state.selectedPokemon.description} </h2>
              <button onClick={() => this.deletePokemon()}> delete </button>
              <button onClick={() => this.return()}> Go back </button>
            </div>
          ) : (
            <ul>
              {this.state.pokemon.map((poke) => {
                return (
                  <li key={poke.id} onClick={() => this.selectPokemon(poke.id)}>
                    {poke.name}
                  </li>
                );
              })}
            </ul>
          )}
          <form method="POST" action="/api/post">
            <h2> Make a new Pokemon</h2>
            <p>Name</p>
            <input name="name"></input>
            <p>Description</p>
            <input name="description"></input>
            <button> Post a Pokemon </button>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
