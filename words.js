// Common English words for typing practice
// This array contains 300+ lowercase words suitable for typing exercises

const words = [
    // Common short words (2-4 letters)
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use",
    
    // Common medium words (4-6 letters)
    "about", "after", "again", "back", "been", "before", "being", "both", "came", "come", "could", "did", "each", "even", "first", "from", "good", "great", "have", "here", "home", "into", "just", "know", "last", "left", "like", "little", "look", "made", "make", "many", "more", "most", "move", "much", "must", "name", "never", "next", "only", "other", "over", "own", "right", "said", "same", "should", "show", "since", "some", "still", "such", "take", "than", "that", "them", "these", "they", "thing", "think", "this", "those", "time", "very", "want", "water", "well", "went", "were", "what", "when", "where", "which", "while", "will", "with", "work", "would", "write", "year", "your",
    
    // Nature and animals
    "tree", "plant", "flower", "grass", "leaf", "bird", "fish", "dog", "cat", "horse", "cow", "sheep", "lion", "tiger", "bear", "deer", "fox", "wolf", "rabbit", "mouse", "duck", "chicken", "pig", "goat", "snake", "frog", "bee", "fly", "ant", "spider", "ocean", "sea", "lake", "river", "mountain", "hill", "forest", "desert", "beach", "island", "cloud", "rain", "snow", "wind", "sun", "moon", "star", "earth", "sky", "fire", "water", "stone", "rock", "sand", "ice", "wave", "storm", "summer", "winter", "spring", "fall",
    
    // Everyday objects
    "book", "pen", "paper", "table", "chair", "door", "window", "house", "room", "bed", "car", "bus", "train", "bike", "road", "street", "city", "town", "shop", "store", "food", "bread", "milk", "meat", "fruit", "apple", "orange", "banana", "grape", "lemon", "potato", "tomato", "onion", "carrot", "lettuce", "rice", "pasta", "pizza", "cake", "cookie", "coffee", "tea", "juice", "water", "bottle", "cup", "plate", "spoon", "fork", "knife", "bowl", "bag", "box", "hat", "shirt", "pants", "shoes", "sock", "coat", "dress", "watch", "phone", "computer", "camera", "music", "song", "movie", "game", "ball", "toy",
    
    // Actions and verbs
    "walk", "run", "jump", "sit", "stand", "sleep", "eat", "drink", "read", "write", "speak", "listen", "watch", "look", "see", "hear", "feel", "touch", "smell", "taste", "love", "like", "hate", "want", "need", "give", "take", "buy", "sell", "pay", "cost", "save", "spend", "earn", "work", "play", "learn", "teach", "study", "help", "ask", "tell", "talk", "call", "answer", "open", "close", "start", "stop", "begin", "end", "finish", "continue", "break", "fix", "build", "make", "create", "destroy", "clean", "wash", "cook", "drive", "ride", "fly", "swim", "dance", "sing", "laugh", "cry", "smile", "remember", "forget", "hope", "dream", "believe", "trust", "worry", "fear", "enjoy", "celebrate", "travel", "visit", "stay", "leave", "arrive", "return", "meet", "join", "follow", "lead", "win", "lose", "try", "succeed", "fail",
    
    // Descriptive words
    "big", "small", "large", "tiny", "huge", "little", "tall", "short", "long", "wide", "narrow", "thick", "thin", "heavy", "light", "fast", "slow", "quick", "early", "late", "young", "old", "new", "fresh", "clean", "dirty", "hot", "cold", "warm", "cool", "dry", "wet", "hard", "soft", "smooth", "rough", "sharp", "dull", "bright", "dark", "loud", "quiet", "high", "low", "deep", "shallow", "full", "empty", "open", "closed", "easy", "hard", "simple", "difficult", "important", "special", "normal", "strange", "different", "similar", "same", "other", "another", "next", "last", "first", "final", "main", "basic", "common", "rare", "popular", "famous", "unknown", "public", "private", "free", "busy", "ready", "careful", "safe", "dangerous", "strong", "weak", "healthy", "sick", "happy", "sad", "angry", "calm", "excited", "bored", "tired", "active", "lazy", "smart", "stupid", "kind", "mean", "nice", "bad", "good", "great", "wonderful", "terrible", "beautiful", "ugly", "pretty", "cute", "funny", "serious", "interesting", "boring",
    
    // Colors
    "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "silver", "gold",
    
    // Numbers and time
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "hundred", "thousand", "million", "today", "yesterday", "tomorrow", "morning", "afternoon", "evening", "night", "hour", "minute", "second", "week", "month", "year", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",
    
    // People and relationships
    "person", "people", "man", "woman", "child", "baby", "boy", "girl", "father", "mother", "parent", "son", "daughter", "brother", "sister", "family", "friend", "neighbor", "teacher", "student", "doctor", "nurse", "police", "farmer", "worker", "boss", "customer", "visitor", "guest", "stranger",
    
    // Body parts
    "head", "hair", "face", "eye", "nose", "mouth", "ear", "neck", "shoulder", "arm", "hand", "finger", "leg", "foot", "toe", "back", "chest", "heart", "brain", "blood", "bone", "skin", "tooth", "teeth",
    
    // Places and locations
    "place", "country", "state", "city", "town", "village", "street", "road", "park", "garden", "school", "office", "hospital", "church", "library", "museum", "restaurant", "hotel", "bank", "post", "market", "shop", "store", "factory", "farm", "beach", "mountain", "forest", "river", "bridge", "building", "tower", "castle", "palace"
];

// Export the words array for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = words;
}

// For browser environments
if (typeof window !== 'undefined') {
    window.words = words;
}