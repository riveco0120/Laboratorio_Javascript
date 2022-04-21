(function(){

    var self,Board = function(width,height){
        this._width=width;
        this._height = height;
        this.palying = false;
        this.game_over=false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype={
        get elements(){
            var elements =this.bars;
            elements.push(ball);
            return elements;
        }
    }



})();

(function(){
    self.BoardView = function(canvas,borad){
        this._canvas =canvas;
        this._canvas.width = borad.width;
        this._canvas.height= borad.height;
}
})()

function main(){

}