import Result from "./Result";
function WatchedMovies({ results, onRatingChange,onDeleteMovie }) {
  return (
    <section className="results">
      {" "}
      {results.map((result) => (
        <Result 
          key={result.imdbID} 
          result={result} 
          canRate={true} 
          onRatingChange={onRatingChange}
          onDeleteMovie = {onDeleteMovie}
        />
      ))}{" "}
    </section>
  );
}
export default WatchedMovies;
