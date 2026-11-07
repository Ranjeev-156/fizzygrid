import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Binary, Braces, Check,
  ChevronDown, Command, FileCode2, FileText, Filter, Heart, Image,
  Images, Layers3, Menu, Moon, Palette, QrCode, Regex, Search,
  SearchCheck, Sparkles, Sun, X, Zap, Clock3, WholeWord,
  GitCompareArrows, Grid2X2, Bookmark, SlidersHorizontal
} from "lucide-react";
import { categories, tools } from "./data/tools";
import "./styles.css";

const iconMap = {
  braces: Braces, "file-code": FileCode2, regex: Regex, binary: Binary,
  image: Image, images: Images, "file-text": FileText, "whole-word": WholeWord,
  "qr-code": QrCode, palette: Palette, "git-compare-arrows": GitCompareArrows,
  "search-check": SearchCheck
};

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("fg-theme") || "dark");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [view, setView] = useState("discover");
  const [favorites, setFavorites] = useState(() => readStore("fg-favorites", []));
  const [recent, setRecent] = useState(() => readStore("fg-recent", []));
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("fg-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fg-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("fg-recent", JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2400);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const openTool = (tool) => {
    if (!tool.url) {
      notify(`${tool.name} hasn't launched yet.`);
      return;
    }
    setRecent((current) => [tool.id, ...current.filter((id) => id !== tool.id)].slice(0, 8));
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const filteredTools = useMemo(() => {
    let list = [...tools];
    if (view === "favorites") list = list.filter((tool) => favorites.includes(tool.id));
    if (view === "recent") list = list.filter((tool) => recent.includes(tool.id))
      .sort((a, b) => recent.indexOf(a.id) - recent.indexOf(b.id));
    if (activeCategory !== "all") list = list.filter((tool) => tool.category === activeCategory);
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      list = list.filter((tool) =>
        [tool.name, tool.description, tool.category, ...tool.tags]
          .join(" ").toLowerCase().includes(normalized)
      );
    }
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [query, activeCategory, view, favorites, recent, sort]);

  const featured = tools.filter((tool) => tool.featured).slice(0, 4);
  const liveCount = tools.filter((tool) => Boolean(tool.url)).length;
  const activeCategoryLabel = categories.find((item) => item.id === activeCategory)?.label || "All tools";

  const selectView = (next) => {
    setView(next);
    setActiveCategory("all");
    setQuery("");
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ToolCard = ({ tool, compact = false }) => {
    const Icon = iconMap[tool.icon] || Grid2X2;
    const saved = favorites.includes(tool.id);
    return (
      <article className={`tool-card ${compact ? "compact" : ""}`}>
        <div className="tool-card-top">
          <div className="tool-icon"><Icon size={19} strokeWidth={1.65} /></div>
          <button className={`icon-button favorite-button ${saved ? "is-saved" : ""}`}
            aria-label={saved ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggleFavorite(tool.id)}>
            <Heart size={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="tool-card-copy">
          <div className="tool-title-row">
            <h3>{tool.name}</h3>
            <span className={`status-dot ${tool.url ? "live" : ""}`} title={tool.url ? "Available" : "Coming soon"} />
          </div>
          <p>{tool.description}</p>
        </div>
        <div className="tool-card-bottom">
          <span className="tool-category">{categories.find((c) => c.id === tool.category)?.label}</span>
          <button className={`text-action ${tool.url ? "" : "disabled-action"}`}
            onClick={() => openTool(tool)} aria-disabled={!tool.url}>
            {tool.url ? "Open tool" : "Coming soon"}
            {tool.url ? <ArrowUpRight size={14} /> : <span className="soon-mark">·</span>}
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="brand-mark"><Grid2X2 size={19} strokeWidth={2.2} /></span>
          <span>Fizzy<span>Grid</span></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? "mobile-open" : ""}`}>
          <button className={view === "discover" ? "nav-link active" : "nav-link"} onClick={() => selectView("discover")}>Home</button>
          <button className={view === "library" ? "nav-link active" : "nav-link"} onClick={() => selectView("library")}>Explore tools</button>
          <button className={view === "favorites" ? "nav-link active" : "nav-link"} onClick={() => selectView("favorites")}>Saved</button>
          <button className={view === "recent" ? "nav-link active" : "nav-link"} onClick={() => selectView("recent")}>Recently used</button>
        </nav>
        <div className="top-actions">
          <button className="search-trigger" onClick={() => setCommandOpen(true)}>
            <Search size={15} /><span>Search tools</span><kbd><Command size={10} /> K</kbd>
          </button>
          <button className="icon-button theme-toggle" aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-button mobile-toggle" aria-label="Toggle navigation" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main>
        {view === "discover" && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE USEFUL SIDE OF THE INTERNET</div>
            <h1>Good tools.<br /><em>Less searching.</em></h1>
            <p className="hero-description">A growing collection of thoughtful tools for the work you do every day. Find what you need, get it done, move on.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => selectView("library")}>
                Explore tools <ArrowDownRight size={16} />
              </button>
              <span className="hero-note"><span className="tiny-status" /> Free to use. No clutter.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Three-dimensional FizzyGrid orbital grid illustration">
            <div className="orbital-scene">
              <div className="scene-label scene-label-top"><span className="scene-live-dot" /> THE TOOL UNIVERSE <span> / 001</span></div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orb-core">
                <div className="orb-core-inner"><Grid2X2 size={43} strokeWidth={1.15} /></div>
                <span className="orb-core-shine" />
              </div>
              <div className="hero-object object-cube"><span className="cube-face cube-front"><Braces size={24} /></span><span className="cube-face cube-back" /><span className="cube-face cube-left" /><span className="cube-face cube-right" /><span className="cube-face cube-top" /><span className="cube-face cube-bottom" /></div>
              <div className="hero-object object-sphere"><span className="sphere-glint" /></div>
              <div className="hero-object object-ring"><span /><i /></div>
              <div className="float-tile tile-code"><Braces size={20} /><span>DEVELOP</span><small>01 / CODE</small></div>
              <div className="float-tile tile-image"><Image size={19} /><span>CREATE</span><small>02 / DESIGN</small></div>
              <div className="float-tile tile-doc"><FileText size={19} /><span>ORGANIZE</span><small>03 / WORK</small></div>
              <div className="float-tile tile-spark"><Sparkles size={17} /><span>DISCOVER</span></div>
              <div className="scene-coordinate">28° 24' N<br />77° 19' E</div>
              <div className="scene-caption"><span>ONE GRID. MANY POSSIBILITIES.</span><span>FG — 2026</span></div>
            </div>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule" /><span>TOOLS, IN ONE PLACE</span></div>
        </section>

        <section className="home-marquee" aria-label="FizzyGrid highlights">
          <div className="marquee-track"><span>TOOLS FOR YOUR EVERYDAY</span><b>✳</b><span>BUILT TO FEEL SIMPLE</span><b>✳</b><span>INDEPENDENT BY DESIGN</span><b>✳</b><span>TOOLS FOR YOUR EVERYDAY</span><b>✳</b></div>
        </section>
        <section className="featured-section">
          <div className="section-heading">
            <div><div className="section-kicker">A GOOD PLACE TO START</div><h2>Worth a closer look.</h2></div>
            <button className="subtle-link" onClick={() => selectView("library")}>Browse the library <ArrowRight size={15} /></button>
          </div>
          <div className="featured-grid">
            {featured.map((tool) => <ToolCard key={tool.id} tool={tool} compact />)}
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-mark"><Layers3 size={22} strokeWidth={1.5} /></div>
          <div><div className="section-kicker">THE IDEA BEHIND THE GRID</div><h2>Small tools. <em>Real utility.</em></h2><p>Every tool in FizzyGrid has its own home. We bring them together so you can spend less time looking and more time doing.</p></div>
          <div className="manifesto-side"><span>BUILT TO BE USEFUL</span><span>FG — EST. 2026</span></div>
        </section>

        </>}
        {view !== "discover" && <section className="library-section library-page" id="tool-library">
          <div className="section-heading library-heading">
            <div><div className="section-kicker">THE LIBRARY <span className="count-label">{tools.length.toString().padStart(2, "0")} TOOLS</span></div><h2>{view === "favorites" ? "Your saved tools." : view === "recent" ? "Pick up where you left off." : "Find the right tool."}</h2></div>
            <div className="library-controls">
              <label className="inline-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter tools..." aria-label="Filter tools" /><kbd>/</kbd></label>
              <label className="sort-control"><SlidersHorizontal size={14} /><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort tools"><option value="featured">Featured</option><option value="az">A to Z</option></select><ChevronDown size={13} /></label>
            </div>
          </div>
          <div className="library-intro-line"><span>CURATED UTILITIES, WITHOUT THE NOISE</span><span>01 — {view === "favorites" ? "YOUR COLLECTION" : view === "recent" ? "YOUR HISTORY" : "THE FULL DIRECTORY"}</span></div>
          <div className="filter-row">
            <button className={`filter-tab ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>All tools</button>
            {categories.filter((c) => c.id !== "all").map((category) => (
              <button key={category.id} className={`filter-tab ${activeCategory === category.id ? "active" : ""}`} onClick={() => setActiveCategory(category.id)}>{category.label}</button>
            ))}
            {(query || activeCategory !== "all" || view !== "discover") && <button className="clear-filters" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Clear filters <X size={12} /></button>}
          </div>
          {filteredTools.length ? (
            <div className="tools-grid">
              {filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><Search size={21} /></div>
              <h3>Nothing in this corner yet.</h3>
              <p>{view === "favorites" ? "Save a tool with the heart icon and it will show up here." : view === "recent" ? "Tools you open will appear here for quick access." : "Try another search or choose a different category."}</p>
              <button className="button button-secondary" onClick={() => { setQuery(""); setActiveCategory("all"); setView("discover"); }}>Reset view</button>
            </div>
          )}
          <div className="library-footnote"><span>Showing {filteredTools.length} of {tools.length} tools</span><span>Independent tools. One thoughtful home.</span></div>
        </section>

}
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><Grid2X2 size={17} /></span><span>Fizzy<span>Grid</span></span></a>
        <span className="footer-copy">A useful corner of the internet.</span>
        <div className="footer-right"><span>{liveCount} tools live</span><span className="footer-divider" /><span>© 2026 FizzyGrid</span></div>
      </footer>

      {commandOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setCommandOpen(false); }}>
          <div className="command-modal" role="dialog" aria-modal="true" aria-label="Search tools">
            <div className="command-search"><Search size={18} /><input autoFocus placeholder="What are you looking for?" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { setCommandOpen(false); setView("library"); window.scrollTo({ top: 0, behavior: "smooth" }); } }} /><kbd>ESC</kbd><button className="icon-button" onClick={() => setCommandOpen(false)} aria-label="Close search"><X size={17} /></button></div>
            <div className="command-hint">SEARCH THE FIZZYGRID LIBRARY</div>
            <div className="command-results">
              {tools.filter((tool) => !query || [tool.name, tool.description, ...tool.tags].join(" ").toLowerCase().includes(query.toLowerCase())).slice(0, 6).map((tool) => {
                const Icon = iconMap[tool.icon] || Grid2X2;
                return <button key={tool.id} className="command-result" onClick={() => { setCommandOpen(false); setQuery(tool.name); setActiveCategory("all"); setView("library"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  <span className="command-result-icon"><Icon size={17} /></span><span className="command-result-copy"><strong>{tool.name}</strong><small>{tool.description}</small></span><ArrowUpRight size={15} />
                </button>;
              })}
              {tools.filter((tool) => !query || [tool.name, tool.description, ...tool.tags].join(" ").toLowerCase().includes(query.toLowerCase())).length === 0 && <div className="command-empty">No matching tools. Try a different search.</div>}
            </div>
            <div className="command-footer"><span><kbd>↵</kbd> Select a result</span><span><kbd>ESC</kbd> Close</span></div>
          </div>
        </div>
      )}
      {toast && <div className="toast"><Check size={15} />{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
