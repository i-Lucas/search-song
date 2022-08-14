import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetStyles from "./stylesheets/reset"
import GlobalStyle from "./stylesheets/global";

import NotFound from "./pages/notFound";
import Signin from "./pages/login";
import Search from "./pages/search";
import Lyrics from "./pages/lyrics";

import AdvancedSearch from "./pages/advanced";
import RankArtists from "./pages/artists";
import RankSongs from "./pages/songs";
import SavedSongs from "./pages/saved";

export default function App() {

    return (
        <BrowserRouter>
            <ResetStyles />
            <GlobalStyle />

            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/search" element={<Search />} />
                <Route path="/lyrics/:musicId" element={<Lyrics />} />
                <Route path="/search/advanced" element={<AdvancedSearch />} />
                <Route path="/saved/songs" element={<SavedSongs />} />
                <Route path="/rank/artists" element={<RankArtists />} />
                <Route path="/rank/songs" element={<RankSongs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};