/* =====================================================
   Swaraj Tours and Travels - site script
   ===================================================== */

/* ---------- Business settings: yahan ek jagah badlo ---------- */
const WHATSAPP_NUMBER = "919860707287"; // country code ke saath, bina + ke
const TAGLINES = [
  "Book Your Cab in Seconds",
  "Fast, Safe & Reliable Rides",
  "On-Time Pickup, Every Time",
  "Comfortable Rides at Best Prices",
  "Trusted Cab Service in Nashik",
  "Airport, Local & Outstation Travel",
  "Professional Drivers You Can Trust",
  "24/7 Cab Booking Made Easy",
  "Travel Smart. Travel Safe."
];
// Popular routes list: hub cities aur source cities se auto-generate hoti hai
const HUBS = ["Nashik", "Pune", "Mumbai"];
const CITIES = ["Mumbai", "Pune", "Nashik", "Shirdi", "Aurangabad", "Thane", "Lonavala", "Mahabaleshwar", "Alibag", "Panchgani",
  "Igatpuri", "Kolhapur", "Satara", "Sangli", "Solapur", "Ahmednagar", "Jalgaon", "Dhule", "Nagpur", "Surat", "Vapi", "Goa", "Ahmedabad", "Indore"];
const SPECIAL_ROUTES = [
  ["Mumbai Airport", "Nashik"], ["Pune Airport", "Pune"], ["Mumbai Airport", "Pune"], ["Shirdi Airport", "Shirdi"],
  ["Nashik", "Trimbakeshwar"], ["Nashik", "Bhimashankar"], ["Pune", "Bhimashankar"], ["Mumbai", "Shirdi"]
];

/* Firebase config (OTP login). Setup steps README.md me hain.
   Jab tak PASTE_ values hain, login button "not active" message dikhayega aur baaki site normal chalegi. */
const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_FIREBASE_APP_ID"
};
const FIREBASE_VERSION = "11.10.0";

/* Location autocomplete (pickup / drop fields):
   - Khali rakho  => free OpenStreetMap (Photon) suggestions, koi key / billing nahi chahiye.
   - Google Maps API key daalo => Google Places suggestions. Setup README.md me hai. */
const GOOGLE_MAPS_API_KEY = "";
const HOME_LAT = 19.9975, HOME_LON = 73.7898; // Nashik: suggestions isi area ke aas-paas se pehle aati hain

/* Google Business Profile links. Setup guide: google-business-profile.md
   GOOGLE_MAPS_URL   = Maps listing ka "Share" link (https://maps.app.goo.gl/...). Contact section aur footer "G" icon isse khulte hain.
   GOOGLE_REVIEW_URL = Business Profile ka "Ask for reviews" link (https://g.page/r/.../review). Reviews section ka button isse khulta hai.
   Khali rakho => Google Maps par business name se search khulta hai, kuch tootta nahi. */
const GOOGLE_MAPS_URL = "";
const GOOGLE_REVIEW_URL = "";

const $ = (id) => document.getElementById(id);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const waLink = (text) => "https://wa.me/" + WHATSAPP_NUMBER + (text ? "?text=" + encodeURIComponent(text) : "");

/* ---------- Common ---------- */
$$("a.wa").forEach(a => { a.href = waLink(a.dataset.text || ""); });
const mapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Swaraj Tours and Travels Nashik");
$$("a.gmap").forEach(a => { a.href = GOOGLE_MAPS_URL || mapsSearchUrl; });
$$("a.gmap-review").forEach(a => { a.href = GOOGLE_REVIEW_URL || GOOGLE_MAPS_URL || mapsSearchUrl; });
$("year").textContent = new Date().getFullYear();

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
$$("input[type=date]").forEach(i => { i.min = localDate; });

/* ---------- Rotating taglines ---------- */
let tagIdx = 0;
setInterval(() => {
  const el = $("tagline");
  el.classList.add("fade");
  setTimeout(() => { tagIdx = (tagIdx + 1) % TAGLINES.length; el.textContent = TAGLINES[tagIdx]; el.classList.remove("fade"); }, 400);
}, 3500);

