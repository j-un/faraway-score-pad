type FooterProps = {
  onOpenAbout: () => void;
};

export const Footer = ({ onOpenAbout }: FooterProps) => {
  return (
    <footer className="text-center py-8">
      <button
        onClick={onOpenAbout}
        className="text-sm text-slate-500 hover:text-orange-600 transition-colors"
      >
        About
      </button>
      <span className="text-sm text-slate-300 mx-2">|</span>
      <a
        href="https://github.com/j-un/faraway-score-pad"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-slate-500 hover:text-orange-600 transition-colors"
      >
        GitHub
      </a>
    </footer>
  );
};
