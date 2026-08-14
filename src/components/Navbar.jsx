import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-4 backdrop-blur-[6px] lg:px-14 lg:py-[22px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,7,14,.88) 0%, rgba(5,7,14,.45) 55%, rgba(5,7,14,0) 100%)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-[26px] w-[26px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #ffe9a8 0%, #ffb43d 30%, #e88a12 66%, #8a4206 100%)",
            boxShadow: "0 0 18px rgba(250,204,21,.45)",
          }}
        />
        <span className="text-[15px] font-bold uppercase tracking-[0.22em] text-[#f4f4f6]">
          Dragon Ball
        </span>
      </div>

      <div className="flex items-center gap-6 lg:gap-[34px]">
        <Link
          to="/"
          className="text-[13.5px] font-medium tracking-[0.06em] text-[#e9e9ed] transition-colors hover:text-yellow-400"
        >
          Accueil
        </Link>
        <button
          type="button"
          aria-label="Rechercher"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[.14] bg-white/[.03] text-[#e9e9ed] transition-all duration-200 hover:border-yellow-400/55 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,.18)]"
        >
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
