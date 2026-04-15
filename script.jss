let quotes = [];

// Load quotes from external JSON
async function loadQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
    } catch (e) {
        quotes = ["You are amazing!"]; 
    }
}

const importantDates = [
    { name: "The Day We Met", date: "Oct 16" },
    { name: "Beach Day", date: "Feb 12" }
];

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    let targets = importantDates.map(d => {
        let t = new Date(`${d.date} ${currentYear}`);
        if (t < now) t.setFullYear(currentYear + 1);
        return { name: d.name, date: t };
    });

    targets.sort((a, b) => a.date - b.date);
    const nextEvent = targets[0];

    const diff = nextEvent.date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    document.getElementById('countdown-label').innerText = nextEvent.name;
    document.getElementById('timer').innerText = `${days}d ${hours}h ${mins}m`;
}

function newQuote() {
    // Random Quote
    if (quotes.length > 0) {
        const randomQ = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('one-liner').innerText = randomQ;
    }

    // Random Photo (expects images 1.jpg through 10.jpg)
    const randomImg = Math.floor(Math.random() * 10) + 1;
    document.getElementById('us-photo').src = `images/${randomImg}.jpg`;
}

function openVault() {
    const lastOpened = localStorage.getItem('vaultLastOpened');
    const now = new Date().getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    if (!lastOpened || (now - lastOpened) > thirtyDays) {
        document.getElementById('vault-content').classList.toggle('hidden');
        if (!document.getElementById('vault-content').classList.contains('hidden')) {
            localStorage.setItem('vaultLastOpened', now);
            alert("The Vault is officially unlocked for today!");
        }
    } else {
        const remaining = Math.ceil((thirtyDays - (now - lastOpened)) / (1000 * 60 * 60 * 24));
        alert(`Almost there! The vault unlocks in ${remaining} days.`);
    }
}

// Initial Run
loadQuotes();
updateCountdown();
setInterval(updateCountdown, 60000);
