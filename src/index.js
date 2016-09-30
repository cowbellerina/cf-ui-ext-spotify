import './stylesheets/style.css';
import './stylesheets/entity-link.css';

import * as contentfulExtension from '../node_modules/contentful-ui-extensions-sdk/dist/cf-extension-api';
import { searchOptions } from './scripts/config';
import { spotifyTrackDataset } from './scripts/search';
import { renderTrackSearchResult } from './scripts/view';

(function ($, Bloodhound, window) {
    contentfulExtension.init(api => {
        /**
         * Open URL in a new pop-up window
         *
         * @param {Event} event
         */
        function openSpotifyWindow (event) {
            event.preventDefault();
            let url = $(event.currentTarget).attr('href');
            let strWindowFeatures = 'menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no';
            window.open(url, 'Spotify', strWindowFeatures);
        }

        /**
         * Render given entry
         *
         * @param {object} entry - entry
         */
        function renderEntry (entry) {
            let html = entry ? renderTrackSearchResult(entry) : '';
            $(selectedEntry).html(html);
        }

        /**
         * Select given entry
         *
         * @param {Event} event
         * @param {object} entry
         */
        function selectEntry (event, entry) {
            field.setValue(entry);
            renderEntry(entry);
        }

        /**
         * Remove current entry selection
         */
        function deleteEntry () {
            field.setValue(null);
            renderEntry(null);
            $(searchInput).typeahead('val', '');
        }

        // Whenever the size of this document changes we adjust the size of the
        // iframe in the Contentful App.
        api.window.startAutoResizer();

        const searchContainer = '#js-search-container';
        const searchInput = `${searchContainer} .js-typeahead`;
        const selectedEntry = '.js-typeahead-value';

        const field = api.field;
        let value = field.getValue();

        if (value) {
            renderEntry(value);
            $(searchInput).val(value.name);
        }

        $(searchInput)
          .typeahead(searchOptions, spotifyTrackDataset)
          .bind('typeahead:select', selectEntry);

        $(searchContainer)
            .on('click', '.js-delete-entry', deleteEntry)
            .on('click', '.js-open-spotify-window', openSpotifyWindow);
    });

})(jQuery, Bloodhound, window, document);
