import { motion, useReducedMotion } from "framer-motion";
import shenron from "../assets/shenron.png";

const STAR_CLIP_PATH =
  "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)";

// Disposition des étoiles selon leur nombre (positions en % de la sphère)
const STAR_LAYOUTS = {
  1: { size: 22, positions: [[39, 39]] },
  2: { size: 22, positions: [[27, 27], [53, 53]] },
  3: { size: 21, positions: [[39, 20], [23, 57], [56, 57]] },
  4: { size: 20, positions: [[26, 26], [54, 26], [26, 54], [54, 54]] },
  5: {
    size: 19,
    positions: [[25, 25], [56, 25], [40.5, 40.5], [25, 56], [56, 56]],
  },
  6: {
    size: 18,
    positions: [[29, 19], [55, 19], [29, 41], [55, 41], [29, 63], [55, 63]],
  },
  7: {
    size: 17,
    positions: [
      [30, 17],
      [54, 17],
      [19, 41.5],
      [41.5, 41.5],
      [64, 41.5],
      [30, 66],
      [54, 66],
    ],
  },
};

// Les 7 dragon balls : position, taille, nombre d'étoiles et trajectoire de
// flottement propres à chacune (désynchronisées, non-linéaires)
const DRAGON_BALLS = [
  {
    left: 10.5,
    top: 17,
    size: 56,
    stars: 1,
    glowOpacity: 0.34,
    glowBlur: 6,
    shadow:
      "inset -7px -9px 16px rgba(110,45,0,.55), inset 6px 7px 12px rgba(255,240,196,.30), 0 0 24px rgba(250,180,40,.35)",
    duration: 9,
    delay: 0,
    x: [0, 9, -6, -13, 0],
    y: [0, -16, -26, -9, 0],
    times: [0, 0.25, 0.5, 0.75, 1],
  },
  {
    left: 21,
    top: 32,
    size: 46,
    stars: 2,
    glowOpacity: 0.3,
    glowBlur: 6,
    shadow:
      "inset -7px -9px 16px rgba(110,45,0,.55), inset 6px 7px 12px rgba(255,240,196,.30), 0 0 22px rgba(250,180,40,.32)",
    duration: 11.5,
    delay: -2.5,
    x: [0, -14, 7, 0],
    y: [0, -11, -22, 0],
    times: [0, 0.3, 0.6, 1],
  },
  {
    left: 32,
    top: 10,
    size: 66,
    stars: 3,
    glowOpacity: 0.36,
    glowBlur: 7,
    shadow:
      "inset -8px -10px 18px rgba(110,45,0,.55), inset 7px 8px 14px rgba(255,240,196,.30), 0 0 30px rgba(250,180,40,.38)",
    duration: 13,
    delay: -5,
    x: [0, 11, 16, -4, 0],
    y: [0, -9, -24, -14, 0],
    times: [0, 0.2, 0.45, 0.7, 1],
  },
  {
    left: 46,
    top: 28,
    size: 42,
    stars: 4,
    glowOpacity: 0.28,
    glowBlur: 6,
    shadow:
      "inset -6px -8px 14px rgba(110,45,0,.55), inset 5px 7px 11px rgba(255,240,196,.30), 0 0 20px rgba(250,180,40,.30)",
    duration: 10,
    delay: -1.2,
    x: [0, -9, 12, 0],
    y: [0, -19, -7, 0],
    times: [0, 0.35, 0.65, 1],
  },
  {
    left: 59,
    top: 20,
    size: 52,
    stars: 5,
    glowOpacity: 0.32,
    glowBlur: 6,
    shadow:
      "inset -7px -9px 16px rgba(110,45,0,.55), inset 6px 7px 12px rgba(255,240,196,.30), 0 0 26px rgba(250,180,40,.34)",
    duration: 12.5,
    delay: -3.8,
    x: [0, 6, -12, -3, 0],
    y: [0, -13, -27, -6, 0],
    times: [0, 0.28, 0.55, 0.82, 1],
  },
  {
    left: 73,
    top: 30,
    size: 60,
    stars: 6,
    glowOpacity: 0.34,
    glowBlur: 7,
    shadow:
      "inset -8px -10px 17px rgba(110,45,0,.55), inset 6px 8px 13px rgba(255,240,196,.30), 0 0 28px rgba(250,180,40,.36)",
    duration: 14,
    delay: -6.4,
    x: [0, -17, 5, 0],
    y: [0, -14, -25, 0],
    times: [0, 0.4, 0.72, 1],
  },
  {
    left: 85.5,
    top: 8,
    size: 48,
    stars: 7,
    glowOpacity: 0.3,
    glowBlur: 6,
    shadow:
      "inset -7px -9px 15px rgba(110,45,0,.55), inset 5px 7px 12px rgba(255,240,196,.30), 0 0 22px rgba(250,180,40,.32)",
    duration: 10.8,
    delay: -8,
    x: [0, 13, -8, 9, 0],
    y: [0, -21, -10, -18, 0],
    times: [0, 0.22, 0.52, 0.78, 1],
  },
];

