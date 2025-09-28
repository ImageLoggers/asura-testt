// Admin System
const OWNERSHIP_KEY = "Asura_James_2025";
let isOwner = localStorage.getItem('isOwner') === 'true';
let typedText = '';

// Admin commands
const ADMIN_COMMANDS = {
    '/RemoveAdmin': removeAdminAccess
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

    logoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        logoPopup.classList.add('active');
    });

    closePopup.addEventListener('click', function() {
        logoPopup.classList.remove('active');
    });

    logoPopup.addEventListener('click', function(e) {
        if (e.target === logoPopup) {
            logoPopup.classList.remove('active');
        }
    });

    // Setup website buttons
    document.getElementById('website1').addEventListener('click', function() {
        openWebsite('https://example1.com');
    });
    
    document.getElementById('website2').addEventListener('click', function() {
        openWebsite('https://example2.com');
    });
    
    document.getElementById('website3').addEventListener('click', function() {
        openWebsite('https://example3.com');
    });
}

function openWebsite(url) {
    window.open(url, '_blank');
}

// Admin command system
function setupAdminCommands() {
    document.addEventListener('keydown', function(e) {
        if (e.key.length === 1 && e.key.match(/[a-zA-Z_0-9\/]/)) {
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
        showRemoveAdminMessage();
    }
}

function showAccessMessage() {
    const message = document.getElementById('accessMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
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