import { useEffect, useState } from '@lynx-js/react';
import './App.css';
import type { TouchEvent } from '@lynx-js/types';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

// Simple genre mapping
const genres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
];

// Year ranges
const yearRanges = [
  { name: '2020+', from: 2020, to: 2023 },
  { name: '2010s', from: 2010, to: 2019 },
  { name: '2000s', from: 2000, to: 2009 },
  { name: 'Older', from: 1900, to: 1999 },
];

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

// Complete genre mapping for TMDb
const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple filter states
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [useHighestRated, setUseHighestRated] = useState(false);

  // Debug state
  const [debugInfo, setDebugInfo] = useState({
    totalMovies: 0,
    filteredMovies: 0,
    apiUrl: '',
    currentFilters: {
      genre: 'All',
      year: 'All',
      sortBy: 'Random',
    },
  });

  // Helper function to convert genre IDs to names
  const getGenreNames = (genreIds: number[]): string => {
    if (!genreIds || genreIds.length === 0) return 'Unknown';

    return genreIds.map((id) => GENRE_MAP[id] || 'Unknown').join(', ');
  };

  // Fetch movies with filters
  const fetchMovies = async (genreId: number | null, year: string) => {
    setLoading(true);

    try {
      // Base URL for popular movies
      let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

      // Add genre filter if selected
      if (genreId !== null) {
        url += `&with_genres=${genreId}`;
      }

      // Add year filter if selected
      if (year !== 'all') {
        const yearStart = parseInt(year);
        const yearEnd = yearStart + 9;
        url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
      }

      // Update debug info with API URL
      setDebugInfo((prev) => ({
        ...prev,
        apiUrl: url,
      }));

      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results);
      setDebugInfo((prev) => ({
        ...prev,
        totalMovies: data.results.length,
      }));

      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMovies(null, 'all');
  }, []);

  // Event handlers
  function handleGenreAll(e: TouchEvent) {
    setSelectedGenre(null);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        genre: 'All',
      },
    }));
  }

  function handleGenreAction(e: TouchEvent) {
    setSelectedGenre(28);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        genre: 'Action',
      },
    }));
  }

  function handleGenreComedy(e: TouchEvent) {
    setSelectedGenre(35);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        genre: 'Comedy',
      },
    }));
  }

  function handleGenreDrama(e: TouchEvent) {
    setSelectedGenre(18);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        genre: 'Drama',
      },
    }));
  }

  function handleYearAll(e: TouchEvent) {
    setSelectedYear('all');
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        year: 'All',
      },
    }));
  }

  function handleYear2020s(e: TouchEvent) {
    setSelectedYear('2020');
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        year: '2020s',
      },
    }));
  }

  function handleYear2010s(e: TouchEvent) {
    setSelectedYear('2010');
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        year: '2010s',
      },
    }));
  }

  function handleYear2000s(e: TouchEvent) {
    setSelectedYear('2000');
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        year: '2000s',
      },
    }));
  }

  function handleRandomRecommend(e: TouchEvent) {
    setUseHighestRated(false);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        sortBy: 'Random',
      },
    }));
  }

  function handleHighestRecommend(e: TouchEvent) {
    setUseHighestRated(true);
    setDebugInfo((prev) => ({
      ...prev,
      currentFilters: {
        ...prev.currentFilters,
        sortBy: 'Highest Rated',
      },
    }));
  }

  async function handleGetMovies(e: TouchEvent) {
    // Make a fresh API call with the current filters
    const freshMovies = await fetchMovies(selectedGenre, selectedYear);

    if (freshMovies.length === 0) {
      setDisplayedMovies([]);
      setDebugInfo((prev) => ({
        ...prev,
        filteredMovies: 0,
      }));
      return;
    }

    // Either highest rated or random
    if (useHighestRated) {
      // Sort by rating
      const sortedMovies = [...freshMovies].sort(
        (a, b) => b.vote_average - a.vote_average,
      );
      setDisplayedMovies(sortedMovies.slice(0, 3));
      setDebugInfo((prev) => ({
        ...prev,
        filteredMovies: sortedMovies.length,
      }));
    } else {
      // Random selection
      const selected = [];
      const usedIndices = new Set();

      while (selected.length < 3 && usedIndices.size < freshMovies.length) {
        const randomIndex = Math.floor(Math.random() * freshMovies.length);
        if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex);
          selected.push(freshMovies[randomIndex]);
        }
      }

      setDisplayedMovies(selected);
      setDebugInfo((prev) => ({
        ...prev,
        filteredMovies: freshMovies.length,
      }));
    }
  }

  return (
    <page>
      <scroll-view scroll-orientation="vertical" className="AppContainer">
        <view className="MainContent">
          <view className="Header">
            <text className="Title">MovieMate</text>

            <view className="FilterSection">
              <text className="FilterLabel">
                Genre:{' '}
                {selectedGenre === null
                  ? 'All'
                  : selectedGenre === 28
                    ? 'Action'
                    : selectedGenre === 35
                      ? 'Comedy'
                      : 'Drama'}
              </text>
              <view className="FilterOptions">
                <view
                  className={
                    selectedGenre === null
                      ? 'FilterButtonActive'
                      : 'FilterButton'
                  }
                  bindtap={handleGenreAll}
                >
                  <text>All</text>
                </view>
                <view
                  className={
                    selectedGenre === 28 ? 'FilterButtonActive' : 'FilterButton'
                  }
                  bindtap={handleGenreAction}
                >
                  <text>Action</text>
                </view>
                <view
                  className={
                    selectedGenre === 35 ? 'FilterButtonActive' : 'FilterButton'
                  }
                  bindtap={handleGenreComedy}
                >
                  <text>Comedy</text>
                </view>
                <view
                  className={
                    selectedGenre === 18 ? 'FilterButtonActive' : 'FilterButton'
                  }
                  bindtap={handleGenreDrama}
                >
                  <text>Drama</text>
                </view>
              </view>
            </view>

            <view className="FilterSection">
              <text className="FilterLabel">
                Year:{' '}
                {selectedYear === 'all'
                  ? 'All'
                  : selectedYear === '2020'
                    ? '2020s'
                    : selectedYear === '2010'
                      ? '2010s'
                      : '2000s'}
              </text>
              <view className="FilterOptions">
                <view
                  className={
                    selectedYear === 'all'
                      ? 'FilterButtonActive'
                      : 'FilterButton'
                  }
                  bindtap={handleYearAll}
                >
                  <text>All</text>
                </view>
                <view
                  className={
                    selectedYear === '2020'
                      ? 'FilterButtonActive'
                      : 'FilterButton'
                  }
                  bindtap={handleYear2020s}
                >
                  <text>2020s</text>
                </view>
                <view
                  className={
                    selectedYear === '2010'
                      ? 'FilterButtonActive'
                      : 'FilterButton'
                  }
                  bindtap={handleYear2010s}
                >
                  <text>2010s</text>
                </view>
                <view
                  className={
                    selectedYear === '2000'
                      ? 'FilterButtonActive'
                      : 'FilterButton'
                  }
                  bindtap={handleYear2000s}
                >
                  <text>2000s</text>
                </view>
              </view>
            </view>

            <view className="FilterSection">
              <text className="FilterLabel">
                Recommend: {useHighestRated ? 'Highest Rated' : 'Random'}
              </text>
              <view className="FilterOptions">
                <view
                  className={
                    !useHighestRated ? 'FilterButtonActive' : 'FilterButton'
                  }
                  bindtap={handleRandomRecommend}
                >
                  <text>Random</text>
                </view>
                <view
                  className={
                    useHighestRated ? 'FilterButtonActive' : 'FilterButton'
                  }
                  bindtap={handleHighestRecommend}
                >
                  <text>Highest Rated</text>
                </view>
              </view>
            </view>

            {/* 
            Debug Info - Uncomment if needed
            <view className="DebugSection">
              <text className="DebugTitle">Debug Info:</text>
              <text>Total Movies: {debugInfo.totalMovies}</text>
              <text>Filtered Movies: {debugInfo.filteredMovies}</text>
              <text>Current Filters:</text>
              <text>- Genre: {debugInfo.currentFilters.genre}</text>
              <text>- Year: {debugInfo.currentFilters.year}</text>
              <text>- Sort By: {debugInfo.currentFilters.sortBy}</text>
              <text className="DebugApiUrl">API URL: {debugInfo.apiUrl}</text>
            </view>
            */}

            <view className="RecommendButton" bindtap={handleGetMovies}>
              <text className="ButtonText">
                {loading ? 'Loading...' : '🎬 Get Movies'}
              </text>
            </view>
          </view>

          <view className="MovieList">
            {displayedMovies.length > 0 ? (
              displayedMovies.map((movie) => (
                <view key={movie.id} className="MovieCard">
                  <view className="PosterContainer">
                    <image
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      className="MoviePoster"
                    />
                  </view>
                  <view className="MovieInfo">
                    <text className="MovieTitle">{movie.title}</text>
                    <text className="MovieRating">
                      ★ {movie.vote_average.toFixed(1)}/10
                    </text>
                    <text className="MovieOverview">{movie.overview}</text>
                    <text className="MovieDate">
                      Release Date: {movie.release_date}
                    </text>
                    <text className="MovieGenres">
                      Genres: {getGenreNames(movie.genre_ids)}
                    </text>
                  </view>
                </view>
              ))
            ) : (
              <view className="EmptyState">
                <text className="EmptyText">
                  {loading
                    ? 'Loading movies...'
                    : 'Tap the button to get movie recommendations!'}
                </text>
              </view>
            )}
          </view>
        </view>
      </scroll-view>
    </page>
  );
}
