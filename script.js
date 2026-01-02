// TypeToImprove - Random Word Generation and Display
// This module handles generating and displaying random word sets for typing practice

// Global state variables for typing session
let currentWordIndex = 0;
let displayedWords = [];
let typingInput = null;
let wordsContainer = null;

// Timer and statistics variables
let testDuration = 60; // 60 seconds default
let timeRemaining = testDuration;
let timerInterval = null;
let testStarted = false;
let testEnded = false;
let startTime = null;
let correctWords = 0;
let incorrectWords = 0;
let completedWordCount = 0; // Tracks only words completed with space key
let totalTypedCharacters = 0;

// Character-level tracking
let currentCharIndex = 0;

// Difficulty tracking
let currentDifficulty = 'medium';
let difficultySelector = null;

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
    // Get words from selected difficulty level
    let selectedWords;
    
    if (typeof wordsByDifficulty !== 'undefined' && wordsByDifficulty[currentDifficulty]) {
        selectedWords = wordsByDifficulty[currentDifficulty];
    } else if (typeof words !== 'undefined' && Array.isArray(words)) {
        // Fallback to legacy words array
        selectedWords = words;
    } else {
        console.error('No word lists found. Make sure words.js is loaded.');
        return [];
    }
    
    // Ensure we don't request more words than available
    const wordCount = Math.min(count, selectedWords.length);
    
    // Shuffle the word array and take the first 'count' words
    const shuffledWords = shuffleArray(selectedWords);
    
    return shuffledWords.slice(0, wordCount);
}

/**
 * Display words in the words container
 * Each character is wrapped in a span with class 'char' for character-level highlighting
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
    
    // Create span elements for each word with character-level spans
    wordArray.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.setAttribute('data-index', wordIndex);
        
        // Mark the first word as active
        if (wordIndex === 0) {
            wordSpan.classList.add('active');
        }
        
        // Create character spans for each character in the word
        word.split('').forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char;
            charSpan.setAttribute('data-char-index', charIndex);
            
            // Mark the first character of the first word as cursor position
            if (wordIndex === 0 && charIndex === 0) {
                charSpan.classList.add('cursor');
            }
            
            wordSpan.appendChild(charSpan);
        });
        
        wordsContainer.appendChild(wordSpan);
        
        // Add space between words (except after the last word)
        if (wordIndex < wordArray.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'char space';
            spaceSpan.textContent = ' ';
            spaceSpan.setAttribute('data-space', 'true');
            wordsContainer.appendChild(spaceSpan);
        }
    });
}

/**
 * Start the typing timer
 */
function startTimer() {
    if (testStarted || testEnded) {
        return;
    }
    
    testStarted = true;
    startTime = new Date();
    
    // Update timer display immediately
    updateTimerDisplay();
    
    // Start the countdown
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            endTest();
        }
    }, 1000);
    
    console.log('Timer started');
}

/**
 * Update the timer display
 */
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

/**
 * End the typing test and calculate results
 */
function endTest() {
    testEnded = true;
    
    // Stop the timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Disable input
    if (typingInput) {
        typingInput.disabled = true;
        typingInput.placeholder = 'Test completed!';
    }
    
    // Calculate and display results
    calculateAndDisplayResults();
    
    console.log('Test ended');
}

/**
 * Calculate WPM, accuracy, and errors, then display results
 */
function calculateAndDisplayResults() {
    // Use explicit completed word count instead of deriving it
    const totalWords = completedWordCount;
    const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
    
    // Calculate WPM based on actual time elapsed
    const timeElapsed = testStarted && startTime ? 
        Math.min((new Date() - startTime) / 1000, testDuration) / 60 : 1;
    const wpm = Math.round(correctWords / timeElapsed);
    
    // Update display
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const errorsElement = document.getElementById('errors');
    
    if (wpmElement) wpmElement.textContent = wpm;
    if (accuracyElement) accuracyElement.textContent = `${accuracy}%`;
    if (errorsElement) errorsElement.textContent = incorrectWords;
    
    console.log(`Results - WPM: ${wpm}, Accuracy: ${accuracy}%, Errors: ${incorrectWords}, Completed Words: ${completedWordCount}`);
}

