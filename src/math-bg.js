const canvas = document.getElementById("math-bg");

if (canvas) {
  const context = canvas.getContext("2d");
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    width: 0,
    height: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    frame: 0,
    animationId: 0
  };

  const curves = [
    { color: "rgba(25, 195, 125, 0.12)", amplitude: 0.22, frequency: 0.95, phase: 0 },
    { color: "rgba(125, 211, 252, 0.11)", amplitude: 0.18, frequency: 1.2, phase: 1.7 },
    { color: "rgba(255, 255, 255, 0.06)", amplitude: 0.12, frequency: 1.55, phase: 3.1 }
  ];

  function resize() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function field(x, y, time, phase) {
    const nx = x / state.width - 0.5;
    const ny = y / state.height - 0.5;
    const radius = Math.hypot(nx, ny);
    const angle = Math.atan2(ny, nx);

    return (
      Math.sin((nx * 7 + time * 0.35) + phase) +
      Math.cos((ny * 9 - time * 0.28) - phase * 0.7) +
      Math.sin(radius * 28 - time * 0.42 + phase * 1.3) * 0.7 +
      Math.cos(angle * 6 + time * 0.22 + phase) * 0.45
    );
  }

  function drawCurve(curve, time) {
    const rows = 13;
    const stepX = 18;
    const baseGap = state.height / (rows + 1);

    context.beginPath();

    for (let row = 1; row <= rows; row += 1) {
      const baseY = row * baseGap;

      for (let x = -40; x <= state.width + 40; x += stepX) {
        const value = field(x, baseY, time * curve.frequency, curve.phase);
        const y = baseY + value * state.height * curve.amplitude * 0.08;

        if (x === -40) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
    }

    context.strokeStyle = curve.color;
    context.lineWidth = 1;
    context.stroke();
  }

  function render() {
    const time = state.frame * 0.016;

    context.clearRect(0, 0, state.width, state.height);

    for (const curve of curves) {
      drawCurve(curve, time);
    }

    state.frame += mediaQuery.matches ? 0.15 : 1;
    state.animationId = window.requestAnimationFrame(render);
  }

  resize();
  render();

  window.addEventListener("resize", resize);
  mediaQuery.addEventListener("change", () => {
    if (!state.animationId) {
      render();
    }
  });
}
