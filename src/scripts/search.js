import { dataSets } from './config';
import {
    renderSearchResultsHeader,
    renderEmptySearch,
    renderTrackSearchResult} from './view';

// Typeahead Bloodhound configs
export const spotifyTrack = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: `https://api.spotify.com/v1/search?query=%QUERY&type=track`,
        wildcard: '%QUERY',
        filter: response => response.tracks.items
    }
});

// Typeahead Bloodhound datasets
export const spotifyTrackDataset = {
    name: dataSets.track.name,
    display: suggestion => suggestion.name,

    limit: 10,
    source: spotifyTrack,
    templates: {
        header: renderSearchResultsHeader,
        empty: renderEmptySearch,
        suggestion: renderTrackSearchResult
    }
};