/**
 * Reset all statistics and state variables
 */
function resetStatistics() {
    currentWordIndex = 0;
    displayedWords = [];
    currentCharIndex = 0;
    timeRemaining = testDuration;
    testStarted = false;
    testEnded = false;
    startTime = null;
    correctWords = 0;
    incorrectWords = 0;
    completedWordCount = 0; // Reset completed word count
    totalTypedCharacters = 0;
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset display
    updateTimerDisplay();
    
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const errorsElement = document.getElementById('errors');
    
    if (wpmElement) wpmElement.textContent = '--';
    if (accuracyElement) accuracyElement.textContent = '--%';
    if (errorsElement) errorsElement.textContent = '--';
}

/**
 * Restart the typing test
 */
function restartTest() {
    console.log('Restarting test...');
    
    // Reset all statistics
    resetStatistics();
    
    // Regenerate and display new words
    initializeTypingSession();
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
    
    // Add event listeners for both keydown and input events
    typingInput.addEventListener('keydown', handleKeyDown);
    typingInput.addEventListener('input', handleInput);
    
    // Security: Prevent all paste operations
    typingInput.addEventListener('paste', preventPaste);
    typingInput.addEventListener('drop', preventDrop);
    typingInput.addEventListener('dragover', preventDragOver);
    typingInput.addEventListener('contextmenu', preventContextMenu);
    
    console.log('Typing input enabled and focused');
}

/**
 * Security functions to prevent cheating
 */

/**
 * Prevent paste operations in typing input
 * @param {ClipboardEvent} event - The paste event
 */
function preventPaste(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Paste operation blocked for typing test integrity');
    return false;
}

/**
 * Prevent drag and drop operations in typing input
 * @param {DragEvent} event - The drop event
 */
function preventDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Drop operation blocked for typing test integrity');
    return false;
}

/**
 * Prevent drag over events (required for drop prevention)
 * @param {DragEvent} event - The dragover event
 */
function preventDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

/**
 * Prevent context menu (right-click) on typing input
 * @param {MouseEvent} event - The contextmenu event
 */
function preventContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Context menu blocked on typing input for typing test integrity');
    return false;
}

/**
 * Handle input events for character-level tracking
 * @param {InputEvent} event - The input event
 */
function handleInput(event) {
    // Don't process if test has ended
    if (testEnded) {
        return;
    }
    
    // Start timer on first input
    if (!testStarted) {
        startTimer();
    }
    
    const typedText = typingInput.value;
    const currentWord = displayedWords[currentWordIndex];
    
    if (!currentWord) {
        return;
    }
    
    // Update character-level highlighting
    updateCharacterHighlighting(typedText, currentWord);
}

/**
 * Update character-level highlighting based on typed text
 * @param {string} typedText - The text currently in the input field
 * @param {string} currentWord - The word that should be typed
 */