/* ---------- Mobile menu ---------- */
$("menuToggle").addEventListener("click", () => {
  const open = $("navlinks").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
$$("#navlinks a").forEach(a => a.addEventListener("click", () => $("navlinks").classList.remove("open")));

/* ---------- Booking tabs ---------- */
function activateTab(name) {
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  $$(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
}
$$(".tab").forEach(t => t.addEventListener("click", () => activateTab(t.dataset.tab)));

// Airport sub-tabs
let airportMode = "Airport Pickup";
$$("#ap-modes .subtab").forEach(b => b.addEventListener("click", () => {
  airportMode = b.dataset.mode;
  $$("#ap-modes .subtab").forEach(x => x.classList.toggle("active", x === b));
  $("ap-placeLabel").textContent = airportMode === "Airport Drop" ? "Pickup Location *" : "Drop Location *";
}));

// Round trip: add another city (max 3)
let extraCount = 0;
$("rt-addCity").addEventListener("click", () => {
  if (extraCount >= 3) return;
  extraCount++;
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.innerHTML = `<label for="rt-city${extraCount}">Via City ${extraCount}</label><input id="rt-city${extraCount}" class="rt-city" placeholder="City name" data-place autocomplete="off">`;
  $("rt-extra").appendChild(wrap);
  attachAutocomplete(wrap.querySelector("input"));
  wrap.querySelector("input").focus();
  if (extraCount >= 3) $("rt-addCity").classList.add("hidden");
});

/* ---------- Location autocomplete ---------- */
let googlePlaces = null; // { AutocompleteSuggestion, AutocompleteSessionToken } jab Google load ho jaye
let googleFailed = false;

function loadGooglePlaces() {
  if (!GOOGLE_MAPS_API_KEY || googlePlaces || googleFailed) return;
  const s = document.createElement("script");
  s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(GOOGLE_MAPS_API_KEY) + "&v=weekly&loading=async";
  s.onload = () => google.maps.importLibrary("places").then(lib => { googlePlaces = lib; }).catch(err => { console.warn("Google Places unavailable, using OpenStreetMap", err); googleFailed = true; });
  s.onerror = () => { console.warn("Google Maps script failed to load, using OpenStreetMap"); googleFailed = true; };
  document.head.appendChild(s);
}
loadGooglePlaces();

async function suggestGoogle(q) {
  const { AutocompleteSuggestion, AutocompleteSessionToken } = googlePlaces;
  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input: q, includedRegionCodes: ["in"], sessionToken: new AutocompleteSessionToken(),
    locationBias: { center: { lat: HOME_LAT, lng: HOME_LON }, radius: 300000 }
  });
  return suggestions.map(s => s.placePrediction?.text?.text).filter(Boolean);
}
async function suggestPhoton(q) {
  const url = "https://photon.komoot.io/api/?q=" + encodeURIComponent(q) + "&limit=8&lang=en&lat=" + HOME_LAT + "&lon=" + HOME_LON;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Photon " + res.status);
  const data = await res.json();
  const seen = new Set(), out = [];
  for (const f of data.features || []) {
    const p = f.properties || {};
    if (p.countrycode && p.countrycode !== "IN") continue;
    const parts = [];
    for (const x of [p.name, p.city || p.district || p.county, p.state]) {
      if (!x || parts.includes(x)) continue;
      if (parts.length && /(Subdistrict|District|Taluka|Tehsil)$/i.test(x)) continue; // "Nashik, Nashik Subdistrict" jaisa shor hatao
      parts.push(x);
    }
    const label = parts.join(", ");
    if (label && !seen.has(label)) { seen.add(label); out.push(label); }
    if (out.length >= 6) break;
  }
  return out;
}
async function suggest(q) {
  if (googlePlaces) { try { return await suggestGoogle(q); } catch (err) { console.warn("Google suggestions failed, using OpenStreetMap", err); } }
  return suggestPhoton(q);
}

function attachAutocomplete(input) {
  const field = input.closest(".field");
  const list = document.createElement("ul");
  list.className = "ac-list"; list.setAttribute("role", "listbox");
  field.appendChild(list);
  input.setAttribute("autocomplete", "off");
  let items = [], active = -1, timer = null, seq = 0;

  const close = () => { list.innerHTML = ""; list.classList.remove("show"); items = []; active = -1; };
  const render = () => {
    list.innerHTML = items.map((t, i) => `<li role="option" class="${i === active ? "active" : ""}">${t.replace(/</g, "&lt;")}</li>`).join("");
    list.classList.toggle("show", items.length > 0);
  };
  const pick = (i) => { if (items[i] !== undefined) input.value = items[i]; close(); };

  input.addEventListener("input", () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 2) { close(); return; }
    timer = setTimeout(async () => {
      const mySeq = ++seq;
      try {
        const res = await suggest(q);
        if (mySeq !== seq || document.activeElement !== input) return; // purana result ya field chhod di
        items = res; active = -1; render();
      } catch (err) { console.warn("Autocomplete unavailable", err); close(); }
    }, 300);
  });
  input.addEventListener("keydown", (e) => {
    if (!items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % items.length; render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + items.length) % items.length; render(); }
    else if (e.key === "Enter") { if (active >= 0) { e.preventDefault(); pick(active); } else close(); }
    else if (e.key === "Escape") close();
  });
  list.addEventListener("mousedown", (e) => { e.preventDefault(); const li = e.target.closest("li"); if (li) pick(Array.from(list.children).indexOf(li)); });
  input.addEventListener("blur", () => setTimeout(close, 150));
}
$$("input[data-place]").forEach(attachAutocomplete);

