import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 35 : 65;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mousemove', handleMouseMove);
      parentEl.addEventListener('mouseleave', handleMouseLeave);
    }

    // Interactive Particles Network
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2 + 1.5,
        color: i % 4 === 0 ? '#00e5ff' : i % 3 === 0 ? '#0077ff' : '#149bef',
        alpha: Math.random() * 0.6 + 0.4,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Translucent glowing tech background panels (matching screenshot background aesthetics)
    const glassPanels = [
      { x: 0.1, y: 0.2, w: 220, h: 140, speed: 0.0003, offset: 0 },
      { x: 0.72, y: 0.15, w: 260, h: 160, speed: 0.0002, offset: 1 },
      { x: 0.78, y: 0.62, w: 240, h: 150, speed: 0.0004, offset: 2 },
      { x: 0.05, y: 0.65, w: 190, h: 130, speed: 0.00025, offset: 3 }
    ];

    // Pulses moving along network lines
    const pulses = [];
    for (let i = 0; i < 8; i++) {
      pulses.push({
        from: Math.floor(Math.random() * particleCount),
        to: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: Math.random() * 0.012 + 0.005
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep cyber gradient background blend
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, 'rgba(5, 25, 55, 0.95)');
      bgGrad.addColorStop(0.5, 'rgba(3, 15, 36, 0.98)');
      bgGrad.addColorStop(1, 'rgba(2, 8, 20, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Floating Tech Glass Panels in Background
      glassPanels.forEach((panel) => {
        const px = (panel.x * width) + Math.sin(time * panel.speed * 100 + panel.offset) * 15;
        const py = (panel.y * height) + Math.cos(time * panel.speed * 100 + panel.offset) * 12;

        ctx.save();
        ctx.translate(px, py);

        // Panel Glow Outline
        ctx.beginPath();
        ctx.roundRect(0, 0, panel.w, panel.h, 12);
        ctx.fillStyle = 'rgba(0, 180, 255, 0.03)';
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Inner Tech Card Details (lines & dots inside card)
        ctx.beginPath();
        ctx.moveTo(15, 25);
        ctx.lineTo(panel.w - 40, 25);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.22)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(panel.w - 20, 25, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(15, 45);
        ctx.lineTo(panel.w - 70, 45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(15, 65);
        ctx.lineTo(panel.w - 110, 65);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      // Draw Network Line Connections
      const maxDistance = isMobile ? 110 : 150;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const lineGrad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            lineGrad.addColorStop(0, `rgba(0, 229, 255, ${alpha})`);
            lineGrad.addColorStop(1, `rgba(0, 119, 255, ${alpha})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Light Data Pulses along network
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.from = Math.floor(Math.random() * particleCount);
          pulse.to = Math.floor(Math.random() * particleCount);
        }

        const p1 = particles[pulse.from];
        const p2 = particles[pulse.to];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const curX = p1.x + dx * pulse.progress;
          const curY = p1.y + dy * pulse.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Update & Draw Particles
      particles.forEach((p) => {
        // Mouse repelling physics
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 120) {
            const force = (120 - mdist) / 120;
            p.x += (mdx / mdist) * force * 2.5;
            p.y += (mdy / mdist) * force * 2.5;
          }
        }

        // Particle Glow & Draw
        p.pulse += 0.03;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Position movement
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parentEl) {
        parentEl.removeEventListener('mousemove', handleMouseMove);
        parentEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

