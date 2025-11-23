type AboutProps = {
  onClose: () => void;
};

export const About = ({ onClose }: AboutProps) => {
  return (
    // Modal Overlay
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className="max-w-2xl w-full p-8 bg-white rounded-xl shadow-lg border border-slate-200 animate-slide-up"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
          About
        </h1>
        <p className="text-slate-600 mb-4">
          ボードゲーム <a
            href="https://www.engames-s.com/product/2968"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-orange-600 transition-colors underline"
          >
            ファラウェイ
          </a> のスコアパッドをWebアプリケーション化したものです。<br />
          付属のスコアパッド用紙を利用せずにゲームをプレイできます。<br />
          ブラウザのみで動作し、サーバーサイドにユーザーデータは一切保存しません。
        </p>
        <p className="text-slate-600 mb-6">
          This is a web application version of the score pad for the board game <a
            href="https://site-export.blackrockgames.fr/game/CAT079FA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-orange-600 transition-colors underline"
          >
            Faraway
          </a><br />
          You can play the game without using the included paper score pad.<br />
          It runs entirely in your browser and does not store any user data on the server side.
        </p>
        <button
          onClick={onClose}
          className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Back to Score Pad
        </button>
      </div>
    </div>
  );
};
