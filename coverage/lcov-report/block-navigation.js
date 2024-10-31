/* eslint-disable */
var jumpToCode = (function init() {
    // Classes of code we would like to highlight in the file view
    var missingCoverageClasses = ['.cbranch-no', '.cstat-no', '.fstat-no'];

    // Elements to highlight in the file listing view
    var fileListingElements = ['td.pct.low'];

    // Exclude elements that are direct descendants of a match
    var notSelector = ':not(' + missingCoverageClasses.join('):not(') + ') > '; // e.g., `:not(a):not(b) > `

    // Selector that finds elements on the page to which we can jump
    var selector =
        fileListingElements.join(', ') +
        ', ' +
        notSelector +
        missingCoverageClasses.join(', ' + notSelector); // e.g., `:not(a):not(b) > a, :not(a):not(b) > b`

    // The NodeList of matching elements
    var missingCoverageElements = document.querySelectorAll(selector);
    var currentIndex = -1; // Initialize to -1 to indicate no current selection

    function toggleClass(index) {
        if (currentIndex >= 0) {
            missingCoverageElements.item(currentIndex).classList.remove('highlighted');
        }
        if (index >= 0) {
            missingCoverageElements.item(index).classList.add('highlighted');
        }
    }

    function makeCurrent(index) {
        toggleClass(index);
        currentIndex = index;

        if (currentIndex >= 0) {
            missingCoverageElements.item(currentIndex).scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }

    function goToPrevious() {
        var nextIndex = (currentIndex <= 0) ? missingCoverageElements.length - 1 : currentIndex - 1;
        makeCurrent(nextIndex);
    }

    function goToNext() {
        var nextIndex = (currentIndex < missingCoverageElements.length - 1) ? currentIndex + 1 : 0;
        makeCurrent(nextIndex);
    }

    return function jump(event) {
        // Prevent navigation if focused on the search input
        if (document.getElementById('fileSearch') === document.activeElement) {
            return;
        }

        switch (event.which) {
            case 78: // n
            case 74: // j
                goToNext();
                break;
            case 66: // b
            case 75: // k
            case 80: // p
                goToPrevious();
                break;
            default:
                break; // Ignore other key events
        }
    };
})();

window.addEventListener('keydown', jumpToCode);