/* ---------- Validation + WhatsApp submit ---------- */
let pendingNote = "";

function setStatus(form, message, kind = "error") {
  const s = form.querySelector(".status");
  s.textContent = message; s.className = "status " + kind;
}
function labelOf(input) {
  const l = input.closest(".field")?.querySelector("label");
  return (l ? l.textContent : "This field").replace("*", "").trim();
}
function validate(form) {
  for (const input of $$("[data-req]", form)) {
    if (!input.value.trim()) { setStatus(form, `Please enter ${labelOf(input)}.`); input.focus(); return false; }
  }
  for (const input of $$("[data-date]", form)) {
    if (input.value && input.value < localDate) { setStatus(form, `${labelOf(input)} cannot be in the past.`); input.focus(); return false; }
    const after = input.dataset.after;
    if (after && input.value && input.value < $(after).value) { setStatus(form, `${labelOf(input)} must be on or after ${labelOf($(after))}.`); input.focus(); return false; }
  }
  return true;
}
const v = (id) => ($(id).value || "").trim();
const or = (val, fallback) => val || fallback;

function buildMessage(form) {
  const type = form.dataset.type;
  const rows = [["Trip type", type]];
  if (type === "One Way") {
    rows.push(["Pickup", v("ow-from")], ["Drop", v("ow-to")], ["Date", v("ow-date")], ["Time", or(v("ow-time"), "Not specified")], ["Vehicle", v("ow-vehicle")]);
  } else if (type === "Round Trip") {
    const via = $$(".rt-city").map(i => i.value.trim()).filter(Boolean);
    rows.push(["From", v("rt-from")], ["To", v("rt-to")]);
    if (via.length) rows.push(["Via", via.join(", ")]);
    rows.push(["Date", v("rt-date")], ["Time", or(v("rt-time"), "Not specified")], ["Return", v("rt-return")], ["Vehicle", v("rt-vehicle")]);
  } else if (type === "Local") {
    rows.push(["Pickup", v("lo-from")], ["Date", v("lo-date")], ["Time", or(v("lo-time"), "Not specified")], ["Package", v("lo-pkg")], ["Vehicle", v("lo-vehicle")]);
  } else if (type === "Airport Transfer") {
    rows.push(["Mode", airportMode], ["Airport", v("ap-airport")],
      [airportMode === "Airport Drop" ? "Pickup" : "Drop", v("ap-place")],
      ["Date", v("ap-date")], ["Time", or(v("ap-time"), "Not specified")], ["Flight", or(v("ap-flight"), "Not provided")]);
  } else if (type === "Sharing Ride") {
    rows.push(["Pickup", v("sh-from")], ["Drop airport", v("sh-airport")], ["Date", v("sh-date")], ["Time", or(v("sh-time"), "Not specified")], ["Passengers", v("sh-pax")]);
  }
  if (pendingNote) rows.push(["Package", pendingNote]);
  return "New cab enquiry - Swaraj Tours and Travels\n" + rows.map(([k, val]) => `${k}: ${val}`).join("\n");
}

