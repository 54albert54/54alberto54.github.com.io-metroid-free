document.addEventListener('DOMContentLoaded', function(){

const canvas = document.getElementById('canvas1',{willReadFrequently: true});
const ctx = canvas.getContext('2d');
canvas.width=500;
canvas.height=800;
const dir=document.getElementById("co")
const ass=document.getElementById("saluda")


class Game {
    constructor(ctx, width,height,){
        this.ctx=ctx;
        this.width=width;
        this.height=height;
        this.enemies=[];
        this.enemyInterval=500;
        this.enemyTimer=0;    
        //this.enemytypes=  ["ghost","worm","spider"]; 
        this.enemytypes=  ["enemy1M","enemy2M","enemy3M","enemy4M","enemy5M","enemy6M"];   
        }
    update(deltaTime){
        this.enemies=this.enemies.filter(object => !object.markedForDelection)
        if(this.enemyTimer>this.enemyInterval){
        this.#addNewEnemy();
        this.enemyTimer=0;
        console.log(this.enemies)
       
        
        
        }
        else {this.enemyTimer+=deltaTime}
        this.enemies.forEach(object => object.update(deltaTime))
    }
    draw(){
        this.enemies.forEach(object => object.draw( this.ctx))
       
}
    #addNewEnemy(){
         //const randomEnemy=this.enemytypes[ Math.floor(Math.random()*this.enemytypes.length)]
        //if ( randomEnemy=="ghost")this.enemies.push(new Worm(this));
       // else if ( randomEnemy=="worm")this.enemies.push(new Ghost(this));
        //else if ( randomEnemy=="spider")this.enemies.push(new Spider(this));
        //this.enemies.sort(function(a,b){
        //    return a.y- b.y;
       // });
       

       const randomEnemy=this.enemytypes[ Math.floor(Math.random()*this.enemytypes.length)]
       if ( randomEnemy=="enemy5M")this.enemies.push(new Metroid4X(this));
       if ( randomEnemy=="enemy5M")this.enemies.push(new Metroid4(this));
       if ( randomEnemy=="enemy4M")this.enemies.push(new Metroid2(this));
       if ( randomEnemy=="enemy3M")this.enemies.push(new Metroid3(this));
       if ( randomEnemy=="enemy2M")this.enemies.push(new Metroid2(this));
       if ( randomEnemy=="enemy1M")this.enemies.push(new Metroid(this));
       if ( randomEnemy=="enemy6M")this.enemies.push(new Metroid3X(this));
       
   
        }
}




class Enemy {
constructor(game){  
    this.game=game;
    this.frameX=0
    this.maxFrame =5;
    this.frameInterval=100;
    this.frameTimer=0;
    this.markedForDelection =false;
}
update(deltaTime){    
   //this.x+=this.vx*deltaTime;

    //remove enemies
    if (this.y < 0 - this.height)this.markedForDelection =true;

    if (this.y > canvas.height)this.markedForDelection =true;
    if (this.x < 0 - this.width)this.markedForDelection =true;
    if (this.x > canvas.width)this.markedForDelection =true;
    if (this.frameTimer> this.frameInterval){
        if (this.frameX <this.maxFrame)this.frameX++;
        else this.frameX= 0;
        this.frameTimer=0;
      
        

    } else{
        this.frameTimer+= deltaTime
    }
    }
draw(ctx){
     ctx.drawImage(this.image,this.spriteWidth*this.frameX,0,this.spriteWidth,this.spritheight,this.x, this.y, this.width, this.height)
     
}
}

class Worm extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=229;
        this.spritheight=171;         
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= this.game.width;
        this.y=this.game.height-this.height;
        this.image = worm;
        this.vx= Math.random()*0.1+0.3;
        }
}

class Ghost extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=261;
        this.spritheight=209;      
        
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= this.game.width;
        this.y=Math.random()*this.game.height* 0.6;
        this.image = ghost;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;

        }
        update(deltaTime){
            super.update(deltaTime);
            this.y +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
        }
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.7;
            super.draw(ctx)
            ctx.restore()           
        }
}

