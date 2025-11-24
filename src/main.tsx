import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header } from './components/Header';
import { AddPlayerButton } from './components/AddPlayerButton';
import { PlayerCard } from './components/PlayerCard';
import {
  PlayersProvider,
  usePlayersState,
  usePlayersActions,
} from './contexts/PlayersContext';
import { About } from './components/About';
import { Footer } from './components/Footer';

const FarawayScoreSheet = () => {
  const { players, winningPlayerIds } = usePlayersState();
  const { resetAll, addPlayer } = usePlayersActions();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    playerIndex: number,
    regionNum: number
  ) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      let nextPlayerIndex = playerIndex + 1;
      let nextRegionNum = regionNum;
      if (nextPlayerIndex >= players.length) {
        nextPlayerIndex = 0;
        nextRegionNum = regionNum + 1;
      }
      const targetId = `input-p${nextPlayerIndex}-r${nextRegionNum}`;
      const nextElement = document.getElementById(targetId);
      if (nextElement) {
        (nextElement as HTMLInputElement).focus();
        (nextElement as HTMLInputElement).select();
      }
    }
  };

  return (
    <>
      <Header onReset={resetAll} />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {players.map((player, pIndex) => (
          <PlayerCard
            key={player.id}
            player={player}
            playerIndex={pIndex}
            isWinner={winningPlayerIds.includes(player.id)}
            onKeyDown={handleKeyDown}
          />
        ))}
        {players.length < 6 && <AddPlayerButton onAddPlayer={addPlayer} />}
      </div>
    </>
  );
};

const App = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-slate-800">
      <div className="max-w-[1400px] mx-auto">
        <FarawayScoreSheet />
        <Footer onOpenAbout={() => setIsAboutModalOpen(true)} />
        {isAboutModalOpen && (
          <About onClose={() => setIsAboutModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PlayersProvider>
      <App />
    </PlayersProvider>
  </React.StrictMode>
);