function updateCharacterHighlighting(typedText, currentWord) {
    const currentWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    
    if (!currentWordSpan) {
        return;
    }
    
    const charSpans = currentWordSpan.querySelectorAll('.char');
    
    // Reset all character classes in current word
    charSpans.forEach(span => {
        span.classList.remove('correct', 'incorrect', 'cursor', 'skipped');
    });
    
    // Also reset cursor on any space elements
    wordsContainer.querySelectorAll('.char.space').forEach(space => {
        space.classList.remove('cursor');
    });
    
    // Apply highlighting for each typed character
    for (let i = 0; i < Math.max(typedText.length, currentWord.length); i++) {
        if (i < charSpans.length) {
            const charSpan = charSpans[i];
            
            if (i < typedText.length) {
                // Character has been typed
                const typedChar = typedText[i];
                const expectedChar = currentWord[i];
                
                if (typedChar === expectedChar) {
                    charSpan.classList.add('correct');
                } else {
                    charSpan.classList.add('incorrect');
                }
            } else if (i === typedText.length) {
                // Current cursor position
                charSpan.classList.add('cursor');
            }
        }
    }
    
    // Handle cursor at space position (when word length is reached or exceeded)
    if (typedText.length >= currentWord.length) {
        // Word length reached or exceeded, show cursor at space position regardless of correctness
        const nextSpaceElement = currentWordSpan.nextElementSibling;
        if (nextSpaceElement && nextSpaceElement.classList.contains('space')) {
            nextSpaceElement.classList.add('cursor');
            
            // Remove cursor from all characters of the word since it's now at space
            charSpans.forEach(char => {
                char.classList.remove('cursor');
            });
        }
    }
    
    // Re-evaluate word state dynamically
    updateWordState(currentWordSpan, typedText, currentWord);
}

/**
 * Update word-level state based on current typed text
 * @param {HTMLElement} wordSpan - The word span element
 * @param {string} typedText - The text currently typed
 * @param {string} expectedWord - The word that should be typed
 */
function updateWordState(wordSpan, typedText, expectedWord) {
    // Remove all previous word states
    wordSpan.classList.remove('completed', 'skipped', 'correct', 'incorrect');
    
    // Determine current word state
    if (typedText.length === 0) {
        // No text typed - word is in default state
        return;
    } else if (typedText === expectedWord) {
        // Perfect match - word is correct
        wordSpan.classList.add('correct');
    } else if (typedText.length > 0) {
        // Some text typed but not matching - word is incorrect
        wordSpan.classList.add('incorrect');
    }
}

/**
 * Handle keydown events in the typing input
 * @param {KeyboardEvent} event - The keydown event
 */
function handleKeyDown(event) {
    // Don't process if test has ended
    if (testEnded) {
        return;
    }
    
    // Security: Block paste keyboard shortcuts
    if ((event.ctrlKey || event.metaKey) && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Paste keyboard shortcut blocked for typing test integrity');
        return false;
    }
    
    // Security: Block other potentially problematic shortcuts
    if ((event.ctrlKey || event.metaKey) && (
        event.key === 'c' || event.key === 'C' || // Copy
        event.key === 'x' || event.key === 'X' || // Cut
        event.key === 'a' || event.key === 'A'    // Select All
    )) {
        // Allow these for the words container but not when typing input is focused
        if (document.activeElement === typingInput) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Keyboard shortcut blocked while typing input is focused');
            return false;
        }
    }
    
    // Handle backspace for cross-word navigation
    if (event.code === 'Backspace') {
        event.preventDefault();
        handleBackspace();
        return;
    }
    
    // Check if spacebar was pressed
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default space behavior
        handleSpacePress();
    }
}

/**
 * Handle backspace key press with cross-word navigation
 */
function handleBackspace() {
    const typedText = typingInput.value;
    
    if (typedText.length === 0 && currentWordIndex > 0) {
        // At beginning of word, move to previous word
        moveToPreviousWord();
    } else if (typedText.length > 0) {
        // Remove last character normally
        typingInput.value = typedText.slice(0, -1);
        updateCharacterHighlighting(typingInput.value, displayedWords[currentWordIndex]);
    }
}

/**
 * Move cursor to the previous word
 */
