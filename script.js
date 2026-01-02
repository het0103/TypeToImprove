// TypeToImprove - Random Word Generation and Display
// This module handles generating and displaying random word sets for typing practice

// Global state variables for typing session
let currentWordIndex = 0;
let displayedWords = [];
let typingInput = null;
let wordsContainer = null;

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
    
    // Store the displayed words globally
    displayedWords = [...wordArray];
    
    // Clear existing content
    wordsContainer.innerHTML = '';
    
    // Create span elements for each word
    wordArray.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.textContent = word;
        
        // Add data attribute for word index (useful for future features)
        wordSpan.setAttribute('data-index', index);
        
        // Mark the first word as active
        if (index === 0) {
            wordSpan.classList.add('active');
        }
        
        wordsContainer.appendChild(wordSpan);
        
        // Add space between words (except after the last word)
        if (index < wordArray.length - 1) {
            wordsContainer.appendChild(document.createTextNode(' '));
        }
    });
}

/**
 * Enable the typing input field and set up event listeners
 */
function enableTypingInput() {
    typingInput = document.getElementById('typingInput');
    
    if (!typingInput) {
        console.error('Typing input field not found in DOM');
        return;
    }
    
    // Enable the input field
    typingInput.disabled = false;
    typingInput.focus();
    
    // Add event listener for keydown events
    typingInput.addEventListener('keydown', handleKeyDown);
    
    console.log('Typing input enabled and focused');
}

/**
 * Handle keydown events in the typing input
 * @param {KeyboardEvent} event - The keydown event
 */
function handleKeyDown(event) {
    // Check if spacebar was pressed
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default space behavior
        handleWordSubmission();
    }
}

/**
 * Handle word submission when spacebar is pressed
 */
function handleWordSubmission() {
    const typedWord = typingInput.value.trim();
    
    if (typedWord === '') {
        return; // Don't process empty submissions
    }
    
    // Get the current word that should be typed
    const currentWord = displayedWords[currentWordIndex];
    
    if (!currentWord) {
        console.error('No current word found');
        return;
    }
    
    // Get the current word span element
    const currentWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    
    if (!currentWordSpan) {
        console.error('Current word span not found');
        return;
    }
    
    // Compare typed word with current word
    const isCorrect = typedWord === currentWord;
    
    // Update visual feedback
    currentWordSpan.classList.remove('active');
    currentWordSpan.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Clear the input field
    typingInput.value = '';
    
    // Move to next word
    currentWordIndex++;
    
    // Check if there are more words
    if (currentWordIndex < displayedWords.length) {
        // Mark next word as active
        const nextWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
        if (nextWordSpan) {
            nextWordSpan.classList.add('active');
        }
    } else {
        // All words completed
        console.log('All words completed!');
        typingInput.disabled = true;
        typingInput.placeholder = 'Typing practice completed!';
    }
    
    console.log(`Word "${typedWord}" ${isCorrect ? 'correct' : 'incorrect'}. Expected: "${currentWord}"`);
}

/**
 * Initialize the typing practice session
 * Generates and displays random words when page loads
 */
function initializeTypingSession() {
    console.log('TypeToImprove: Initializing typing session...');
    
    // Get reference to words container
    wordsContainer = document.getElementById('wordsContainer');
    if (!wordsContainer) {
        console.error('Words container not found');
        return;
    }
    
    // Reset state variables
    currentWordIndex = 0;
    displayedWords = [];
    
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
    
    // Enable typing input
    enableTypingInput();
    
    console.log(`Successfully displayed ${randomWords.length} words and enabled typing`);
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