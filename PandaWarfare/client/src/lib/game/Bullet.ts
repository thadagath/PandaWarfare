export class Bullet {
  x: number;
  y: number;
  width = 8;
  height = 4;
  active = true;
  
  private vx: number;
  private vy: number;
  private speed = 400; // pixels per second

  constructor(x: number, y: number, dirX: number, dirY: number) {
    this.x = x;
    this.y = y;
    
    // Normalize direction and apply speed
    const magnitude = Math.sqrt(dirX * dirX + dirY * dirY);
    this.vx = (dirX / magnitude) * this.speed;
    this.vy = (dirY / magnitude) * this.speed;
  }

  update(deltaTime: number) {
    if (!this.active) return;
    
    // Move bullet
    this.x += this.vx * (deltaTime / 1000);
    this.y += this.vy * (deltaTime / 1000);
  }
}