function moveToPreviousWord() {
    if (currentWordIndex <= 0) {
        return; // Already at first word
    }
    
    // Mark current word as inactive and clear all states
    const currentWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    if (currentWordSpan) {
        currentWordSpan.classList.remove('active');
        // Clear all word states - allow for fresh re-evaluation
        currentWordSpan.classList.remove('completed', 'skipped', 'correct', 'incorrect');
    }
    
    // Move to previous word
    currentWordIndex--;
    
    // Get the previous word and set input to its content
    const prevWord = displayedWords[currentWordIndex];
    const prevWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    
    if (prevWordSpan && prevWord) {
        // Mark previous word as active and clear its states for re-evaluation
        prevWordSpan.classList.add('active');
        prevWordSpan.classList.remove('completed', 'skipped', 'correct', 'incorrect');
        
        // Find the last correctly typed characters in the previous word
        let lastCorrectIndex = -1;
        const charSpans = prevWordSpan.querySelectorAll('.char:not(.space)');
        
        for (let i = 0; i < charSpans.length; i++) {
            if (charSpans[i].classList.contains('correct')) {
                lastCorrectIndex = i;
            } else {
                break;
            }
        }
        
        // Set input value to the correctly typed portion
        if (lastCorrectIndex >= 0) {
            typingInput.value = prevWord.substring(0, lastCorrectIndex + 1);
        } else {
            typingInput.value = '';
        }
        
        // Update character highlighting for the previous word
        updateCharacterHighlighting(typingInput.value, prevWord);
    }
}

/**
 * Handle space key press (soft word separator)
 */
function handleSpacePress() {
    const typedText = typingInput.value.trim();
    
    if (typedText === '') {
        // Skip current word if nothing was typed - do NOT count as completed
        skipCurrentWord();
        console.log(`Word skipped (not counted). Completed words: ${completedWordCount}`);
    } else {
        // Only increment completed word count when space is pressed AND text was typed
        completedWordCount++;
        
        // Process the typed word
        processCurrentWord(typedText);
    }
    
    // Move to next word
    moveToNextWord();
}

/**
 * Skip the current word (mark as skipped, not committed)
 */
function skipCurrentWord() {
    const currentWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    
    if (currentWordSpan) {
        // Mark word as skipped (can be corrected later)
        currentWordSpan.classList.remove('active');
        currentWordSpan.classList.add('skipped');
        
        // Mark all characters as skipped
        const charSpans = currentWordSpan.querySelectorAll('.char:not(.space)');
        charSpans.forEach(charSpan => {
            charSpan.classList.remove('cursor', 'correct', 'incorrect');
            charSpan.classList.add('skipped');
        });
    }
}

/**
 * Process the currently typed word
 */
function processCurrentWord(typedWord) {
    // Track typed characters for statistics
    totalTypedCharacters += typedWord.length;
    
    // Get the expected word
    const expectedWord = displayedWords[currentWordIndex];
    const isCorrect = typedWord === expectedWord;
    
    // Update statistics - word was already counted in handleSpacePress
    if (isCorrect) {
        correctWords++;
    } else {
        incorrectWords++;
    }
    
    // Finalize the word visually
    const currentWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
    if (currentWordSpan) {
        finalizeCurrentWord(currentWordSpan, typedWord, expectedWord);
        currentWordSpan.classList.remove('active', 'skipped', 'correct', 'incorrect');
        currentWordSpan.classList.add('completed');
    }
    
    console.log(`Word "${typedWord}" ${isCorrect ? 'correct' : 'incorrect'}. Expected: "${expectedWord}". Completed words: ${completedWordCount}`);
}

/**
 * Move to the next word
 */
function moveToNextWord() {
    // Clear the input field
    typingInput.value = '';
    
    // Reset character tracking
    currentCharIndex = 0;
    
    // Move to next word
    currentWordIndex++;
    
    // Check if there are more words and test hasn't ended
    if (currentWordIndex < displayedWords.length && !testEnded) {
        // Mark next word as active and set cursor
        const nextWordSpan = wordsContainer.querySelector(`[data-index="${currentWordIndex}"]`);
        if (nextWordSpan) {
            nextWordSpan.classList.add('active');
            setInitialCursor(nextWordSpan);
        }
    } else if (!testEnded) {
        // All words completed before time ended
        console.log('All words completed!');
        endTest();
    }
}

