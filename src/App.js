import "./App.css";
import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "Bini",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Sunshine Dreams",
    artist: "Aurora Sky",
    genre: "Indie Pop",
  },
  {
    id: 3,
    title: "Neon Nights",
    artist: "Electric Pulse",
    genre: "Electronic",
  },
  {
    id: 4,
    title: "Moonlit Melodies",
    artist: "Stellar Beats",
    genre: "Chillout",
  },
  {
    id: 5,
    title: "Rhythm of the Rain",
    artist: "Serenade Sisters",
    genre: "Folk",
  },
  {
    id: 6,
    title: "Starstruck",
    artist: "Galaxy Groove",
    genre: "Disco",
  },
  {
    id: 7,
    title: "Echoes in Eternity",
    artist: "Ethereal Ensemble",
    genre: "Ambient",
  },
  {
    id: 8,
    title: "City Lights",
    artist: "Urban Harmonics",
    genre: "R&B",
  },
  {
    id: 9,
    title: "Midnight Serenade",
    artist: "Moonlight Maestros",
    genre: "Jazz",
  },
  {
    id: 10,
    title: "Golden Days",
    artist: "Sunset Symphony",
    genre: "Orchestral",
  },
  {
    id: 11,
    title: "Dreamland Duet",
    artist: "Fantasy Fusion",
    genre: "New Age",
  },
  {
    id: 12,
    title: "Vibrant Vibes",
    artist: "Rainbow Rhythms",
    genre: "Reggae",
  },
  {
    id: 13,
    title: "Sunny Side Up",
    artist: "Morning Melodies",
    genre: "Acoustic",
  },
  {
    id: 14,
    title: "Oceanic Odyssey",
    artist: "Wave Riders",
    genre: "Surf Rock",
  },
  {
    id: 15,
    title: "Celestial Symphony",
    artist: "Stardust Orchestra",
    genre: "Classical",
  },
  {
    id: 16,
    title: "Funky Fusion",
    artist: "Groove Collective",
    genre: "Funk",
  },
  {
    id: 17,
    title: "Lunar Lullabies",
    artist: "Moonbeam Ensemble",
    genre: "Lullaby",
  },
  {
    id: 18,
    title: "Wildfire Waltz",
    artist: "Flame Dancers",
    genre: "Country",
  },
  {
    id: 19,
    title: "Electric Emotions",
    artist: "Voltage Vibe",
    genre: "EDM",
  },
  {
    id: 20,
    title: "Melodic Memories",
    artist: "Harmony Trio",
    genre: "Ballad",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Smooth Grooves",
    artist: "Soulful Sounds",
    genre: "R&B",
    userRating: 4,
  },
  {
    id: 2,
    title: "Jazzy Nights",
    artist: "Smooth Jazz Collective",
    genre: "Jazz",
    userRating: 5,
  },
  {
    id: 3,
    title: "Summer Vibes",
    artist: "Chill Beats",
    genre: "Chillout",
    userRating: 3,
  },
  {
    id: 4,
    title: "Electro Funk",
    artist: "Synthwave Sensation",
    genre: "Electronic",
    userRating: 4,
  },
  {
    id: 5,
    title: "Reggae Party",
    artist: "Island Beats",
    genre: "Reggae",
    userRating: 4,
  },
  {
    id: 6,
    title: "Pop Sensation",
    artist: "Melody Masters",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 7,
    title: "Rock Anthems",
    artist: "Guitar Heroes",
    genre: "Rock",
    userRating: 5,
  },
  {
    id: 8,
    title: "Hip Hop Beats",
    artist: "Rap Kings",
    genre: "Hip Hop",
    userRating: 3,
  },
  {
    id: 9,
    title: "Classical Gems",
    artist: "Orchestra Ensemble",
    genre: "Classical",
    userRating: 4,
  },
  {
    id: 10,
    title: "Funky Fusion",
    artist: "Groove Collective",
    genre: "Funk",
    userRating: 4,
  },
];

