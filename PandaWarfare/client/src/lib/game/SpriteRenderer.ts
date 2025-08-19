import { Player } from './Player';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';

export class SpriteRenderer {
  private ctx: CanvasRenderingContext2D;
  private sprites: Map<string, HTMLImageElement> = new Map();

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  async init() {
    // Create placeholder sprites since we can't generate actual images
    await this.createSprites();
  }

  private async createSprites() {
    // Create placeholder sprites using canvas
    this.sprites.set('panda', this.createPandaSprite());
    this.sprites.set('jeet', this.createJeetSprite());
  }

  private createPandaSprite(): HTMLImageElement {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d')!;

    // Clear background
    ctx.clearRect(0, 0, 40, 40);
    
    // Draw General Panda with better contrast and detail
    // Body (olive green military uniform)
    ctx.fillStyle = '#556B2F';
    ctx.fillRect(6, 18, 28, 22);
    
    // Arms
    ctx.fillStyle = '#556B2F';
    ctx.fillRect(2, 20, 8, 12);
    ctx.fillRect(30, 20, 8, 12);
    
    // Head (white panda base)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(20, 14, 14, 0, Math.PI * 2);
    ctx.fill();
    
    // Add black outline to head
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Panda eye patches (black)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(15, 12, 5, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(25, 12, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner eyes (white)
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(15, 12, 2, 0, Math.PI * 2);
    ctx.arc(25, 12, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(16, 12, 1, 0, Math.PI * 2);
    ctx.arc(24, 12, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Panda ears (black)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(10, 6, 5, 0, Math.PI * 2);
    ctx.arc(30, 6, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(20, 17, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Military helmet/cap
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(8, 2, 24, 8);
    ctx.fillRect(6, 4, 28, 4);

    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  }

  private createJeetSprite(): HTMLImageElement {
    const canvas = document.createElement('canvas');
    canvas.width = 35;
    canvas.height = 35;
    const ctx = canvas.getContext('2d')!;

    // Clear background
    ctx.clearRect(0, 0, 35, 35);

    // Draw Jeet (pig head with better definition)
    // Head (bright pink pig)
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.arc(17.5, 18, 13, 0, Math.PI * 2);
    ctx.fill();
    
    // Add black outline to head
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Pig ears
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.ellipse(10, 12, 3, 5, -0.3, 0, Math.PI * 2);
    ctx.ellipse(25, 12, 3, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Snout (more prominent)
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.ellipse(17.5, 22, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Snout outline
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Nostrils (bigger)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(15, 22, 1.5, 0, Math.PI * 2);
    ctx.arc(20, 22, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Angry red eyes
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(13, 16, 2.5, 0, Math.PI * 2);
    ctx.arc(22, 16, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(13, 16, 1, 0, Math.PI * 2);
    ctx.arc(22, 16, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Messy hair (darker brown, more strands)
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 7; i++) {
      const x = 7 + i * 3.5;
      const height = 6 + Math.random() * 6;
      const width = 2 + Math.random() * 2;
      ctx.fillRect(x, 2, width, height);
    }
    
    // Angry mouth
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(17.5, 20, 3, 0, Math.PI);
    ctx.stroke();

    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  }

  drawPlayer(player: Player) {
    const sprite = this.sprites.get('panda');
    if (sprite && sprite.complete) {
      this.ctx.drawImage(sprite, player.x, player.y, player.width, player.height);
    } else {
      // Fallback rectangle
      this.ctx.fillStyle = '#4a5d23';
      this.ctx.fillRect(player.x, player.y, player.width, player.height);
    }
  }

  drawEnemy(enemy: Enemy) {
    const sprite = this.sprites.get('jeet');
    if (sprite && sprite.complete) {
      this.ctx.drawImage(sprite, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
      // Fallback rectangle
      this.ctx.fillStyle = '#ffb6c1';
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }

  drawBullet(bullet: Bullet) {
    // Simple bullet rendering
    this.ctx.fillStyle = '#ffff00';
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    
    // Add glow effect
    this.ctx.shadowColor = '#ffff00';
    this.ctx.shadowBlur = 3;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    this.ctx.shadowBlur = 0;
  }
}
