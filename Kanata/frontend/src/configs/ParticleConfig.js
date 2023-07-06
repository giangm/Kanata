export const ParticlesConfig = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#FFF",
    },
    opacity: {
      value: 0.5,
      anim: {
        enable: true,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#FFF",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.7,
    },
  },
}