$$(".tab-panel").forEach(form => form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate(form)) return;
  setStatus(form, "Opening WhatsApp with your enquiry...", "success");
  window.open(waLink(buildMessage(form)), "_blank", "noopener");
  pendingNote = "";
}));

/* ---------- Prefill helpers (packages, places, routes) ---------- */
function prefill({ tab, from, to, airport, pkg, note }) {
  activateTab(tab);
  pendingNote = note || "";
  const map = { oneway: ["ow-from", "ow-to"], round: ["rt-from", "rt-to"], local: ["lo-from"], sharing: ["sh-from"], airport: ["ap-place"] };
  const [fromId, toId] = map[tab];
  if (from !== undefined && fromId) $(fromId).value = from;
  if (to !== undefined && toId) $(toId).value = to;
  if (tab === "airport") {
    if (airport) $("ap-airport").value = airport;
    if (to) $("ap-place").value = to;
  }
  if (tab === "local" && pkg) $("lo-pkg").value = pkg;
  $("book").scrollIntoView({ behavior: "smooth" });
  // scroll ke baad pehli khali field par focus
  setTimeout(() => { const first = $$("[data-req]", $("panel-" + tab)).find(i => !i.value); if (first) first.focus({ preventScroll: true }); }, 500);
}

$$(".book-pkg").forEach(b => b.addEventListener("click", () => prefill({
  tab: b.dataset.tab, from: b.dataset.from, to: b.dataset.to, airport: b.dataset.airport, pkg: b.dataset.pkg, note: b.dataset.note
})));
$$(".place").forEach(a => a.addEventListener("click", (e) => { e.preventDefault(); prefill({ tab: "oneway", to: a.dataset.to }); }));

// Popular routes list
const routes = [];
for (const hub of HUBS) for (const c of CITIES) if (c !== hub) routes.push([c, hub]);
for (const r of SPECIAL_ROUTES) routes.push(r);
$("routesList").innerHTML = routes.map(([a, b]) => `<a href="#book" data-from="${a}" data-to="${b}">${a} to ${b} Taxi</a>`).join("");
$$("#routesList a").forEach(a => a.addEventListener("click", (e) => {
  e.preventDefault();
  const isAirport = /Airport/.test(a.dataset.from);
  if (isAirport) prefill({ tab: "airport", airport: $$("#ap-airport option").map(o => o.text).find(t => t.startsWith(a.dataset.from.split(" ")[0])), to: a.dataset.to });
  else prefill({ tab: "oneway", from: a.dataset.from, to: a.dataset.to });
}));

/* ---------- Login modal ---------- */
const modal = $("loginModal");
let lastFocused = null;
function openLogin(e) {
  if (e) e.preventDefault();
  lastFocused = document.activeElement;
  modal.classList.add("show");
  if (auth) setLoginStatus(""); else notActive();
  (auth && auth.currentUser ? $("signOutBtn") : $("loginPhone")).focus();
}
function closeLogin() { modal.classList.remove("show"); if (lastFocused) lastFocused.focus(); }
$("openLoginBtn").addEventListener("click", openLogin);
$("topLoginBtn").addEventListener("click", openLogin);
$("closeLoginBtn").addEventListener("click", closeLogin);
modal.addEventListener("click", e => { if (e.target === modal) closeLogin(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("show")) closeLogin(); });

/* ---------- Firebase phone auth ----------
   Firebase sirf tab load hota hai jab config bhari ho. Isse site bina internet / file:// par bhi
   normal chalti hai aur Firebase ka code sirf zaroorat par download hota hai. */
