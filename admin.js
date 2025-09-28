// Admin System
const OWNERSHIP_KEY = "Asura_James_2025";
let isOwner = localStorage.getItem('isOwner') === 'true';
let typedText = '';

// Admin commands
const ADMIN_COMMANDS = {
    '/RemoveAdmin': removeAdminAccess,
    '/Remove-All-Admin': removeAllAdminAccess,
    '/Set-Key-Valid-Cooldown-Reset': resetKeyCooldown,
    '/SET-0-COOLDOWN': setZeroCooldown
};

// Initialize admin system
document.addEventListener('DOMContentLoaded', function() {
    verifyOwnership();
    setupLogoPopup();
    setupAdminCommands();
});

// Logo popup functionality
function setupLogoPopup() {
    const logoBtn = document.getElementById('logoBtn');
    const logoPopup = document.getElementById('logoPopup');
    const closePopup = document.getElementById('closePopup');
    const galaxyHubBtn = document.getElementById('galaxyHubBtn');
    const adminPanelBtn = document.getElementById('adminPanelBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // Logo click - open popup
    logoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        logoPopup.classList.add('active');
    });

    // Close popup
    closePopup.addEventListener('click', function() {
        logoPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    logoPopup.addEventListener('click', function(e) {
        if (e.target === logoPopup) {
            logoPopup.classList.remove('active');
        }
    });

    // Galaxy Hub Button - Open new website
    galaxyHubBtn.addEventListener('click', function() {
        openGalaxyHub();
    });

    // Admin Panel Button - Show admin options
    adminPanelBtn.addEventListener('click', function() {
        showAdminPanel();
    });

    // Settings Button - Show settings
    settingsBtn.addEventListener('click', function() {
        showSettings();
    });
}

// Open Galaxy Hub Website
function openGalaxyHub() {
    const galaxyWindow = window.open('', 'AsuraGalaxyHub', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    // Create galaxy-themed HTML content
    const galaxyHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Asura Galaxy Hub</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #0a0a2a, #1a1a4a, #2a2a6a);
                background-size: 400% 400%;
                animation: galaxyShift 15s ease infinite;
                color: white;
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
            }

            @keyframes galaxyShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .stars {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }

            .star {
                position: absolute;
                background: white;
                border-radius: 50%;
                animation: twinkle 3s infinite;
            }

            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }

            .container {
                position: relative;
                z-index: 2;
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px 20px;
                text-align: center;
            }

            .header {
                margin-bottom: 50px;
            }

            .logo {
                width: 120px;
                height: 120px;
                margin: 0 auto 20px;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
                border: 3px solid rgba(0, 255, 255, 0.3);
            }

            .logo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            h1 {
                font-size: 3.5rem;
                background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            }

            .subtitle {
                font-size: 1.2rem;
                color: #aaccff;
                margin-bottom: 30px;
            }

            .hub-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }

            .hub-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 30px;
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .hub-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: left 0.5s;
            }

            .hub-card:hover::before {
                left: 100%;
            }

            .hub-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 30px rgba(0, 255, 255, 0.3);
                border-color: rgba(0, 255, 255, 0.5);
            }

            .card-icon {
                font-size: 3rem;
                margin-bottom: 20px;
                color: #00ffff;
            }

            .card-title {
                font-size: 1.5rem;
                margin-bottom: 15px;
                color: #ffffff;
            }

            .card-description {
                color: #aaccff;
                line-height: 1.6;
            }

            .coming-soon {
                background: rgba(255, 255, 255, 0.05);
                border: 1px dashed rgba(255, 255, 255, 0.3);
            }

            .coming-soon .card-title {
                color: #888;
            }

            .coming-soon .card-description {
                color: #666;
            }

            .floating-planet {
                position: fixed;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #ff6b6b, #4ecdc4);
                animation: float 20s infinite linear;
                z-index: 1;
            }

            .floating-planet:nth-child(1) {
                top: 10%;
                left: 5%;
                background: radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c);
            }

            .floating-planet:nth-child(2) {
                top: 60%;
                right: 10%;
                background: radial-gradient(circle at 40% 20%, #74b9ff, #0984e3);
                animation-delay: -10s;
            }

            .floating-planet:nth-child(3) {
                bottom: 20%;
                left: 15%;
                background: radial-gradient(circle at 35% 25%, #fdcb6e, #e17055);
                animation-delay: -5s;
            }

            @keyframes float {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(50px, -30px) rotate(90deg); }
                50% { transform: translate(100px, 0) rotate(180deg); }
                75% { transform: translate(50px, 30px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="stars" id="starsContainer"></div>
        
        <!-- Floating Planets -->
        <div class="floating-planet"></div>
        <div class="floating-planet"></div>
        <div class="floating-planet"></div>
        
        <div class="container">
            <div class="header">
                <div class="logo">
                    <img src="https://imagizer.imageshack.com/img923/4805/ipaMfu.png" alt="Asura Logo">
                </div>
                <h1>Asura Galaxy Hub</h1>
                <p class="subtitle">Explore the universe of possibilities</p>
            </div>
            
            <div class="hub-grid">
                <div class="hub-card" onclick="alert('Key System Loading...')">
                    <div class="card-icon">🔑</div>
                    <h3 class="card-title">Key System</h3>
                    <p class="card-description">Access the main key generation system and manage your keys</p>
                </div>
                
                <div class="hub-card" onclick="alert('Dashboard Coming Soon...')">
                    <div class="card-icon">📊</div>
                    <h3 class="card-title">User Dashboard</h3>
                    <p class="card-description">View your statistics, key history, and account information</p>
                </div>
                
                <div class="hub-card coming-soon">
                    <div class="card-icon">🚀</div>
                    <h3 class="card-title">Premium Features</h3>
                    <p class="card-description">Exclusive tools and enhanced capabilities (Coming Soon)</p>
                </div>
                
                <div class="hub-card coming-soon">
                    <div class="card-icon">👥</div>
                    <h3 class="card-title">Community Hub</h3>
                    <p class="card-description">Connect with other users and share experiences (Coming Soon)</p>
                </div>
                
                <div class="hub-card coming-soon">
                    <div class="card-icon">⚡</div>
                    <h3 class="card-title">Quick Tools</h3>
                    <p class="card-description">Instant access to frequently used utilities (Coming Soon)</p>
                </div>
                
                <div class="hub-card coming-soon">
                    <div class="card-icon">🔧</div>
                    <h3 class="card-title">Advanced Settings</h3>
                    <p class="card-description">Customize your experience with advanced options (Coming Soon)</p>
                </div>
            </div>
        </div>

        <script>
            // Create stars
            function createStars() {
                const container = document.getElementById('starsContainer');
                for (let i = 0; i < 200; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.width = Math.random() * 2 + 1 + 'px';
                    star.style.height = star.style.width;
                    star.style.animationDelay = Math.random() * 3 + 's';
                    container.appendChild(star);
                }
            }
            
            createStars();
        </script>
    </body>
    </html>
    `;
    
    galaxyWindow.document.write(galaxyHTML);
    galaxyWindow.document.close();
    
    // Close the popup
    document.getElementById('logoPopup').classList.remove('active');
}

// Show Admin Panel
function showAdminPanel() {
    if (isOwner) {
        alert('Admin Panel:\n\nAvailable Commands:\n• /RemoveAdmin\n• /Remove-All-Admin\n• /Set-Key-Valid-Cooldown-Reset\n• /SET-0-COOLDOWN\n\nType these commands anywhere on the page.');
    } else {
        alert('Admin access required. Type the ownership key to activate admin privileges.');
    }
    document.getElementById('logoPopup').classList.remove('active');
}

// Show Settings
function showSettings() {
    alert('Settings Panel:\n\n• Theme: Galaxy/Sunny\n• Notifications: Enabled\n• Auto-generate: Enabled\n\nMore settings coming soon...');
    document.getElementById('logoPopup').classList.remove('active');
}

// ... rest of your existing admin.js functions remain the same ...
function openWebsite(url) {
    window.open(url, '_blank');
}

// Admin command system
function setupAdminCommands() {
    document.addEventListener('keydown', function(e) {
        if (e.key.length === 1 && e.key.match(/[a-zA-Z_0-9\/\-]/)) {
            typedText += e.key;
            
            // Check for ownership key
            if (typedText.includes(OWNERSHIP_KEY)) {
                activateOwnership();
                typedText = '';
            }
            
            // Check for admin commands
            for (const [command, action] of Object.entries(ADMIN_COMMANDS)) {
                if (typedText.includes(command)) {
                    action();
                    typedText = '';
                    break;
                }
            }
            
            // Limit the length to prevent memory issues
            if (typedText.length > 50) {
                typedText = typedText.slice(-50);
            }
        }
    });
}

// Ownership functions
function verifyOwnership() {
    const storedKey = localStorage.getItem('ownershipKey');
    if (storedKey === OWNERSHIP_KEY) {
        isOwner = true;
        localStorage.setItem('isOwner', 'true');
        return true;
    }
    return false;
}

function activateOwnership() {
    localStorage.setItem('ownershipKey', OWNERSHIP_KEY);
    localStorage.setItem('isOwner', 'true');
    isOwner = true;
    showAccessMessage();
    return true;
}

function removeAdminAccess() {
    if (isOwner) {
        localStorage.removeItem('ownershipKey');
        localStorage.removeItem('isOwner');
        isOwner = false;
        showAdminMessage('ADMIN ACCESS REMOVED!', 'rgba(255, 0, 0, 0.9)');
    }
}

function removeAllAdminAccess() {
    if (isOwner) {
        // Remove all admin-related data
        localStorage.removeItem('ownershipKey');
        localStorage.removeItem('isOwner');
        localStorage.removeItem('userIP');
        
        // Also clear any special IP settings
        const specialIPs = ['210.23.161.56', '2001:4454:3a4:ca00:28c7:3c7a:a0a1:dccd'];
        localStorage.removeItem('specialIPs');
        
        isOwner = false;
        showAdminMessage('ALL ADMIN ACCESS COMPLETELY REMOVED!', 'rgba(255, 50, 50, 0.9)');
    }
}

function resetKeyCooldown() {
    if (isOwner) {
        // Set last generated time to current time (key is fresh)
        localStorage.setItem('lastGeneratedTime', new Date().getTime());
        
        // Reset cooldown flags
        localStorage.setItem('refreshAfterCooldown', 'false');
        
        // Clear any existing timer
        const cooldownTimer = document.getElementById('cooldownTimer');
        if (cooldownTimer) {
            cooldownTimer.style.display = 'none';
        }
        
        // Update the status message
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.textContent = 'Key cooldown reset! Your key is now valid.';
        }
        
        // Update the key display to show it's fresh
        const keyDisplay = document.getElementById('keyDisplay');
        if (keyDisplay && localStorage.getItem('currentKey')) {
            keyDisplay.textContent = localStorage.getItem('currentKey');
            keyDisplay.classList.add('key-generation-effect');
            setTimeout(() => {
                keyDisplay.classList.remove('key-generation-effect');
            }, 1000);
        }
        
        showAdminMessage('KEY COOLDOWN RESET! Key is now valid.', 'rgba(0, 255, 0, 0.9)');
        
        // Refresh the cooldown timer display
        if (window.startCooldownTimer) {
            window.startCooldownTimer(60 * 60 * 1000); // Reset to 1 hour
        }
    }
}

// NEW COMMAND: SET-0-COOLDOWN
function setZeroCooldown() {
    if (isOwner) {
        // Reset cooldown to zero (make key immediately valid)
        localStorage.setItem('lastGeneratedTime', new Date().getTime());
        
        // Set a flag to indicate zero cooldown
        localStorage.setItem('zeroCooldownActive', 'true');
        
        // Clear any existing timer
        const cooldownTimer = document.getElementById('cooldownTimer');
        if (cooldownTimer) {
            cooldownTimer.style.display = 'none';
        }
        
        // Update the status message
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.textContent = 'Zero cooldown activated! Key is permanently valid.';
        }
        
        // Generate a new key immediately
        generateNewKeyAndRedirect();
        
        showAdminMessage('ZERO COOLDOWN ACTIVATED! New key generated and valid.', 'rgba(0, 200, 255, 0.9)');
    }
}

// Function to generate new key and redirect to loot-link
function generateNewKeyAndRedirect() {
    // Generate a fresh key
    const isSpecial = checkSpecialIP();
    const randomPart = generateRandomString(12);
    const specialNumbers = generateSpecialNumbers(3);
    const newKey = `KEY-ASURA-${randomPart}-${specialNumbers}`;
    
    // Store the new key with current timestamp
    localStorage.setItem('currentKey', newKey);
    localStorage.setItem('lastGeneratedTime', new Date().getTime());
    
    // Update the display
    const keyDisplay = document.getElementById('keyDisplay');
    const copyBtn = document.getElementById('copyBtn');
    
    if (keyDisplay) {
        keyDisplay.textContent = newKey;
        keyDisplay.classList.add('key-generation-effect');
        setTimeout(() => {
            keyDisplay.classList.remove('key-generation-effect');
        }, 1000);
    }
    
    if (copyBtn) {
        copyBtn.classList.add('show');
    }
    
    // Redirect to loot-link after a short delay to show the new key
    setTimeout(() => {
        window.location.href = 'https://loot-link.com/s?M0hGE55R';
    }, 2000);
}

// Helper function to check special IP (reuse from script.js)
function checkSpecialIP() {
    const specialIPs = ['210.23.161.56', '2001:4454:3a4:ca00:28c7:3c7a:a0a1:dccd'];
    const storedIP = localStorage.getItem('userIP');
    return storedIP && specialIPs.includes(storedIP);
}

// Helper function to generate random string (reuse from script.js)
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Helper function to generate special numbers (reuse from script.js)
function generateSpecialNumbers(count) {
    const specialNumbers = [];
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    
    for (let i = 0; i < count; i++) {
        if (Math.random() > 0.5) {
            specialNumbers.push(primes[Math.floor(Math.random() * primes.length)]);
        } else {
            specialNumbers.push(fibonacci[Math.floor(Math.random() * fibonacci.length)]);
        }
    }
    
    return specialNumbers.join('');
}

function showAccessMessage() {
    const message = document.getElementById('accessMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

function showAdminMessage(text, backgroundColor = 'rgba(0, 255, 0, 0.9)') {
    const message = document.getElementById('accessMessage');
    const originalText = message.textContent;
    const originalBackground = message.style.background;
    
    message.style.background = backgroundColor;
    message.textContent = text;
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
        // Reset to original message
        setTimeout(() => {
            message.style.background = originalBackground;
            message.textContent = originalText;
        }, 500);
    }, 3000);
}

function showRemoveAdminMessage() {
    const message = document.getElementById('accessMessage');
    message.style.background = 'rgba(255, 0, 0, 0.9)';
    message.textContent = 'ADMIN ACCESS REMOVED!';
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
        // Reset to original message
        setTimeout(() => {
            message.style.background = '';
            message.textContent = 'ACCESS GRANTED: Owner privileges activated!';
        }, 500);
    }, 3000);
}
