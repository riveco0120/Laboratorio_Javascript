//Clase modelo
(function(){
     self.Board = function(width,height){
        this.width=width;
        this.height = height;
        this.palying = false;
        this.gameOver=false;
        this.bars = [];
        this.ball = null;
        this.palying=false;
    }

    self.Board.prototype={
        get elements(){
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }

    }

})();

//Clase para crear pelota 
(function(){
    self.Ball =function(x,y,radius,board){
        this.x =x;
        this.y = y;
        this.radius = radius;
        this.speedY=0;
        this.speedx=3;
        this.board = board;
        this.direction=1;
        this.bounceAngle=0;
        this.maxBounceAngle = Math.PI/12;
        this.speed=3;
        board.ball=this;
        this.kind="circle";

    }

    self.Ball.prototype={
        move:function(){
            this.x += (this.speedx * this.direction);
            this.y +=(this.speedY);
        },
        get width(){
            return this.radius*2;
         },
 
         get height(){
             return this.radius*2;
 
         },
         collision:function(bar){
            var relativeIntersectY = (bar.y +(bar.height/2))-this.y;
            var normalizedIntersectY= relativeIntersectY/(bar.height/2);
    
            this.bounceAngle = normalizedIntersectY*this.maxBounceAngle;
            this.speedY = this.speed * -Math.sin(this.bounceAngle);
            this.speedx = this.speed * Math.cos(this.bounceAngle);
    
            if(this.x>(this.board.width/2)) this.direction =-1;
            else this.direction=1;
        }
 
    }



})();

//Funcion para crear barras
(function(){
    self.Bar = function(x,y,whidth,height,board) {
        this.x = x;
        this.y = y;
        this.width=whidth;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind ="rectangle";
        this.speed=10;
    
    }
    
    
    self.Bar.prototype ={
        down:function(){
            this.y += this.speed;
        },
    
        up:function(){
            this.y-= this.speed;
    
        },
        toString:function(){
            return "x: " + this.x + " y: " + this.y

        }
    }
    
    })();
//Clase vista
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
        self.BoardView.prototype={
            clean:function(){
                this.ctx.clearRect(0,0,this.board.width,this.board.height);
            },
            draw: function(){
                for (var i = this.board.elements.length-1; i>=0; i--) {
                    var el = this.board.elements[i];
    
                    draw(this.ctx,el)
                };
            },

            checkCollisions:function(){
                for (var i = this.board.bars.length -1; i>=0;i--){
                   var bar = this.board.bars[i];
                   if(hit(bar,this.board.ball)){
                       this.board.ball.collision(bar); 
    
                   }
                    
                }
    
            },
    

            play:function(){
                if(this.board.palying==true){
                    this.clean();
                    this.draw();
                    this.checkCollisions();
                    this.board.ball.move();
                }
               
            }

        };

        function hit(a,b){
            var hit = false;
    
            if(b.x + b.width >= a.x && b.x < a.x + a.width){
              if(b.y + b.height >= a.y && b.y < a.y + a.height){
                hit=true;
    
                }  
            }
    
            if(b.x <= a.y && b.x + b.width >= a.x + a.width){
                if(b.y <= a.y && b.y + b.height >= a.y + a.height){
                    hit = true;
                }
            }
    
            if(a.x <= b.x && a.x + a.width >= b.x + b.width){
                if(a.y <= b.y && a.y + a.height >= b.y + b.height){
                    hit = true;
            }
        }
    
            return hit;
              
        }

//Dibujando los elemensto
function draw(ctx,element){
    switch(element.kind){
        case "rectangle":
        ctx.fillRect(element.x,element.y,element.width,element.height);
        break;
        case "circle":
            ctx.beginPath();
            ctx.arc(element.x,element.y,element.radius,0,7);
            ctx.fill();
            ctx.closePath();
            break;

}
}
})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar2 = new Bar(740,100,40,100,board);
var canvas = document.getElementById('canvas');
var boardview = new BoardView(canvas,board)
var ball = new Ball(350,100,10,board);

document.addEventListener("keydown",function(event){

    if(event.keyCode==38){
        event.preventDefault();
        bar.up();
    }

    else if(event.keyCode==40){
        event.preventDefault();
        bar.down()
    }

    else if(event.keyCode==87){
        event.preventDefault();
        bar2.up();
    }
    else if(event.keyCode==83){
        event.preventDefault();
        bar2.down();
    }

    else if (event.keyCode==32){
        event.preventDefault();
        board.palying=!board.palying;
    }


})
//actualizar 

boardview.draw();

window.requestAnimationFrame(controller);
setTimeout(function(){
    ball.direction=-1;

},4000)

//Controlador
function controller(){

    //instanciar objetos
    boardview.play();
    window.requestAnimationFrame(controller);

}