// ---------- Funny random text (home page) ----------
const jokes = [
  "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I'd tell you a UDP joke, but you might not get it.",
  "My code has two states: 'works and I don't know why' and 'broken and I don't know why'.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "I would love to change the world, but they won't give me the source code.",
  "It's not a bug, it's an undocumented feature.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
  "My Wi-Fi went down for five minutes. I had to talk to my family. They seem nice."
];

const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("new-joke");

function showJoke() {
  if (!jokeEl) return;
  let next;
  do {
    next = jokes[Math.floor(Math.random() * jokes.length)];
  } while (next === jokeEl.textContent && jokes.length > 1);
  jokeEl.textContent = next;
}

if (jokeEl) {
  showJoke();
  if (jokeBtn) jokeBtn.addEventListener("click", showJoke);
}

// ---------- Search bar ----------
// A static site has no server, so we search a small built-in index of pages.
// Add your own pages here as the site grows.
const pages = [
  { title: "Home", url: "index.html", keywords: "home funny random jokes text laugh" },
  { title: "About", url: "about.html", keywords: "about site description info" },
  { title: "Contact", url: "contact.html", keywords: "contact email message form write" }
];

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("search-results");

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return pages.filter(p => (p.title + " " + p.keywords).toLowerCase().includes(q));
}

function renderResults(matches, query) {
  results.innerHTML = "";
  if (!query.trim()) {
    results.hidden = true;
    return;
  }
  if (matches.length === 0) {
    const li = document.createElement("li");
    li.className = "none";
    li.textContent = "No results";
    results.appendChild(li);
  } else {
    matches.forEach(p => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = p.url;
      a.textContent = p.title;
      li.appendChild(a);
      results.appendChild(li);
    });
  }
  results.hidden = false;
}

if (form && input && results) {
  input.addEventListener("input", () => renderResults(runSearch(input.value), input.value));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const matches = runSearch(input.value);
    if (matches.length > 0) window.location.href = matches[0].url;
    else renderResults(matches, input.value);
  });

  document.addEventListener("click", e => {
    if (!form.contains(e.target)) results.hidden = true;
  });
}
