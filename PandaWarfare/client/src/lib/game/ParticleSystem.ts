interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];

  addParticle(x: number, y: number, vx: number, vy: number, color: string, life: number) {
    this.particles.push({
      x, y, vx, vy, color,
      life, maxLife: life
    });
  }

  update(deltaTime: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update position
      particle.x += particle.vx * (deltaTime / 1000);
      particle.y += particle.vy * (deltaTime / 1000);
      
      // Update life
      particle.life -= deltaTime;
      
      // Apply physics to particles
      if (particle.color === '#ff4400' || particle.color === '#ff8800' || particle.color === '#ff0000') {
        // Fire particles rise initially then fall
        particle.vy += 150 * (deltaTime / 1000);
        // Add some horizontal drift
        particle.vx *= 0.98;
      } else if (particle.color === '#555555' || particle.color === '#333333' || particle.color === '#666666') {
        // Smoke rises and spreads
        particle.vy -= 20 * (deltaTime / 1000);
        particle.vx *= 0.95;
      }
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Different rendering for different particle types
      if (particle.color.includes('#ff')) {
        // Fire particles - with glow effect
        const size = 2 + (4 * alpha);
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.color.includes('#333') || particle.color.includes('#555') || particle.color.includes('#666')) {
        // Smoke particles - larger and softer
        const size = 3 + (6 * alpha);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Default particles
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3 * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  }
}