export function App() {
  const [musics, setMusics] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedBy, setSortedBy] = useState("title");
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongGenre, setNewSongGenre] = useState("");

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery.toLowerCase());
  };

  useEffect(() => {
    const filteredMusic = tempMusicData.filter(
      (music) =>
        music.title.toLowerCase().includes(searchQuery) ||
        music.artist.toLowerCase().includes(searchQuery) ||
        music.genre.toLowerCase().includes(searchQuery),
    );
    setMusics(filteredMusic);
  }, [searchQuery]);

  const addToPlaylist = (music) => {
    const isDuplicate = playlist.some((item) => item.id === music.id);
    if (!isDuplicate) {
      setPlaylist([...playlist, music]);
    }
  };

  const removeFromPlaylist = (musicId) => {
    const updatedPlaylist = playlist.filter((music) => music.id !== musicId);
    setPlaylist(updatedPlaylist);
  };

  const addNewSong = () => {
    if (newSongTitle && newSongArtist && newSongGenre) {
      const newId = musics.length + 1;
      const updatedMusics = [
        ...musics,
        {
          id: newId,
          title: newSongTitle,
          artist: newSongArtist,
          genre: newSongGenre,
        },
      ];
      setMusics(updatedMusics);
      setNewSongTitle("");
      setNewSongArtist("");
      setNewSongGenre("");
    }
  };

  const handleSort = (sortBy) => {
    setSortedBy(sortBy);
    const sortedMusic = [...musics].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy]),
    );
    setMusics(sortedMusic);
  };

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <NumResult musics={musics} />
      <Main>
        <Box title="Music List">
          <div className="MusicListHeader">
            <SortOptions onSort={handleSort} />
          </div>
          <div className="InputContainer">
            <input
              placeholder="Title"
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
            />
            <input
              placeholder="Artist"
              value={newSongArtist}
              onChange={(e) => setNewSongArtist(e.target.value)}
            />
            <input
              placeholder="Genre"
              value={newSongGenre}
              onChange={(e) => setNewSongGenre(e.target.value)}
            />
            <button onClick={addNewSong}>Add Song</button>
          </div>
          <MusicList
            musics={musics}
            addToPlaylist={addToPlaylist}
            addNewSong={addNewSong}
            removeFromPlaylist={removeFromPlaylist}
          />
        </Box>
        <Box title="My Playlist">
          <div className="PlaylistContainer">
            <div className="Playlist">
              <Playlist
                playlist={playlist}
                removeFromPlaylist={removeFromPlaylist}
              />
            </div>
          </div>
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ onSearch }) {
  const handleChange = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Logo />
      <Search onChange={handleChange} />
    </div>
  );
}

function NumResult({ musics }) {
  return (
    <p style={{ textAlign: "center" }}>
      Found <strong>{musics.length}</strong> songs
    </p>
  );
}

function Logo() {
  return (
    <h1 style={{ textAlign: "center", fontSize: 50, paddingTop: 10 }}>
      Music App
    </h1>
  );
}

function Search({ onChange }) {
  return (
    <div className="InputContainer">
      <input
        placeholder="Search for music..."
        id="input"
        className="input"
        name="text"
        type="text"
        onChange={onChange}
      />
    </div>
  );
}

function SortOptions({ onSort }) {
  return (
    <div>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="title">Click to Sort</option>
        <option value="title">Sort by Title</option>
        <option value="artist">Sort by Artist</option>
        <option value="genre">Sort by Genre</option>
      </select>
    </div>
  );
}

function Box({ children, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function MusicList({ musics, addToPlaylist, removeFromPlaylist }) {
  return (
    <div>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {music.title} by {music.artist} ({music.genre})
              </span>
              <button onClick={() => addToPlaylist(music)}>♥️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Playlist({ playlist, removeFromPlaylist }) {
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {music.title} by {music.artist}
            </span>
            <button onClick={() => removeFromPlaylist(music.id)}>x</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