/**
 * Finalize the current word by marking all characters with their final state
 * @param {HTMLElement} wordSpan - The word span element
 * @param {string} typedWord - The word that was typed
 * @param {string} expectedWord - The word that was expected
 */
function finalizeCurrentWord(wordSpan, typedWord, expectedWord) {
    const charSpans = wordSpan.querySelectorAll('.char');
    
    charSpans.forEach((charSpan, index) => {
        charSpan.classList.remove('cursor');
        
        if (index < typedWord.length) {
            // Character was typed
            const typedChar = typedWord[index];
            const expectedChar = expectedWord[index];
            
            if (typedChar === expectedChar) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        } else {
            // Character was not typed (if word is incomplete)
            charSpan.classList.remove('correct', 'incorrect');
        }
    });
}

/**
 * Set the initial cursor position for a new word
 * @param {HTMLElement} wordSpan - The word span element
 */
function setInitialCursor(wordSpan) {
    const firstChar = wordSpan.querySelector('.char');
    if (firstChar) {
        // Remove cursor from all characters and spaces first
        wordsContainer.querySelectorAll('.char').forEach(char => {
            char.classList.remove('cursor');
        });
        wordsContainer.querySelectorAll('.char.space').forEach(space => {
            space.classList.remove('cursor');
        });
        
        // Add cursor to first character of new word
        firstChar.classList.add('cursor');
        
        // Update character highlighting for the new word to ensure word state is evaluated
        if (currentWordIndex < displayedWords.length) {
            updateCharacterHighlighting('', displayedWords[currentWordIndex]);
        }
    }
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
    
    // Set up difficulty selector (only on first initialization)
    if (!difficultySelector) {
        setupDifficultySelector();
    }
    
    // Reset all statistics and state
    resetStatistics();
    
    // Generate random word count between 40-50 for variety
    const wordCount = Math.floor(Math.random() * 11) + 40; // 40 to 50 words
    
    console.log(`Generating ${wordCount} random words for ${currentDifficulty} difficulty`);
    
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
    
    // Set up restart button
    setupRestartButton();
    
    console.log(`Successfully displayed ${randomWords.length} words and enabled typing`);
}

/**
 * Set up the restart button functionality
 */
function setupRestartButton() {
    // Create restart button if it doesn't exist
    let restartButton = document.getElementById('restartButton');
    
    if (!restartButton) {
        restartButton = document.createElement('button');
        restartButton.id = 'restartButton';
        restartButton.className = 'restart-button';
        restartButton.textContent = 'Restart Test';
        
        // Add button to the stats section
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsSection.appendChild(restartButton);
        }
    }
    
    // Remove existing event listeners and add new one
    const newButton = restartButton.cloneNode(true);
    restartButton.parentNode.replaceChild(newButton, restartButton);
    
    newButton.addEventListener('click', restartTest);
}

/**
 * Set up the difficulty selector functionality
 */
function setupDifficultySelector() {
    difficultySelector = document.getElementById('difficultySelector');
    
    if (!difficultySelector) {
        console.error('Difficulty selector not found in DOM');
        return;
    }
    
    // Set initial difficulty from selector value
    currentDifficulty = difficultySelector.value;
    
    // Add change event listener
    difficultySelector.addEventListener('change', handleDifficultyChange);
    
    console.log(`Difficulty selector initialized with level: ${currentDifficulty}`);
}

/**
 * Handle difficulty level change
 */
function handleDifficultyChange() {
    if (testStarted && !testEnded) {
        // If test is in progress, show confirmation
        const confirmChange = confirm('Changing difficulty will restart the current test. Continue?');
        if (!confirmChange) {
            // Reset selector to current difficulty
            difficultySelector.value = currentDifficulty;
            return;
        }
    }
    
    // Update current difficulty
    currentDifficulty = difficultySelector.value;
    
    console.log(`Difficulty changed to: ${currentDifficulty}`);
    
    // Restart the test with new difficulty
    restartTest();
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