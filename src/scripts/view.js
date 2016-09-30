import {dataSets} from './config';

/**
 * Render search results header
 *
 * @returns {string} - Compiled template
 */
export function renderSearchResultsHeader (query) {
    var title;

    switch (query.dataset) {
        case dataSets.track.name:
            title = dataSets.track.title;
            break;
        default:
            title = 'Search results';
            break;
    }

    var template = `<div class="tt-header"><h4 class="tt-header__title">${title}</h4></div>`;

    return template;
}

/**
 * Render "No results" message.
 *
 * @param {object} query - Query result from Typeahead
 * @returns {string} - Compiled template
 */
export function renderEmptySearch (query) {
    var header = renderSearchResultsHeader(query),
        message = 'No search results';

    var template = `<div>${header}
            <div class="tt-no-result">
                <div class="tt-no-result__description">${message}</div>
            </div>
        </div>`;

    return template;
}

/**
 * Render individual track search result
 *
 * @param {object} entry - Spotify track search result
 * @returns {string} - Compiled template
 */
export function renderTrackSearchResult (entry) {
    var title   = entry.name,
        album   = entry.album.name,
        url     = entry.external_urls.spotify;

    var images = entry.album.images.slice(0),
        thumbnail = images.pop();

    var artistNames = entry.artists.reduce((prev, curr) => prev.concat(curr.name), []);
    var artists = artistNames.join(', ');

    var template = `
        <article class="entity-link">
            <div class="entity-link__image">
                <img class="thumbnail" src="${thumbnail.url}" alt="${album} height="${thumbnail.width} width=${thumbnail.width}"">
            </div>
            <div class="entity-link__text">
                <div class="entity-link__title">
                    <span><em>${title}</em> by ${artists}</span>
                </div>
                <div class="entity-link__description">
                    <div>${album}</div>
                    <div><a class="js-open-spotify-window"
                            href="${url}">${url}</a></div>
                </div>
            </div>
            <div class="entity-link__actions">
                <svg class="js-delete-entry entity-link__delete" width="14" height="14" viewBox="-1 -1 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.846 7l-3.77-3.77L0 2.155 2.154 0 3.23 1.077 7 4.847l3.77-3.77L11.845 0 14 2.154 12.923 3.23 9.153 7l3.77 3.77L14 11.845 11.846 14l-1.077-1.077L7 9.153l-3.77 3.77L2.155 14 0 11.846l1.077-1.077" fill="currentColor"></path></svg>
            </div>
        </article>`;

    return template;
}
