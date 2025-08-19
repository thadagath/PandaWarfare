import { Bullet } from './Bullet';

export class Player {
  x: number;
  y: number;
  width = 40;
  height = 40;
  
  private lastAttackTime = 0;
  private attackCooldown = 200; // milliseconds

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime: number) {
    // Player updates (if any continuous effects)
  }

  attack(deltaTime: number, onBulletCreate: (bullet: Bullet) => void) {
    this.lastAttackTime += deltaTime;
    
    if (this.lastAttackTime >= this.attackCooldown) {
      this.lastAttackTime = 0;
      
      // Create bullet
      const bullet = new Bullet(
        this.x + this.width,
        this.y + this.height / 2 - 2,
        1, 0 // Direction: right
      );
      
      onBulletCreate(bullet);
      console.log("Player fired bullet");
    }
  }
}