let auth = null, FB = null, recaptchaVerifier = null, confirmationResult = null;
const setLoginStatus = (message, kind = "") => { $("loginStatus").textContent = message; $("loginStatus").className = "status " + kind; };
const firebaseReady = !firebaseConfig.apiKey.startsWith("PASTE_") && !firebaseConfig.projectId.startsWith("PASTE_") && !firebaseConfig.appId.startsWith("PASTE_");
const notActive = () => setLoginStatus("Login is not active yet. Please book on WhatsApp.", "error");

if (firebaseReady) {
  const base = "https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/";
  Promise.all([import(base + "firebase-app.js"), import(base + "firebase-auth.js")])
    .then(([appMod, authMod]) => {
      FB = authMod;
      auth = authMod.getAuth(appMod.initializeApp(firebaseConfig));
      authMod.onAuthStateChanged(auth, user => {
        const signedIn = !!user;
        $("loggedInBox").classList.toggle("show", signedIn);
        $("phoneStep").classList.toggle("hidden", signedIn);
        $("otpStep").classList.add("hidden");
        $("openLoginBtn").textContent = signedIn ? "My Account" : "Customer Login";
        $("topLoginBtn").textContent = signedIn ? "My Account" : "Login";
        if (signedIn) { $("signedInText").textContent = "Signed in as " + (user.phoneNumber || "verified customer") + "."; setLoginStatus("Mobile number verified successfully.", "success"); }
      });
    })
    .catch(err => { console.error(err); setLoginStatus("Login is temporarily unavailable. Please book on WhatsApp.", "error"); });
}

async function resetRecaptcha() {
  if (recaptchaVerifier) { try { await recaptchaVerifier.clear(); } catch {} recaptchaVerifier = null; }
  $("recaptcha-container").innerHTML = "";
}
$("sendOtpBtn").addEventListener("click", async () => {
  if (!auth) { notActive(); return; }
  const phone = $("loginPhone").value.trim().replace(/\s+/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) { setLoginStatus("Enter the number with country code, e.g. +919860707287.", "error"); return; }
  $("sendOtpBtn").disabled = true;
  try {
    await resetRecaptcha();
    recaptchaVerifier = new FB.RecaptchaVerifier(auth, "recaptcha-container", { size: "normal" });
    await recaptchaVerifier.render();
    confirmationResult = await FB.signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    $("phoneStep").classList.add("hidden"); $("otpStep").classList.remove("hidden");
    setLoginStatus("OTP sent successfully. Check your SMS.", "success");
    $("otpCode").focus();
  } catch (err) { console.error(err); setLoginStatus(friendlyError(err), "error"); await resetRecaptcha(); }
  finally { $("sendOtpBtn").disabled = false; }
});
$("verifyOtpBtn").addEventListener("click", async () => {
  const code = $("otpCode").value.trim();
  if (!confirmationResult) { setLoginStatus("Please request an OTP first.", "error"); return; }
  if (!/^\d{6}$/.test(code)) { setLoginStatus("Please enter a valid 6-digit OTP.", "error"); return; }
  $("verifyOtpBtn").disabled = true;
  try { await confirmationResult.confirm(code); setLoginStatus("Login successful.", "success"); }
  catch (err) { console.error(err); setLoginStatus(friendlyError(err), "error"); }
  finally { $("verifyOtpBtn").disabled = false; }
});
$("backPhoneBtn").addEventListener("click", async () => {
  confirmationResult = null; await resetRecaptcha();
  $("otpStep").classList.add("hidden"); $("phoneStep").classList.remove("hidden");
  setLoginStatus(""); $("loginPhone").focus();
});
$("signOutBtn").addEventListener("click", async () => {
  if (!auth) { notActive(); return; }
  try { await FB.signOut(auth); setLoginStatus("You have signed out."); } catch (err) { setLoginStatus(friendlyError(err), "error"); }
});
function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("invalid-phone-number")) return "That mobile number looks invalid. Use country code format such as +91...";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait and try again later.";
  if (code.includes("invalid-verification-code")) return "Please enter a valid OTP.";
  if (code.includes("captcha-check-failed")) return "reCAPTCHA verification failed. Please try again.";
  return "Could not complete sign-in. Please try again or book on WhatsApp.";
}
