import {
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Logo } from "./Logo";

type HeaderProps = {
  query: string;
  setQuery: (v: string) => void;
  count: string;
  onAdd: () => void;
  onSettings: () => void;
  onRefresh: () => void;
  online: boolean;
};

export function Header({
  query,
  setQuery,
  count,
  onAdd,
  onSettings,
  onRefresh,
  online,
}: HeaderProps) {
  return (
    <header className="topbar">
      <button
        className="brand"
        onClick={() => setQuery("")}
        aria-label="Go to home"
      >
        <Logo />
        <span>Supa</span>
      </button>

      <div className="searchbox">
        <Search size={17} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bookmarks..."
          aria-label="Search bookmarks"
        />
        <kbd>⌘ K</kbd>
        <span className="search-count">{count}</span>
      </div>

      <div className="top-actions">
        <span className={`connection ${online ? "online" : ""}`}>
          {online ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{online ? "Synced" : "Offline"}</span>
        </span>

        <button
          className="header-action"
          onClick={onRefresh}
          title="Refresh"
          aria-label="Refresh"
        >
          <RefreshCw size={17} />
          <span>Refresh</span>
        </button>

        <button
          className="header-action"
          onClick={onSettings}
          title="Settings"
          aria-label="Settings"
        >
          <Settings2 size={18} />
          <span>Settings</span>
        </button>

        <button
          className="primary-button compact"
          onClick={onAdd}
          aria-label="Add bookmark"
        >
          <Plus size={17} />
          <span>Add bookmark</span>
        </button>
      </div>
    </header>
  );
}
