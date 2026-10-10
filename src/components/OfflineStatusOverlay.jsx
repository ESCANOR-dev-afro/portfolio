import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WifiOff,
  Wifi,
  RefreshCw,
  Gamepad2,
  Trophy,
  Play,
  RotateCcw,
  X,
  Sparkles,
  ShieldAlert,
  Zap,
  Shield,
  Flame,
  ArrowUp,
} from 'lucide-react';
import HUDCorners from './ui/HUDCorners';

/**
 * =========================================================================
 * ESCANOR: NEON CYBER-RUNNER 2.0 (OFFLINE ARCADE EDITION)
 * =========================================================================
 * Features:
 * - 60 FPS physics engine with Double-Jump & Thruster Boost
 * - Flying Drone Glitches, Laser Firewalls, & Cyber Spikes
 * - Collectible Data Crystals (+50), Golden Quantum Cores (+150), and Plasma Shields
 * - Screen-shake camera feedback, floating combo popups, and speed warp lines
 * - Touch / Mobile tap controls + Spacebar / Up Arrow desktop keys
 * - High score persistence with Trophy badges & New Record celebrations
 * =========================================================================
 */
function CyberRunnerGame({ onExit }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [hasShield, setHasShield] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('escanor_runner_highscore_v2') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Mutable Game Loop State
  const stateRef = useRef({
    player: {
      x: 55,
      y: 150,
      vy: 0,
      w: 24,
      h: 30,
      grounded: true,
      jumpsLeft: 2,
      shield: false,
      color: '#ff6a00',
    },
    obstacles: [],
    particles: [],
    pickups: [],
    popups: [],
    speed: 4.8,
    gravity: 0.62,
    jumpForce: -11.5,
    doubleJumpForce: -10.0,
    frameCount: 0,
    score: 0,
    combo: 0,
    multiplier: 1,
    screenShake: 0,
    isRunning: false,
  });

  const jump = () => {
    const s = stateRef.current;
    if (gameOver) {
      restartGame();
      return;
    }
    if (!gameStarted) {
      setGameStarted(true);
      s.isRunning = true;
    }

    const p = s.player;
    if (p.grounded || p.jumpsLeft > 0) {
      const isDouble = !p.grounded;
      p.vy = isDouble ? s.doubleJumpForce : s.jumpForce;
      p.grounded = false;
      p.jumpsLeft--;

      // Spawn Thruster Particles
      const particleColor = isDouble ? '#00e5ff' : '#ff7f11';
      for (let i = 0; i < (isDouble ? 12 : 7); i++) {
        s.particles.push({
          x: p.x + 8 + Math.random() * 8,
          y: p.y + p.h,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          life: 25,
          color: particleColor,
          size: isDouble ? 4 : 3,
        });
      }

      if (isDouble) {
        s.screenShake = 3;
      }
    }
  };

  const restartGame = () => {
    const s = stateRef.current;
    s.player.y = 150;
    s.player.vy = 0;
    s.player.grounded = true;
    s.player.jumpsLeft = 2;
    s.player.shield = false;
    s.obstacles = [];
    s.particles = [];
    s.pickups = [];
    s.popups = [];
    s.speed = 4.8;
    s.score = 0;
    s.combo = 0;
    s.multiplier = 1;
    s.frameCount = 0;
    s.screenShake = 0;
    s.isRunning = true;
    setScore(0);
    setMultiplier(1);
    setHasShield(false);
    setIsNewRecord(false);
    setGameOver(false);
    setGameStarted(true);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.code === 'Space' ||
        e.code === 'ArrowUp' ||
        e.code === 'KeyW' ||
        e.key === ' '
      ) {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, gameStarted]);

  // Main Canvas 60 FPS Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const groundY = 185;

    const loop = () => {
      const s = stateRef.current;
      s.frameCount++;

      // Camera Screen Shake Offset
      let offsetX = 0;
      let offsetY = 0;
      if (s.screenShake > 0) {
        offsetX = (Math.random() - 0.5) * s.screenShake;
        offsetY = (Math.random() - 0.5) * s.screenShake;
        s.screenShake *= 0.85;
        if (s.screenShake < 0.3) s.screenShake = 0;
      }

      ctx.save();
      ctx.translate(offsetX, offsetY);

      // Clear Canvas Frame
      ctx.fillStyle = '#080a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background Cyberpunk City Silhouettes
      ctx.fillStyle = 'rgba(255, 106, 0, 0.03)';
      const buildingOffset = (s.frameCount * 0.8) % 120;
      for (let bx = -buildingOffset; bx < canvas.width + 120; bx += 80) {
        ctx.fillRect(bx, groundY - 60, 45, 60);
        ctx.fillRect(bx + 40, groundY - 90, 30, 90);
      }

      // Parallax Grid Floor
      ctx.strokeStyle = 'rgba(255, 106, 0, 0.15)';
      ctx.lineWidth = 1;
      const gridOffset = (s.frameCount * s.speed) % 32;
      for (let x = -gridOffset; x < canvas.width + 40; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 24, canvas.height);
        ctx.stroke();
      }

      // High-Voltage Ground Rail
      const railGradient = ctx.createLinearGradient(0, groundY, canvas.width, groundY);
      railGradient.addColorStop(0, '#ff6a00');
      railGradient.addColorStop(0.5, '#ff7f11');
      railGradient.addColorStop(1, '#ff6a00');
      ctx.strokeStyle = railGradient;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Under-rail Ambient Glow
      ctx.fillStyle = 'rgba(255, 106, 0, 0.06)';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Speed Streak Lines (Hyper-speed sensation)
      if (s.speed > 6) {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) {
          const sx = (s.frameCount * (s.speed * 2) + i * 110) % canvas.width;
          const sy = 30 + i * 35;
          ctx.beginPath();
          ctx.moveTo(canvas.width - sx, sy);
          ctx.lineTo(canvas.width - sx - 40, sy);
          ctx.stroke();
        }
      }

      if (s.isRunning && !gameOver) {
        // Player Physics Update
        s.player.vy += s.gravity;
        s.player.y += s.player.vy;

        if (s.player.y >= groundY - s.player.h) {
          s.player.y = groundY - s.player.h;
          s.player.vy = 0;
          s.player.grounded = true;
          s.player.jumpsLeft = 2;
        }

        // Spawn Obstacles Dynamically
        const spawnInterval = Math.max(50, Math.floor(105 - s.speed * 4.2));
        if (s.frameCount % spawnInterval === 0) {
          const rand = Math.random();
          if (rand < 0.45) {
            // Standard Laser Wall
            s.obstacles.push({
              type: 'laser',
              x: canvas.width,
              y: groundY - 26,
              w: 16,
              h: 26,
              color: '#d90429',
            });
          } else if (rand < 0.75) {
            // Tall Security Firewall
            s.obstacles.push({
              type: 'tall_laser',
              x: canvas.width,
              y: groundY - 38,
              w: 20,
              h: 38,
              color: '#ff2a55',
            });
          } else {
            // Flying Glitch Drone (hovering)
            s.obstacles.push({
              type: 'drone',
              x: canvas.width,
              y: groundY - 58,
              w: 22,
              h: 18,
              color: '#9d4edd',
              bobOffset: Math.random() * Math.PI,
            });
          }
        }

        // Spawn Pickups (Data Cubes, Gold Cores, Shields)
        if (s.frameCount % 85 === 0 && Math.random() > 0.3) {
          const r = Math.random();
          let pType = 'cube';
          let pColor = '#00ff66';
          let pVal = 50;

          if (r > 0.85) {
            pType = 'shield';
            pColor = '#00e5ff';
            pVal = 0;
          } else if (r > 0.6) {
            pType = 'core';
            pColor = '#ffd600';
            pVal = 150;
          }

          s.pickups.push({
            type: pType,
            x: canvas.width,
            y: groundY - (pType === 'drone' ? 60 : 42) - Math.random() * 30,
            w: 14,
            h: 14,
            color: pColor,
            value: pVal,
            collected: false,
          });
        }

        // Score Progression & Dynamic Speed Ramp
        s.score += s.multiplier;
        if (s.score % 10 === 0) {
          setScore(Math.floor(s.score / 10));
        }

        // Multiplier scaling with combo
        const newMult = 1 + Math.min(4, Math.floor(s.combo / 4));
        if (newMult !== s.multiplier) {
          s.multiplier = newMult;
          setMultiplier(newMult);
        }

        if (s.score % 350 === 0 && s.speed < 9.5) {
          s.speed += 0.3;
        }
      }

      // Render & Process Obstacles
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const obs = s.obstacles[i];
        if (s.isRunning && !gameOver) {
          obs.x -= s.speed;
        }

        // Drone floating animation
        let drawY = obs.y;
        if (obs.type === 'drone') {
          drawY = obs.y + Math.sin(s.frameCount * 0.1 + obs.bobOffset) * 6;
        }

        // Draw Obstacle Graphic
        if (obs.type === 'drone') {
          // Drone Chassis
          ctx.fillStyle = obs.color;
          ctx.fillRect(obs.x, drawY, obs.w, obs.h);
          ctx.fillStyle = '#ff0055';
          ctx.fillRect(obs.x + 6, drawY + 4, 10, 6);
          // Drone Rotor Wings
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(obs.x - 3, drawY);
          ctx.lineTo(obs.x + obs.w + 3, drawY);
          ctx.stroke();
        } else {
          // Laser Firewall Pillar
          ctx.fillStyle = obs.color;
          ctx.fillRect(obs.x, drawY, obs.w, obs.h);
          // Core energy beam
          ctx.fillStyle = '#ff9e00';
          ctx.fillRect(obs.x + 3, drawY + 2, obs.w - 6, obs.h - 4);
        }

        // Collision Detection
        const p = s.player;
        if (
          p.x + p.w - 4 > obs.x &&
          p.x + 4 < obs.x + obs.w &&
          p.y + p.h > drawY + 4 &&
          p.y + 4 < drawY + obs.h
        ) {
          if (p.shield) {
            // Shield Absorption!
            p.shield = false;
            setHasShield(false);
            s.obstacles.splice(i, 1);
            s.screenShake = 8;

            // Shield break particle burst
            for (let k = 0; k < 16; k++) {
              s.particles.push({
                x: p.x + 12,
                y: p.y + 15,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                color: '#00e5ff',
                size: 3,
              });
            }

            s.popups.push({
              x: p.x,
              y: p.y - 15,
              text: 'SHIELD ABSORBED!',
              color: '#00e5ff',
              life: 35,
            });
            continue;
          }

          // Game Over Trigger
          s.isRunning = false;
          s.screenShake = 12;
          setGameOver(true);

          const finalScore = Math.floor(s.score / 10);
          if (finalScore > highScore) {
            setHighScore(finalScore);
            setIsNewRecord(true);
            try {
              localStorage.setItem('escanor_runner_highscore_v2', String(finalScore));
            } catch {}
          }

          // Explosion Sparks
          for (let j = 0; j < 24; j++) {
            s.particles.push({
              x: p.x + 12,
              y: p.y + 15,
              vx: (Math.random() - 0.5) * 9,
              vy: (Math.random() - 0.5) * 9,
              life: 35,
              color: j % 2 === 0 ? '#ff6a00' : '#ff0055',
              size: 4,
            });
          }
        }

        if (obs.x + obs.w < -15) {
          s.obstacles.splice(i, 1);
        }
      }

      // Render & Process Pickups
      for (let i = s.pickups.length - 1; i >= 0; i--) {
        const item = s.pickups[i];
        if (s.isRunning && !gameOver) {
          item.x -= s.speed;
        }

        // Draw Collectible (Spinning geometry)
        ctx.save();
        ctx.translate(item.x + 7, item.y + 7);
        ctx.rotate((s.frameCount * 0.08) % (Math.PI * 2));
        ctx.fillStyle = item.color;

        if (item.type === 'shield') {
          // Shield Orb
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Diamond / Crystal Core
          ctx.fillRect(-6, -6, 12, 12);
        }
        ctx.restore();

        // Pickup Collision
        const p = s.player;
        if (
          !item.collected &&
          p.x + p.w > item.x &&
          p.x < item.x + item.w &&
          p.y + p.h > item.y &&
          p.y < item.y + item.h
        ) {
          item.collected = true;

          if (item.type === 'shield') {
            p.shield = true;
            setHasShield(true);
            s.popups.push({
              x: item.x,
              y: item.y - 10,
              text: '+PLASMA SHIELD!',
              color: '#00e5ff',
              life: 30,
            });
          } else {
            const addedPoints = item.value * s.multiplier;
            s.score += addedPoints * 10;
            s.combo++;
            setScore(Math.floor(s.score / 10));

            s.popups.push({
              x: item.x,
              y: item.y - 10,
              text: `+${addedPoints}`,
              color: item.color,
              life: 25,
            });
          }

          // Collection Sparkles
          for (let k = 0; k < 10; k++) {
            s.particles.push({
              x: item.x + 7,
              y: item.y + 7,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 20,
              color: item.color,
              size: 3,
            });
          }

          s.pickups.splice(i, 1);
        }

        if (item.x < -20) {
          s.pickups.splice(i, 1);
        }
      }

      // Render Floating Text Popups
      for (let i = s.popups.length - 1; i >= 0; i--) {
        const pop = s.popups[i];
        pop.y -= 0.8;
        pop.life--;

        ctx.fillStyle = pop.color;
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillText(pop.text, pop.x, pop.y);

        if (pop.life <= 0) {
          s.popups.splice(i, 1);
        }
      }

      // Render Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const part = s.particles[i];
        part.x += part.vx;
        part.y += part.vy;
        part.life--;

        ctx.fillStyle = part.color;
        ctx.fillRect(part.x, part.y, part.size || 3, part.size || 3);

        if (part.life <= 0) {
          s.particles.splice(i, 1);
        }
      }

      // Render Player Character ([ESCANOR] Cyber Cube)
      const p = s.player;
      if (!gameOver || s.frameCount % 6 < 3) {
        // Active Shield Bubble Halo
        if (p.shield) {
          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x + 12, p.y + 15, 20 + Math.sin(s.frameCount * 0.2) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Armor Frame
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.w, p.h);

        // Core Golden Chest Crest
        ctx.fillStyle = '#ffd600';
        ctx.fillRect(p.x + 6, p.y + 12, 12, 8);

        // Cyber Visor Eye
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(p.x + 13, p.y + 5, 8, 4);

        // Jet Flame during jumps
        if (!p.grounded) {
          ctx.fillStyle = '#00e5ff';
          ctx.fillRect(p.x + 5, p.y + p.h, 6, 6 + Math.random() * 8);
          ctx.fillStyle = '#ff7f11';
          ctx.fillRect(p.x + 13, p.y + p.h, 6, 6 + Math.random() * 8);
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, highScore]);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-lg mx-auto">
      {/* Top Arcade HUD Stats Bar */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2.5 px-2 text-white/80">
        <div className="flex items-center space-x-2">
          <div className="px-2 py-0.5 rounded bg-cyber-orange/15 border border-cyber-orange/40 text-cyber-bright font-bold flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-cyber-orange" />
            <span>{multiplier}X MULTIPLIER</span>
          </div>

          {hasShield && (
            <div className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold flex items-center space-x-1 animate-pulse">
              <Shield className="w-3 h-3" />
              <span>SHIELD ACTIVE</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-400">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>HI: {highScore}</span>
          </span>
          <span className="font-bold text-white text-base font-display">
            SCORE: <span className="text-cyber-orange">{score}</span>
          </span>
        </div>
      </div>

      {/* Main Arcade Canvas Deck */}
      <div
        onClick={jump}
        onTouchStart={(e) => {
          e.preventDefault();
          jump();
        }}
        className="relative w-full h-[230px] rounded-2xl overflow-hidden border-2 border-cyber-orange/50 bg-[#080a0f] shadow-[0_0_35px_rgba(255,106,0,0.25)] cursor-pointer touch-none"
      >
        <HUDCorners size="md" />

        <canvas
          ref={canvasRef}
          width={480}
          height={230}
          className="w-full h-full block"
        />

        {/* Start Game Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-2.5 p-4 text-center z-30">
            <div className="p-2.5 rounded-2xl bg-cyber-orange/15 border border-cyber-orange/40 text-cyber-orange shadow-[0_0_20px_rgba(255,106,0,0.3)]">
              <Gamepad2 className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="font-display font-bold text-lg text-white tracking-wide">
              TAP SCREEN OR PRESS SPACE
            </h4>
            <p className="text-xs font-mono text-white/70 max-w-xs leading-relaxed">
              Jump over security firewalls and collect Data Cubes. Double-tap to activate Jet Double-Jump!
            </p>
            <button
              type="button"
              onClick={jump}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(255,106,0,0.5)] cursor-pointer mt-1 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START CYBER RUNNER</span>
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center space-y-2 p-4 text-center z-30">
            <ShieldAlert className="w-9 h-9 text-cyber-crimson animate-pulse" />
            <h4 className="font-display font-bold text-xl text-cyber-crimson tracking-wide">
              SECURITY FIREWALL BREACHED
            </h4>

            <div className="flex items-center space-x-3 text-xs font-mono text-white/80 my-1">
              <span>FINAL SCORE: <strong className="text-cyber-orange text-sm">{score}</strong></span>
              <span>•</span>
              <span>BEST: <strong className="text-emerald-400 text-sm">{highScore}</strong></span>
            </div>

            {isNewRecord && (
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>NEW HIGH SCORE RECORD SET!</span>
              </div>
            )}

            <button
              type="button"
              onClick={restartGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(255,106,0,0.6)] cursor-pointer mt-2 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART RUNNER</span>
            </button>
          </div>
        )}
      </div>

      {/* Control Hints Bar */}
      <div className="flex items-center justify-between w-full mt-3 px-2 text-[11px] font-mono text-white/50">
        <span className="flex items-center space-x-1.5">
          <ArrowUp className="w-3 h-3 text-cyber-orange" />
          <span>Tap / Spacebar: Jump &amp; Double-Jump</span>
        </span>
        <button
          onClick={onExit}
          className="text-white/60 hover:text-white underline cursor-pointer transition-colors"
        >
          Exit Mini-Game
        </button>
      </div>
    </div>
  );
}

/**
 * Global Offline Detection & Resiliency Banner + Mini-Game Modal
 * Watches browser online/offline status and engages users seamlessly.
 */
export default function OfflineStatusOverlay() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showGame, setShowGame] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      setShowGame(false);
      setTimeout(() => setJustReconnected(false), 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheck = () => {
    setIsChecking(true);
    fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
      .then(() => {
        setIsOffline(false);
        setJustReconnected(true);
        setShowGame(false);
        setTimeout(() => setJustReconnected(false), 4000);
      })
      .catch(() => {
        setIsOffline(true);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  // 1. Connection Restored Notification Banner
  if (justReconnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-500/90 border border-emerald-400 text-white font-mono text-xs font-bold shadow-[0_0_25px_rgba(16,185,129,0.7)] flex items-center space-x-2.5 backdrop-blur-md"
      >
        <Wifi className="w-4 h-4 animate-bounce" />
        <span>CONNECTION RESTORED • AUTO-SYNCING PORTFOLIO</span>
      </motion.div>
    );
  }

  // 2. Offline Overlay & Mini-Game
  return (
    <AnimatePresence>
      {isOffline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl my-auto bg-[#0C0E12] border border-cyber-orange/40 rounded-2xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(255,106,0,0.25)] flex flex-col z-10 text-left p-6 sm:p-8"
          >
            {/* Top Amber Laser Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-orange to-transparent shadow-[0_0_10px_var(--color-cyber-orange)]" />

            <HUDCorners size="md" />

            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  <WifiOff className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                    SIGNAL LOST // OFFLINE ARCADE
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    Connection Paused
                  </h3>
                </div>
              </div>

              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>AUTO-SYNC READY</span>
              </div>
            </div>

            {/* Content Area */}
            {!showGame ? (
              <div className="space-y-5">
                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                  Your device lost connection to the network. All preloaded projects, credentials, and portfolio assets remain locally cached in memory.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono text-white/60">
                  <div className="flex items-center space-x-2 text-white/90 font-semibold">
                    <Zap className="w-4 h-4 text-cyber-orange" />
                    <span>System Telemetry Status:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-white/50 pl-1">
                    <li>Cached Assets: All Projects &amp; Badges Online</li>
                    <li>Auto-Reconnect: Monitoring network state in background</li>
                    <li>Play the Cyber-Runner mini-game while waiting!</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleManualCheck}
                    disabled={isChecking}
                    className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin text-cyber-orange' : ''}`} />
                    <span>{isChecking ? 'Rechecking Signal...' : 'Check Connection'}</span>
                  </button>

                  <button
                    onClick={() => setShowGame(true)}
                    className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,106,0,0.45)] transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Play Offline Arcade</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Mini-Game View */
              <CyberRunnerGame onExit={() => setShowGame(false)} />
            )}

            {/* Bottom Status Rail */}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>ESCANOR RESILIENT ENGINE</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AUTO-SYNC ON RECONNECT</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
