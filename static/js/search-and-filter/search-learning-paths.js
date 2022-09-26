function applySearchAndFiltersTo_LearningPaths(all_path_cards, search_string) {
    // Skip search bits if no search string
    let skip_search = false;
    if ((typeof search_string) == 'undefined') {
        search_string='';
        skip_search=true; 
    }

    // Filter search term
    const search_word_array = search_string.toLowerCase().split(" ");   // 'MongoDB Arm Neoverse-N1' --> ['mongodb','arm','neoverse-n1']

    // store results to hide based on certain parameters
    let results_to_hide = [];

    for (let card of all_path_cards) {
        if (!skip_search) {
        ///////////////
        // To search on:
            // Title of learning path --> title must include ALL search terms (any order or case)
            if (searchByTitle(card,search_word_array)) { 
                results_to_hide.push(card); // set card to be hidden
            }
        }

        ///////////////
        // To filter on current applied filters
            if (filter_LearningPath_card(card)) { // if we get back non-null from function, the card should be hidden
                results_to_hide.push(card); // set card to be hidden
            }
    }
    return results_to_hide
}





function searchHandler_LearningPaths(search_string) {
    // HANDLE if coming from ads search box (event.value) or URL (string)
    if (! (typeof search_string === 'string')) {
        search_string = search_string.value;
    }

    const all_path_cards = document.querySelectorAll('div.search-div');
    // Apply search and filters to current parameters
    results_to_hide = applySearchAndFiltersTo_LearningPaths(all_path_cards, search_string); // apply active search & filter terms to the specified divs
   
    // Hide specified elements
    hideElements(all_path_cards,results_to_hide);
}


