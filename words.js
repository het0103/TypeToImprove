// TypeToImprove - Word Lists by Difficulty Level
// This file contains categorized word lists for different typing skill levels

const wordsByDifficulty = {
    easy: [
        // Simple short words (2-4 letters)
        "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use",
        
        // Basic colors and numbers
        "red", "blue", "green", "big", "run", "sit", "eat", "go", "up", "in", "on", "at", "to", "is", "it", "we", "my", "me", "do", "no", "he", "be", "so", "or", "if", "by", "as", "an", "us", "am",
        
        // Simple nouns
        "cat", "dog", "car", "sun", "moon", "tree", "book", "pen", "cup", "bag", "box", "hat", "bed", "door", "key", "toy", "ball", "game", "food", "milk", "cake", "fish", "bird", "hand", "head", "eye", "ear", "leg", "arm", "foot"
    ],

    medium: [
        // Common medium words (4-6 letters)
        "about", "after", "again", "back", "been", "before", "being", "both", "came", "come", "could", "each", "even", "first", "from", "good", "great", "have", "here", "home", "into", "just", "know", "last", "left", "like", "little", "look", "made", "make", "many", "more", "most", "move", "much", "must", "name", "never", "next", "only", "other", "over", "right", "said", "same", "should", "show", "since", "some", "still", "such", "take", "than", "that", "them", "these", "they", "thing", "think", "this", "those", "time", "very", "want", "water", "well", "went", "were", "what", "when", "where", "which", "while", "will", "with", "work", "would", "write", "year", "your",
        
        // Nature and animals
        "horse", "sheep", "tiger", "rabbit", "chicken", "forest", "ocean", "mountain", "river", "beach", "flower", "plant", "grass", "cloud", "storm", "winter", "summer", "spring",
        
        // Actions
        "walk", "jump", "stand", "sleep", "drink", "speak", "listen", "watch", "learn", "teach", "help", "start", "finish", "travel", "visit", "remember", "forget", "smile", "laugh"
    ],

    hard: [
        // Complex and longer words
        "different", "important", "remember", "understand", "beautiful", "wonderful", "dangerous", "interesting", "necessary", "government", "development", "environment", "management", "information", "technology", "organization", "communication", "international", "professional", "responsibility", "opportunity", "experience", "performance", "relationship", "achievement", "knowledge", "education", "particular", "individual", "available", "successful", "commercial", "financial", "political", "scientific", "economic", "historical", "psychological", "philosophical", "theoretical", "practical", "technical", "medical", "physical", "chemical", "biological", "mathematical", "statistical", "ographical", "ographical",
        
        // Academic and business terms
        "analysis", "research", "strategy", "process", "structure", "function", "method", "approach", "concept", "principle", "framework", "perspective", "criteria", "evaluation", "assessment", "implementation", "application", "integration", "coordination", "collaboration", "negotiation", "presentation", "discussion", "conclusion", "recommendation", "interpretation", "explanation", "description", "definition", "classification", "specification", "documentation", "administration", "supervision", "leadership", "partnership", "membership", "citizenship", "ownership", "relationship", "scholarship", "championship", "friendship", "hardship", "workmanship"
    ],

    developer: [
        // JavaScript keywords and reserved words
        "function", "var", "let", "const", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "return", "try", "catch", "finally", "throw", "new", "this", "super", "class", "extends", "static", "async", "await", "yield", "import", "export", "from", "as", "default", "typeof", "instanceof", "in", "of", "delete", "void", "true", "false", "null", "undefined", "NaN", "Infinity",
        
        // JavaScript built-in objects and methods
        "Array", "Object", "String", "Number", "Boolean", "Date", "Math", "JSON", "Promise", "Set", "Map", "WeakSet", "WeakMap", "Symbol", "Proxy", "Reflect", "console.log()", "console.error()", "console.warn()", "console.info()", "parseInt()", "parseFloat()", "isNaN()", "isFinite()", "toString()", "valueOf()", "hasOwnProperty()", "propertyIsEnumerable()",
        
        // Array methods
        "push()", "pop()", "shift()", "unshift()", "slice()", "splice()", "concat()", "join()", "reverse()", "sort()", "indexOf()", "lastIndexOf()", "includes()", "find()", "findIndex()", "filter()", "map()", "reduce()", "reduceRight()", "forEach()", "some()", "every()", "flat()", "flatMap()",
        
        // String methods
        "charAt()", "charCodeAt()", "codePointAt()", "concat()", "endsWith()", "includes()", "indexOf()", "lastIndexOf()", "match()", "padEnd()", "padStart()", "repeat()", "replace()", "replaceAll()", "search()", "slice()", "split()", "startsWith()", "substring()", "toLowerCase()", "toUpperCase()", "trim()", "trimStart()", "trimEnd()",
        
        // Operators and symbols
        "===", "!==", "==", "!=", "<=", ">=", "<", ">", "&&", "||", "!", "?:", "??", "??=", "+=", "-=", "*=", "/=", "%=", "**=", "&=", "|=", "^=", "<<=", ">>=", ">>>=", "++", "--", "...", "=>", "?.","[]", "{}", "()",
        
        // Common code patterns and snippets
        "async/await", "try/catch", "if/else", "for/of", "for/in", "while(true)", "setTimeout()", "setInterval()", "clearTimeout()", "clearInterval()", "addEventListener()", "removeEventListener()", "preventDefault()", "stopPropagation()", "fetch()", "axios.get()", "axios.post()", "JSON.stringify()", "JSON.parse()",
        
        // DOM manipulation
        "document", "window", "getElementById()", "getElementsByClassName()", "getElementsByTagName()", "querySelector()", "querySelectorAll()", "createElement()", "appendChild()", "removeChild()", "insertBefore()", "cloneNode()", "setAttribute()", "getAttribute()", "removeAttribute()", "classList", "innerHTML", "textContent", "innerText", "style", "onclick", "onload", "onchange",
        
        // React/JSX specific
        "useState()", "useEffect()", "useContext()", "useReducer()", "useMemo()", "useCallback()", "useRef()", "useImperativeHandle()", "useLayoutEffect()", "useDebugValue()", "React.Component", "React.Fragment", "ReactDOM.render()", "props", "state", "setState()", "componentDidMount()", "componentDidUpdate()", "componentWillUnmount()", "render()", "jsx", "tsx",
        
        // Node.js and backend
        "require()", "module.exports", "exports", "__dirname", "__filename", "process.env", "process.argv", "Buffer", "fs", "path", "http", "https", "url", "querystring", "crypto", "os", "util", "events", "stream", "readline", "child_process", "cluster", "worker_threads", "express()", "app.get()", "app.post()", "app.listen()", "req", "res", "next()", "middleware",
        
        // Package managers and tools
        "npm", "yarn", "package.json", "node_modules", "npm install", "npm start", "npm test", "npm run", "webpack", "babel", "eslint", "prettier", "typescript", "tsc", "tsconfig.json", ".env", "dotenv", "jest", "mocha", "chai", "cypress", "selenium",
        
        // Git commands (as single tokens)
        "git", "init", "clone", "add", "commit", "push", "pull", "fetch", "merge", "rebase", "branch", "checkout", "reset", "log", "status", "diff", "stash", "remote", "origin", "master", "main", "develop", "feature", "hotfix",
        
        // Database and queries
        "SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "GROUP", "ORDER", "BY", "HAVING", "LIMIT", "OFFSET", "COUNT", "SUM", "AVG", "MIN", "MAX", "DISTINCT", "UNION", "CREATE", "DROP", "ALTER", "INDEX", "PRIMARY", "FOREIGN", "KEY", "NULL", "NOT", "AND", "OR",
        
        // CSS selectors and properties
        "display", "position", "flex", "grid", "margin", "padding", "border", "width", "height", "color", "background", "font-size", "font-family", "text-align", "justify-content", "align-items", "flex-direction", "grid-template", "z-index", "opacity", "transform", "transition", "animation", "hover", "focus", "active", "nth-child", "first-child", "last-child", "::before", "::after",
        
        // HTTP and API
        "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD", "200", "201", "204", "301", "302", "304", "400", "401", "403", "404", "409", "422", "429", "500", "502", "503", "504", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "ETag", "CORS", "REST", "GraphQL", "API", "endpoint", "middleware", "rate-limit"
    ]
};

// Legacy support - default to medium difficulty
const words = wordsByDifficulty.medium;

// Export both the categorized words and legacy words array
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { wordsByDifficulty, words };
}

// For browser environments
if (typeof window !== 'undefined') {
    window.wordsByDifficulty = wordsByDifficulty;
    window.words = words;
}