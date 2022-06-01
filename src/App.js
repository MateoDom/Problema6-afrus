import styles from "./App.module.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const onSubmit =  (e) => {
    e.preventDefault();
    setPokemon([]);
    setError(false);
    setLoading(true);

    if(input.length === 0)  {
      setLoading(false);
      setError(true);
      return;
    }
      setTimeout(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`).then(res => {
      setPokemon([res.data]);
      setInput("");
      setLoading(false);

    }).catch(err => {
      setLoading(false);
      setError(true);
    });
  }, 1000);


  };

  const colors = {
  fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#FFFFFF'
}

  return (
    <div className={styles.container}>
      <h1>Pokemons</h1>
      <div className={styles.search_container}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Buscar pokemón..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.search_button} onClick={(e) => onSubmit(e)}>
          +
        </button>
      </div>
 

      {loading ? <img className={styles.loading} src="https://c.tenor.com/fSsxftCb8w0AAAAd/pikachu-running.gif" alt="loading"/> : null}
      {error ? <div>
          <p className={styles.error}>Error Pokemón no encontrado {":("}</p>
          <img src="https://c.tenor.com/WQFHqtAlfSAAAAAC/sad-pokemon.gif" alt="error"/>
        </div> : null}
      <div className={styles.pokemon_container}>
        {pokemon.length > 0 && pokemon.map((pokemon) => (
          <div className={styles.pokemon_card} key={pokemon.id} style={{backgroundColor: colors[pokemon.types[0].type.name] || '#fff'}}>
            <div
              className={styles.pokemon_img}
              style={{
                backgroundImage: `url(${pokemon.sprites.front_default})`,
              }}
            ></div>
            <div className={styles.pokemon_info}>
              <h2>{pokemon.name}</h2>
              <p>#{pokemon.id.toString().padStart(3,0)}</p>
            </div>
            <div className={styles.pokemon_card_text}>
              <p>Weight: {pokemon.weight}</p>
              <p>Height: {pokemon.height}</p>
            </div>
            <div className={styles.list_container}>
             {pokemon.types.map((type) => (
                  <p>{type.type.name}</p>
                ))}
      
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
