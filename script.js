// TypeToImprove - Random Word Generation and Display
// This module handles generating and displaying random word sets for typing practice

/**
 * Fisher-Yates shuffle algorithm for high randomness
 * This ensures each possible ordering of elements has equal probability
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (doesn't modify original)
 */
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy to avoid modifying original
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Generate random index from 0 to i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at positions i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

/**
 * Generate a random set of words for typing practice
 * @param {number} count - Number of words to generate (default: 45)
 * @returns {Array} - Array of randomly selected words
 */
function generateRandomWords(count = 45) {
    // Ensure we have access to the words array
    if (typeof words === 'undefined' || !Array.isArray(words)) {
        console.error('Words array not found. Make sure words.js is loaded.');
        return [];
    }
    
    // Ensure we don't request more words than available
    const wordCount = Math.min(count, words.length);
    
    // Shuffle the entire word array and take the first 'count' words
    const shuffledWords = shuffleArray(words);
    
    return shuffledWords.slice(0, wordCount);
}

/**
 * Display words in the words container
 * Each word is wrapped in a span with class 'word' for future styling
 * @param {Array} wordArray - Array of words to display
 */
function displayWords(wordArray) {
    const wordsContainer = document.getElementById('wordsContainer');
    
    if (!wordsContainer) {
        console.error('Words container not found in DOM');
        return;
    }
    
    // Clear existing content
    wordsContainer.innerHTML = '';
    
    // Create span elements for each word
    wordArray.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.textContent = word;
        
        // Add data attribute for word index (useful for future features)
        wordSpan.setAttribute('data-index', index);
        
        wordsContainer.appendChild(wordSpan);
        
        // Add space between words (except after the last word)
        if (index < wordArray.length - 1) {
            wordsContainer.appendChild(document.createTextNode(' '));
        }
    });
}

/**
 * Initialize the typing practice session
 * Generates and displays random words when page loads
 */
function initializeTypingSession() {
    console.log('TypeToImprove: Initializing typing session...');
    
    // Generate random word count between 40-50 for variety
    const wordCount = Math.floor(Math.random() * 11) + 40; // 40 to 50 words
    
    console.log(`Generating ${wordCount} random words for typing practice`);
    
    // Generate random words
    const randomWords = generateRandomWords(wordCount);
    
    if (randomWords.length === 0) {
        console.error('Failed to generate random words');
        return;
    }
    
    // Display the words
    displayWords(randomWords);
    
    console.log(`Successfully displayed ${randomWords.length} words`);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('TypeToImprove loaded - DOM ready');
    initializeTypingSession();
});

// Also initialize if script loads after DOM (fallback)
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initializeTypingSession);
} else {
    // DOM is already loaded
    initializeTypingSession();
}