function DragonBall({ ball, reducedMotion }) {
  const layout = STAR_LAYOUTS[ball.stars];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${ball.left}%`,
        top: `${ball.top}%`,
        width: ball.size,
        height: ball.size,
      }}
      animate={reducedMotion ? undefined : { x: ball.x, y: ball.y }}
      transition={
        reducedMotion
          ? undefined
          : {
              duration: ball.duration,
              times: ball.times,
              delay: ball.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {/* Lueur */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "-46%",
          background: `radial-gradient(closest-side, rgba(255,176,54,${ball.glowOpacity}), rgba(255,176,54,0) 70%)`,
          filter: `blur(${ball.glowBlur}px)`,
        }}
      />
      {/* Sphère */}
      <div
        className="relative h-full w-full rounded-full bg-ball-sphere"
        style={{ boxShadow: ball.shadow }}
      >
        {layout.positions.map(([starLeft, starTop], i) => (
          <div
            key={i}
            className="absolute bg-ball-star"
            style={{
              left: `${starLeft}%`,
              top: `${starTop}%`,
              width: `${layout.size}%`,
              height: `${layout.size}%`,
              clipPath: STAR_CLIP_PATH,
            }}
          />
        ))}
        {/* Reflet spéculaire */}
        <div
          className="absolute rounded-full"
          style={{
            left: "22%",
            top: "18%",
            width: "26%",
            height: "20%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,.5), rgba(255,255,255,0))",
            filter: "blur(2px)",
          }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Hero cinématographique : Shenron en arc + 7 dragon balls flottantes
 */
function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative h-[560px] overflow-hidden bg-hero-ground lg:h-[820px]">
      {/* Halo principal, respire */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[640px] w-[1100px] -translate-x-1/2 lg:top-[-180px] lg:h-[900px] lg:w-[1500px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(250,204,21,.20) 0%, rgba(250,190,60,.10) 42%, rgba(250,204,21,0) 78%)",
          filter: "blur(20px)",
        }}
        animate={reducedMotion ? undefined : { opacity: [0.5, 0.78, 0.5] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Halo secondaire, statique */}
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-[300px] w-[560px] -translate-x-1/2 lg:top-[120px] lg:h-[420px] lg:w-[820px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,214,120,.16), rgba(255,214,120,0) 72%)",
          filter: "blur(30px)",
        }}
      />

      {/* Shenron */}
      <div className="pointer-events-none absolute left-1/2 top-[20px] w-[380px] -translate-x-1/2 sm:top-[10px] sm:w-[520px] md:top-[-30px] md:w-[1100px] lg:top-[-40px] lg:w-[1520px]">
        <motion.img
          src={shenron}
          alt=""
          className="w-full opacity-[0.7] grayscale sepia saturate-[3] hue-rotate-[-10deg] brightness-[1.15] contrast-[1.05] drop-shadow-[0_0_50px_rgba(250,204,21,0.35)]"
          style={{
            maskImage:
              "radial-gradient(78% 66% at 50% 34%, #000 42%, rgba(0,0,0,.55) 66%, rgba(0,0,0,0) 84%)",
            WebkitMaskImage:
              "radial-gradient(78% 66% at 50% 34%, #000 42%, rgba(0,0,0,.55) 66%, rgba(0,0,0,0) 84%)",
          }}
          animate={
            reducedMotion
              ? undefined
              : { x: [0, -18, 0], y: [0, -10, 0], scale: [1, 1.012, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 24, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      {/* Voile de lisibilité */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,14,.55) 0%, rgba(5,7,14,0) 26%, rgba(5,7,14,.30) 62%, rgba(5,7,14,.92) 100%)",
        }}
      />

      {/* Les 7 dragon balls */}
      <div className="absolute inset-0 origin-center scale-[0.55] sm:scale-75 lg:scale-100">
        {DRAGON_BALLS.map((ball, i) => (
          <DragonBall key={i} ball={ball} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Titre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex flex-col items-center gap-5 px-4 lg:bottom-24">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-yellow-400/70 lg:tracking-[0.42em]">
          Sept boules · un souhait
        </span>
        <h1
          className="bg-clip-text text-center text-6xl font-extrabold leading-[0.94] tracking-[-0.03em] text-transparent lg:text-[92px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg,#ffffff 26%,#fde68a 74%,#e0a80f 100%)",
            filter: "drop-shadow(0 8px 40px rgba(250,204,21,.22))",
          }}
        >
          Dragon Ball Universe
        </h1>
        <p className="max-w-[620px] text-center text-[15px] leading-[1.6] text-white/60">
          L'encyclopédie des guerriers, des dieux et des menaces de l'univers.
          Fiches détaillées, races, affiliations et transformations.
        </p>
      </div>
    </section>
  );
}

export default Hero;
