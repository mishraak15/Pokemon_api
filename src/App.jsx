import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card/Card";

function App() {
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  function fetchFullData() {
    setLoading(true);
    axios
      .get(process.env.POKEMON_URL)
      .then((res) => {
        
        let value = searchValue.toLowerCase().trim();

        if (value === "") {
          setFullData(res.data.results);
        } else {
          let newData = [];
          res.data.results.forEach((d) => {
            if (d?.name.includes(value)) {
              newData.push(d);
            }
          });

          setFullData(newData);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchFullData();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="App">
      <h2>Pokemons Assemble!!</h2>
      <div className="searchbar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter Pokemon name to search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={() => {
            fetchFullData();
          }}
        >
          Search
        </button>
      </div>

      <div className="data-container">
        {fullData?.length === 0 ? (
          <h2>No Match Found!!</h2>
        ) : (
          fullData?.map((d, index) => <Card key={index} data={d} />)
        )}
      </div>
    </div>
  );
}

export default App;
