import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./component/Search";
import Results from "./component/Results";
import Popup from "./component/Popup";
import WatchedMovies from "./component/WatchedMovies";
import Galaxy from "./component/Galaxy";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  // Initialize watched state with localStorage data
  const getInitialWatched = () => {
    try {
      const savedWatched = localStorage.getItem("watchedMovies");
      return savedWatched ? JSON.parse(savedWatched) : [];
    } catch (error) {
      console.error("Error parsing saved watched movies:", error);
      return [];
    }
  };

  const [watched, setWatched] = useState(getInitialWatched);
  const [showWatched, setShowWatched] = useState(false);
  const [isUndefind, setIsUndefined] = useState(false);

  // Save watched movies to localStorage whenever watched state changes
  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  const apiurl = "http://www.omdbapi.com/?apikey=eaed2fa3";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        if (data.Response === "False" || !data.Search) {
          setIsUndefined(true);
          setState((prevState) => ({ ...prevState, results: [] }));
        } else {
          setIsUndefined(false);
          setState((prevState) => ({ ...prevState, results: data.Search }));
        }
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  const addToWatched = (movie) => {
    const movieWithRating = { ...movie, rating: 0 };
    if (!watched.some((m) => m.imdbID === movie.imdbID)) {
      setWatched((prevWatched) => [...prevWatched, movieWithRating]);
    }
  };

  const updateRating = (imdbID, newRating) => {
    setWatched((prevWatched) =>
      prevWatched.map((movie) =>
        movie.imdbID === imdbID ? { ...movie, rating: newRating } : movie
      )
    );
  };

  const deleteMovie = (imdbID) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  return (
    <>
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
        speed={1.5}
      />
      <div className="App">
        <div className="menu">
          <div className="logo">Movie Library</div>
          <div className="menu-items">
            <a
              onClick={() =>
                setShowWatched((prevStat) => {
                  return false;
                })
              }
            >
              Home
            </a>
            <a
              onClick={() =>
                setShowWatched((prevStat) => {
                  return true;
                })
              }
            >
              My library
            </a>
          </div>
        </div>

        {!showWatched ? (
          <main>
            <header>
              <h1>Movie & Series Library</h1>
            </header>
            <Search handleInput={handleInput} search={search} />
            {!isUndefind ? (
              <>
                <Results results={state.results} openPopup={openPopup} />

                {typeof state.selected.Title != "undefined" ? (
                  <Popup
                    addToWatched={addToWatched}
                    selected={state.selected}
                    closePopup={closePopup}
                  />
                ) : (
                  false
                )}
              </>
            ) : (
              <p className="notFound">No result for this input try again !!</p>
            )}
            ;
          </main>
        ) : (
          false
        )}

        {showWatched ? (
          <main>
            <header>
              <h1>My Library </h1>
            </header>
            <WatchedMovies
              results={watched}
              onRatingChange={updateRating}
              onDeleteMovie={deleteMovie}
            />
          </main>
        ) : (
          false
        )}
      </div>
    </>
  );
}

export default App;
