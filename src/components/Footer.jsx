function Footer() {
  return (
    <footer className="border-t border-white/[.06] bg-[#02040a] px-6 py-6 lg:px-14">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11.5px] tracking-[0.03em] text-white/50">
          Données fournies par dragonball-api.com · Dragon Ball © Bird Studio
          / Shueisha / Toei Animation
        </p>
        <p className="text-[11.5px] tracking-[0.03em] text-white/50">
          Réalisé par : Michael Takbou -{" "}
          <a
            href="https://www.thesparkstudio.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-yellow-400"
          >
            The Spark Studio
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
