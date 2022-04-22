//Clase modelo
(function(){

     self.Board = function(width,height){
        this.width=width;
        this.height = height;
        this.palying = false;
        this.gameOver=false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype={
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
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
            this.y = this.speed;
    
        }
    }
    
    })();
//Clase vista
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.canvas.height = board.height;;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
        self.BoardView.prototype={
            draw: function(){
                for (var i = this.board.elements.length-1; i>=0; i--) {
                    var el = this.board.elements[i];
    
                    draw(this.ctx,el)
                };
            }
        };

//Dibujando los elemensto
function draw(ctx,element){
    if(element!== null && element.hasOwnProperty("kind")){
    switch(element.kind){
        case "rectangle":
        ctx.fillRect(element.x,element.y,element.width,element.height);
        break;

    }
}
}
})();

var board = new Board(800,400);
    var bar = new Bar(20,100,40,100,board);
    var bar = new Bar(700,100,40,100,board);
    var canvas = document.getElementById('canvas');
    //Pasando el model a la vista

    var boardview = new BoardView(canvas,board)
   //Dibujando todos los elementos 
    

document.addEventListener("keydown",function(event){
  
    if(event.keyCode==38){
        bar.up();
    }

    else if(event.keyCode==40){
        bar.down()
    }
})

//actualizar 
self.addEventListener("load",main)

//Controlador
function main(){

    //instanciar objetos
    boardview.draw();
}