class Spider extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=310;
        this.spritheight=175;         
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x=Math.random()* this.game.width;
        this.y=0-this.height;
        this.image = spider;
        this.vx= 0;
        this.vy= Math.random()*0.1+0.1;
        this.maxLength = Math.random()*this.game.height;
        }
        update(deltaTime){
            super.update(deltaTime);
            if (this.y < 0 - this.height*2)this.markedForDelection =true;
            this.y+=this.vy *deltaTime; 
            if (this.y >this.maxLength )this.vy*=-1;
            //+=Math.sin(this.angle)*this.curve;
            //this.angle+=0.04;
        }
        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x+this.width/2,0)
            ctx.lineTo(this.x+this.width/2, this.y+10)
            ctx.stroke();

            super.draw(ctx)

        }
}

class Metroid extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=293;
        this.spritheight=155;      
        
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= canvas.width;
        this.y=Math.random()*this.game.height* 0.8;
        this.image = enemy1M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
        this.dereccion=1;
        dir.innerHTML=(this.dereccion)     
            }
        update(deltaTime){
            super.update(deltaTime);
            this.y +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.x-=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}
class Metroid2 extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=293;
        this.spritheight=155;      
        
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= 0;
        this.y=Math.random()*this.game.height* 0.8;
        this.image = enemy1M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
        this.dereccion=1;
        dir.innerHTML=(this.dereccion)     
            }
        update(deltaTime){
            super.update(deltaTime);
            this.y +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.x+=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}
class Metroid3 extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=293;
        this.spritheight=155;      
        
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= Math.random()*this.game.height* 0.8;
        this.y=0;
        this.image = enemy1M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
        this.dereccion=1;
        dir.innerHTML=(this.dereccion)     
            }
        update(deltaTime){
            super.update(deltaTime);
            this.x +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.y+=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}

class Metroid3X extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=218;
        this.spritheight=177;      
        
        this.width=this.spriteWidth/4;
        this.height=this.spritheight/4;
        this.x= Math.random()*this.game.height* 0.8;
        this.y=0;
        this.image = enemy3M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
        this.dereccion=1;
        dir.innerHTML=(this.dereccion)     
            }
        update(deltaTime){
            super.update(deltaTime);
            this.x +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.y+=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}


class Metroid4 extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=293;
        this.spritheight=155;      
        
        this.width=this.spriteWidth/2;
        this.height=this.spritheight/2;
        this.x= Math.random()*this.game.height* 0.8;
        this.y=canvas.height;
        this.image = enemy1M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
        this.dereccion=1;
        dir.innerHTML=(this.dereccion)     
            }
        update(deltaTime){
            super.update(deltaTime);
            this.x +=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.y-=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}

class Metroid4X extends Enemy{
    constructor(game){
        super(game)  
        this.spriteWidth=266;
        this.spritheight=188;      
        
        this.width=this.spriteWidth/3;
        this.height=this.spritheight/3;
        this.x= Math.random()*this.game.height* 0.8;
        this.y=canvas.height;
        this.image = enemy2M;
        this.vx= Math.random()*0.2+0.1;
        this.angle=0;
        this.curve= Math.random()*3;
            
            }
        update(deltaTime){
            super.update(deltaTime);
            this.x +=Math.sin(this.angle)*this.curve;
            
            //this.x +=Math.random() * (this.medio+this.lado)-2.5;
            //this.y +=Math.random() * 5-2.5;
            this.y-=this.vx*deltaTime;
            //if (this.x < 0 - this.width)this.x=canvas.width;
            //if (this.x > canvas.width)this.x=0;
            
            canvas.addEventListener("mousedown", (e) => {
                
                this.x = e.offsetX;
                this.angle+=0.09;
               this.newY = e.offsetY;
               
               
               
           }); 
           if (this.x + this.width<0){this.flapSpeed = Math.floor(Math.random() * 3 + 1);
            
            
        }
           


}
        draw(ctx){
            ctx.save()
            ctx.globalAlpha=0.8;
            super.draw(ctx)
            ctx.restore()           
        }
}








const game = new Game(ctx, canvas.width, canvas.height );
let lastTime= 1;
function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    const deltaTime =timeStamp-lastTime;
    lastTime=timeStamp;
    game.update(deltaTime);
    game.draw();
    
    // some code
    requestAnimationFrame(animate)


}
animate(0);


function saluda(){
    dir.innerHTML=("adios")

}



});