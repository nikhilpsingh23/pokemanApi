import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Api = () => {
  const [pokemon, setPokemon] = useState([]); // State to store Pokémon data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        ); // Fetch first 10 Pokémon
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data.results); // Set Pokémon data (results array)
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchPokemon();
  }, []); // Run once on component mount

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="d-flex flex-row flex-wrap justify-content-center gap-3 p-3">
            {pokemon.map((poke, index) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    {poke.name.charAt(0).toUpperCase() + poke.name}
                  </Card.Title>

                  <Button variant="warning">
                    URL {poke.url.substring(0, 15)}
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Api;
