export class Enemy {
  x: number;
  y: number;
  width = 35;
  height = 35;
  active = true;
  
  private speed = 80; // pixels per second

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime: number) {
    if (!this.active) return;
    
    // Move left toward player
    this.x -= this.speed * (deltaTime / 1000);
    
    // Deactivate if off screen
    if (this.x < -100) {
      this.active = false;
    }
  }
}
