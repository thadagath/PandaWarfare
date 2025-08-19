import { Player } from './Player';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { ParticleSystem } from './ParticleSystem';
import { SpriteRenderer } from './SpriteRenderer';
import { useGameState } from '../stores/useGameState';
import { useAudio } from '../stores/useAudio';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  private bullets: Bullet[] = [];
  private particles: ParticleSystem;
  private spriteRenderer: SpriteRenderer;
  
  private lastTime = 0;
  private animationId: number | null = null;
  
  // Game state
  private enemySpawnTimer = 0;
  private enemySpawnRate = 2000; // milliseconds
  private burnAttackTimer = 0;
  private waveEnemiesKilled = 0;
  private enemiesPerWave = 10;
  
  // Input state
  private keys = new Set<string>();
  private mobileControls = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    burn: false
  };

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(canvas.width / 4, canvas.height / 2);
    this.particles = new ParticleSystem();
    this.spriteRenderer = new SpriteRenderer(ctx);
  }

  async init() {
    // Initialize sprite renderer
    await this.spriteRenderer.init();
    
    // Start game loop
    this.gameLoop(0);
    console.log("Game loop started");
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  updateInput(keys: Set<string>, mobileControls: any) {
    this.keys = keys;
    this.mobileControls = mobileControls;
  }

  private gameLoop = (currentTime: number) => {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number) {
    // Update burn attack timer
    this.burnAttackTimer += deltaTime;
    const burnCooldown = Math.max(0, 30 - this.burnAttackTimer / 1000);
    useGameState.getState().updateBurnAttackCooldown(burnCooldown);

    // Handle input
    this.handleInput(deltaTime);

    // Update player
    this.player.update(deltaTime);

    // Spawn enemies
    this.spawnEnemies(deltaTime);

    // Update enemies
    this.enemies.forEach(enemy => enemy.update(deltaTime));

    // Update bullets
    this.bullets.forEach(bullet => bullet.update(deltaTime));

    // Update particles
    this.particles.update(deltaTime);

    // Check collisions
    this.checkCollisions();

    // Clean up dead objects
    this.cleanup();

    // Check wave progression
    this.checkWaveProgression();
  }

  private handleInput(deltaTime: number) {
    const speed = 180; // pixels per second (reduced from 300)
    const moveDistance = speed * (deltaTime / 1000);

    // Movement (keyboard)
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA') || this.mobileControls.left) {
      this.player.x = Math.max(0, this.player.x - moveDistance);
    }
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD') || this.mobileControls.right) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + moveDistance);
    }
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW') || this.mobileControls.up) {
      this.player.y = Math.max(0, this.player.y - moveDistance);
    }
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS') || this.mobileControls.down) {
      this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + moveDistance);
    }

    // Attack
    if (this.keys.has('Space') || this.mobileControls.attack) {
      this.player.attack(deltaTime, (bullet: Bullet) => {
        this.bullets.push(bullet);
      });
    }

    // Burn attack
    if ((this.keys.has('KeyB') || this.mobileControls.burn) && useGameState.getState().burnAttackReady) {
      this.executeBurnAttack();
    }

    console.log(`Player position: (${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}), Enemies: ${this.enemies.length}, Bullets: ${this.bullets.length}`);
  }

  private spawnEnemies(deltaTime: number) {
    this.enemySpawnTimer += deltaTime;
    
    if (this.enemySpawnTimer >= this.enemySpawnRate) {
      this.enemySpawnTimer = 0;
      
      // Spawn enemy from right side
      const enemy = new Enemy(
        this.canvas.width,
        Math.random() * (this.canvas.height - 60)
      );
      this.enemies.push(enemy);
      
      console.log(`Enemy spawned at (${enemy.x}, ${enemy.y})`);
    }
  }

  private executeBurnAttack() {
    console.log("Executing burn attack!");
    
    // Use burn attack
    useGameState.getState().useBurnAttack();
    this.burnAttackTimer = 0;

    // Create massive fire explosion for burn attack
    this.enemies.forEach(enemy => {
      // Main fire explosion
      for (let i = 0; i < 30; i++) {
        this.particles.addParticle(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300 - 100,
          Math.random() < 0.3 ? '#ff0000' : (Math.random() < 0.6 ? '#ff4400' : '#ff8800'),
          1500
        );
      }
      // Smoke trails
      for (let i = 0; i < 15; i++) {
        this.particles.addParticle(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          (Math.random() - 0.5) * 150,
          -Math.random() * 150 - 100,
          Math.random() < 0.5 ? '#333333' : '#666666',
          2000
        );
      }
    });

    // Add score for all enemies killed
    const enemiesKilled = this.enemies.length;
    useGameState.getState().addScore(enemiesKilled);
    this.waveEnemiesKilled += enemiesKilled;

    // Clear all enemies
    this.enemies = [];

    // Play success sound
    useAudio.getState().playSuccess();
  }

  private checkCollisions() {
    // Bullet vs Enemy collisions
    this.bullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (bullet.active && enemy.active && 
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y) {
          
          // Hit!
          bullet.active = false;
          enemy.active = false;
          
          // Add fire explosion particles
          for (let i = 0; i < 15; i++) {
            this.particles.addParticle(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              (Math.random() - 0.5) * 150,
              (Math.random() - 0.5) * 150 - 50,
              Math.random() < 0.5 ? '#ff4400' : '#ff8800',
              800
            );
          }
          // Add smoke particles
          for (let i = 0; i < 8; i++) {
            this.particles.addParticle(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              (Math.random() - 0.5) * 80,
              -Math.random() * 100 - 50,
              '#555555',
              1200
            );
          }

          // Add score
          useGameState.getState().addScore(1);
          this.waveEnemiesKilled++;

          // Play hit sound
          useAudio.getState().playHit();
          
          console.log("Enemy hit! Score:", useGameState.getState().score);
        }
      });
    });

    // Player vs Enemy collisions
    this.enemies.forEach(enemy => {
      if (enemy.active &&
          this.player.x < enemy.x + enemy.width &&
          this.player.x + this.player.width > enemy.x &&
          this.player.y < enemy.y + enemy.height &&
          this.player.y + this.player.height > enemy.y) {
        
        // Player hit!
        enemy.active = false;
        useGameState.getState().takeDamage();
        
        // Add damage particles
        for (let i = 0; i < 15; i++) {
          this.particles.addParticle(
            this.player.x + this.player.width / 2,
            this.player.y + this.player.height / 2,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 150,
            '#ff0000',
            800
          );
        }

        console.log("Player hit! Health:", useGameState.getState().health);
      }
    });
  }

  private cleanup() {
    // Remove inactive bullets
    this.bullets = this.bullets.filter(bullet => 
      bullet.active && bullet.x < this.canvas.width + 50
    );

    // Remove inactive enemies
    this.enemies = this.enemies.filter(enemy => 
      enemy.active && enemy.x > -100
    );
  }

  private checkWaveProgression() {
    if (this.waveEnemiesKilled >= this.enemiesPerWave) {
      // Next wave
      useGameState.getState().nextWave();
      this.waveEnemiesKilled = 0;
      
      // Increase difficulty
      this.enemySpawnRate = Math.max(500, this.enemySpawnRate * 0.9);
      this.enemiesPerWave += 2;
      
      console.log(`Wave ${useGameState.getState().wave} - Spawn rate: ${this.enemySpawnRate}ms`);
    }
  }

  private render() {
    // Clear canvas with war zone background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#654321');
    gradient.addColorStop(0.7, '#8B4513');
    gradient.addColorStop(1, '#A0522D');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background elements (simple war zone)
    this.drawBackground();

    // Render sprites
    this.spriteRenderer.drawPlayer(this.player);
    
    this.enemies.forEach(enemy => {
      this.spriteRenderer.drawEnemy(enemy);
    });

    this.bullets.forEach(bullet => {
      this.spriteRenderer.drawBullet(bullet);
    });

    // Render particles
    this.particles.render(this.ctx);
  }

  private drawBackground() {
    // Draw simple ground
    this.ctx.fillStyle = '#2F4F2F';
    this.ctx.fillRect(0, this.canvas.height * 0.8, this.canvas.width, this.canvas.height * 0.2);

    // Draw some simple war zone elements
    this.ctx.fillStyle = '#555';
    for (let i = 0; i < this.canvas.width; i += 200) {
      // Rubble/debris
      this.ctx.fillRect(i + 50, this.canvas.height * 0.75, 30, 20);
      this.ctx.fillRect(i + 120, this.canvas.height * 0.7, 40, 30);
    }
  }
}
