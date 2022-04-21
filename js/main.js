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
            var elements =this.bars;
            elements.push(this.ball);
            return elements;
        }
    }



})();

//Funcion para crear barras
(function(){

    self.Bar = function(x,y,width,height,board){
        this.x =x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;

        //insertando elementos bar en el arreglo bars
        this.board.bars.push(this);

        //Dibujar las brras
        this.kind="rectangle";
    }

    //Funciones para mover las barras
    self.Bar.prototype={
        down:function(){

        },

        up:function(){

        }
    }



})();

//Clase vista
(function(){
    self.BoardView = function(canvas,Board){
        this.canvas =canvas;
        this.canvas.width = Board.width;
        this.canvas.height= Board.height;
        this.Borad = Board;
        this.contexto = canvas.getContext("2d");


}

   self.BoardView.prototype ={
    draw:function(){
        for (var i = this.board.elements.lenght-1; i>=0; i--) {
            var elementoDibujado = this.board.elements[i];
          
            draw(this.contexto,elementoDibujado)
        };
    }
}


//Dibujando los elemensto
function draw(contexto,element){
    if(element!==null && element.hasOwnProperty("kind")){
        switch ((element.kind)) {
            case "rectangle":
                //Funcion para dibujar el cuadrado con las cordenadas, altura y anchura
                contexto.fillReact(element.x,element.y,element.width,element.height);
               break;
        
               default:
                break;
        }
        
    }
    }
})();

//actualizar 
window.addEventListener("load",main)

//Controlador
function main(){

    //instanciar objetos
    var board = new Board(800,400);
    var bar = new Bar(20,100,40,100,board);
    var barDos = new Bar(700,100,40,100,board);
    var canvas = document.getElementById('canvas');
    //Pasando el model a la vista
    var board_view = new BoardView(canvas,board);
   //Dibujando todos los elementos 
    board_view.draw();

}