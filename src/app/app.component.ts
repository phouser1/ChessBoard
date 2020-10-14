import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessBoard';

  
  chessBoard2 = [
    [
      { image: "/assets/images/blackRook.png", piece: "r", showMove: false , showCapture: false},
      { image: "/assets/images/blackKnight.png", piece: "n", showMove: false,  showCapture: false},
      { image: "/assets/images/blackBishop.png", piece: "b", showMove: false,  showCapture: false},
      { image: "/assets/images/blackQueen.png", piece: "q", showMove: false,  showCapture: false},
      { image: "/assets/images/blackKing.png", piece: "k", showMove: false,  showCapture: false},
      { image: "/assets/images/blackBishop.png", piece: "b", showMove: false,  showCapture: false},
      { image: "/assets/images/blackKnight.png", piece: "n", showMove: false,  showCapture: false},
      { image: "/assets/images/blackRook.png", piece: "r", showMove: false,  showCapture: false}
    ],
    [
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false},
      { image: "/assets/images/blackPawn.png", piece: "p", showMove: false ,  showCapture: false}
    ],
    [
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false}
    ],
    [
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false}
    ],
    [
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false}
    ],
    [
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false},
      { image: "", piece: "", showMove: false ,  showCapture: false}
    ],
    [
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false},
      { image: "/assets/images/whitePawn.png", piece: "P", showMove: false ,  showCapture: false}
    ],
    [
      { image: "/assets/images/whiteRook.png", piece: "R", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteKnight.png", piece: "N", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteBishop.png", piece: "B", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteQueen.png", piece: "Q", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteKing.png", piece: "K", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteBishop.png", piece: "B", showMove: false ,  showCapture: false},
      { image: "/assets/images/whiteKnight.png", piece: "N", showMove: false,  showCapture: false },
      { image: "/assets/images/whiteRook.png", piece: "R", showMove: false ,  showCapture: false}
    ]
  ];

  currentPossibleMoves: [{ i: number, j: number, show: boolean , capture: boolean}];
  activeI: number;
  activeJ: number;

  currentTurn = 'white';
  moveHistory = '';
  fenPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  drop(event: CdkDragDrop<any>) {
    this.deselectPiece();
    //if correct player turn
    if (this.currentTurn == this.getPieceColor(this.chessBoard2[event.previousContainer.data.indexI][event.previousContainer.data.indexJ].piece)) {

      //console.log("piece dropped");

      //Move to empty square
      if (this.currentPossibleMoves.find(element => (element.i == event.container.data.indexI && element.j == event.container.data.indexJ && element.show == true))) {
        //console.log("move");
        this.chessBoard2[event.previousContainer.data.indexI][event.previousContainer.data.indexJ] = { ...event.container.data.square }
        this.chessBoard2[event.container.data.indexI][event.container.data.indexJ] = { ...event.previousContainer.data.square }
        this.currentTurn == 'white' ? this.currentTurn = 'black' : this.currentTurn = 'white';
      }
      //Take piece
      else if (this.currentPossibleMoves.find(element => (element.i == event.container.data.indexI && element.j == event.container.data.indexJ && element.show == false))) {
        //console.log("take");
        this.chessBoard2[event.previousContainer.data.indexI][event.previousContainer.data.indexJ] = { image: '', piece: '', showMove: false , showCapture: false}
        this.chessBoard2[event.container.data.indexI][event.container.data.indexJ] = { ...event.previousContainer.data.square }
        this.currentTurn == 'white' ? this.currentTurn = 'black' : this.currentTurn = 'white';
      }
      this.checkForPromotion(event.container.data.indexI, event.container.data.indexJ);
      this.updateFENPosition();
    }
    this.addMovesToMoveHistory(event.previousContainer.data.indexI, event.previousContainer.data.indexJ, event.container.data.indexI, event.container.data.indexJ);
    this.pieceClicked = false;
    this.clearPossibleMoves();
  }

  pieceMousedOver(i, j) {
    console.log('moused over');
    this.deselectPiece();
    // Only get moves for hovered over piece. Once clicked user has already selected the piece they are going to move.
    // Prevents capture bug when mousing over piece to be captured.
    if (!this.pieceClicked) {
      //console.log("pieceHeld")
      var currentSquare = this.chessBoard2[i][j];
      this.currentPossibleMoves = [{ i: 0, j: 0, show: false , capture: false}];
      this.color = this.getPieceColor(this.chessBoard2[i][j].piece);
      this.clearPossibleMoves();

      if (currentSquare.piece.toLowerCase() == "r") {
        this.setRookSquares(i, j);
      }
      else if (currentSquare.piece.toLowerCase() == "b") {
        this.setBishopSquares(i, j);
      }
      else if (currentSquare.piece.toLowerCase() == "q") {
        this.setQueenSquares(i, j);
      }
      else if (currentSquare.piece.toLowerCase() == "k") {
        this.setKingSquares(i, j);
      }
      else if (currentSquare.piece.toLowerCase() == "n") {
        this.setKnightSquares(i, j);
      }
      else if (currentSquare.piece.toLowerCase() == "p") {
        this.setPawnSquares(i, j);
      }
      //show possible moves on board
      if (this.currentPossibleMoves.length > 0) {
        this.currentPossibleMoves.forEach((element) => element.show ? this.chessBoard2[element.i][element.j].showMove = true : this.chessBoard2[element.i][element.j].showMove = false);
        this.currentPossibleMoves.forEach((element) => element.capture ? this.chessBoard2[element.i][element.j].showCapture = true : this.chessBoard2[element.i][element.j].showCapture = false);
        //this.getSquareColors(this.currentPossibleMoves, i, j);
      }
    }
  }
  getPieceColor(piece) {
    if (piece == '')
      return '';
    else if (piece == piece.toLowerCase())
      return 'black';
    else return 'white';
  }

  color: string;
  setRookSquares(i, j) {
    this.setPossibleMoves(i, j, 1, 0);
    this.setPossibleMoves(i, j, 0, 1);
    this.setPossibleMoves(i, j, -1, 0);
    this.setPossibleMoves(i, j, 0, -1);
  }

  setBishopSquares(i, j) {
    this.setPossibleMoves(i, j, 1, 1);
    this.setPossibleMoves(i, j, -1, 1);
    this.setPossibleMoves(i, j, -1, -1);
    this.setPossibleMoves(i, j, 1, -1);
  }

  setQueenSquares(i, j) {
    this.setBishopSquares(i, j);
    this.setRookSquares(i, j);
  }

  setKingSquares(i, j) {
    this.setPossibleMovesKing(i, j, 1, 0);
    this.setPossibleMovesKing(i, j, 0, 1);
    this.setPossibleMovesKing(i, j, -1, 0);
    this.setPossibleMovesKing(i, j, 0, -1);
    this.setPossibleMovesKing(i, j, 1, 1);
    this.setPossibleMovesKing(i, j, -1, 1);
    this.setPossibleMovesKing(i, j, -1, -1);
    this.setPossibleMovesKing(i, j, 1, -1);
  }

  setKnightSquares(i, j) {
    this.setPossibleMovesKnight(i + 2, j + 1);
    this.setPossibleMovesKnight(i + 1, j + 2);
    this.setPossibleMovesKnight(i - 2, j + 1);
    this.setPossibleMovesKnight(i - 1, j + 2);
    this.setPossibleMovesKnight(i + 2, j - 1);
    this.setPossibleMovesKnight(i + 1, j - 2);
    this.setPossibleMovesKnight(i - 2, j - 1);
    this.setPossibleMovesKnight(i - 1, j - 2);
  }

  setPawnSquares(i, j) {
    if (this.color == 'white') {
      //console.log('pawn');
      this.setPossibleMovesWhitePawn(i - 1, j);
    }
    else this.setPossibleMovesBlackPawn(i + 1, j);
  }

  setPossibleMoves(x, y, xDir, yDir) {
    for (let i = x + xDir, j = y + yDir; ; i += xDir, j += yDir) {
      if (this.isOutOfBounds(i, j)) {
        break;
      }
      if (this.getPieceColor(this.chessBoard2[i][j].piece) != this.color) {
        if (this.getPieceColor(this.chessBoard2[i][j].piece) != '') {
          this.currentPossibleMoves.push({ i: i, j: j, show: false , capture: true});
          break;
        }
        else this.currentPossibleMoves.push({ i: i, j: j, show: true , capture: false});
      }
      else break;
    }
  }

  setPossibleMovesKing(x, y, xDir, yDir) {
    for (let i = x + xDir, j = y + yDir; ; i += xDir, j += yDir) {
      if (this.isOutOfBounds(i, j)) {
        break;
      }
      if (this.getPieceColor(this.chessBoard2[i][j].piece) != this.color) {
        if (this.getPieceColor(this.chessBoard2[i][j].piece) != '') {
          this.currentPossibleMoves.push({ i: i, j: j, show: false , capture: true});
          break;
        }
        else this.currentPossibleMoves.push({ i: i, j: j, show: true , capture: false});
      }
      break;
    }
  }

  setPossibleMovesKnight(x, y) {
    if (!this.isOutOfBounds(x, y)) {
      if (this.getPieceColor(this.chessBoard2[x][y].piece) != this.color) {
        this.getPieceColor(this.chessBoard2[x][y].piece) != '' ? this.currentPossibleMoves.push({ i: x, j: y, show: false , capture:true}) : this.currentPossibleMoves.push({ i: x, j: y, show: true, capture:false });
      }
    }
  }

  setPossibleMovesWhitePawn(x, y) {
    if (!this.isOutOfBounds(x, y + 1)) {
      if (this.chessBoard2[x][y + 1].piece != '' && this.getPieceColor(this.chessBoard2[x][y + 1].piece) != this.color) { this.currentPossibleMoves.push({ i: x, j: y + 1, show: false , capture: true}); }
    }
    if (!this.isOutOfBounds(x, y - 1)) {
      if (this.chessBoard2[x][y - 1].piece != '' && this.getPieceColor(this.chessBoard2[x][y - 1].piece) != this.color) { this.currentPossibleMoves.push({ i: x, j: y - 1, show: false , capture: true}); }
    }
    if (x + 1 == 6) {
      //console.log('start');
      if (this.chessBoard2[x][y].piece == '') { this.currentPossibleMoves.push({ i: x, j: y, show: true, capture: false }); }
      if (this.chessBoard2[x][y].piece == '' && this.chessBoard2[x - 1][y].piece == '') { this.currentPossibleMoves.push({ i: x - 1, j: y, show: true , capture: false}); }
    }
    else { if (this.chessBoard2[x][y].piece == '') { this.currentPossibleMoves.push({ i: x, j: y, show: true , capture: false}); } }
  }

  setPossibleMovesBlackPawn(x, y) {
    if (!this.isOutOfBounds(x, y + 1)) {
      if (this.chessBoard2[x][y + 1].piece != '' && this.getPieceColor(this.chessBoard2[x][y + 1].piece) != this.color) { this.currentPossibleMoves.push({ i: x, j: y + 1, show: false , capture: true}); }
    }
    if (!this.isOutOfBounds(x, y - 1)) {
      if (this.chessBoard2[x][y - 1].piece != '' && this.getPieceColor(this.chessBoard2[x][y - 1].piece) != this.color) { this.currentPossibleMoves.push({ i: x, j: y - 1, show: false , capture: true}); }
    }
    if (x - 1 == 1) {
      if (this.chessBoard2[x][y].piece == '') { this.currentPossibleMoves.push({ i: x, j: y, show: true, capture: false }); }
      if (this.chessBoard2[x][y].piece == '' && this.chessBoard2[x + 1][y].piece == '') { this.currentPossibleMoves.push({ i: x + 1, j: y, show: true , capture: false}); }
    }
    else { if (this.chessBoard2[x][y].piece == '') { this.currentPossibleMoves.push({ i: x, j: y, show: true , capture: false}); } }
  }

  isOutOfBounds(i, j) {
    if (i > 7 || i < 0 || j > 7 || j < 0) {
      return true;
    }
    else return false;
  }

  checkForPromotion(i, j) {
    if (this.chessBoard2[i][j].piece == 'P' && i == 0) {
      this.chessBoard2[i][j] = { image: "assets/images/whiteQueen.png", piece: "Q", showMove: false , showCapture: false};
    }
    else if (this.chessBoard2[i][j].piece == 'p' && i == 7) {
      this.chessBoard2[i][j] = { image: "assets/images/blackQueen.png", piece: "q", showMove: false , showCapture: false};
    }
  }

  //constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }
  testVal = '';
  //engineReadablePositions: string[];
  engineReadablePositions = [''];


  getSquareColors(moveSet: [{ i: number; j: number; show: boolean; }], initialI: any, initialJ: any) {
    this.clearEngineReadableMoves();
    this.clearMovesAndBoardState();
    console.log('getsquarecolors');
    var startPos = this.translateJIndex(initialJ) + this.translateIIndex(initialI);
    for (var k = 0; k < moveSet.length; k++) {
      var move = startPos + this.translateJIndex(moveSet[k].j) + this.translateIIndex(moveSet[k].i);
      this.engineReadablePositions.push(move);
    }
    //console.log(this.engineReadablePositions);

    //console.log('posting');
    this.MovesAndBoardState.moves = this.engineReadablePositions;
    this.MovesAndBoardState.FENPosition = this.fenPosition;
    // this.http.post('/chess', JSON.stringify(this.MovesAndBoardState), { headers: { "Content-Type": 'application/json' }})
    //   .subscribe(
    //     (val) => {
    //       console.log("POST call successful value returned in body",
    //         val);
    //     },
    //     response => {
    //       console.log("POST call in error", response);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    //     });

  }

  MovesAndBoardState = { moves: [''], FENPosition: '' };

  updateFENPosition() {
    this.fenPosition = '';
    let sumFen = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.chessBoard2[i][j].piece == '') {
          sumFen++;
        }
        else {
          if (sumFen > 0) {
            this.fenPosition += sumFen; sumFen = 0;
          }
          this.fenPosition += this.chessBoard2[i][j].piece;
        }
      }
      if (sumFen > 0) {
        this.fenPosition += sumFen; sumFen = 0;
      }
      if (i < 7) {
        this.fenPosition += '/';
      }
    }

    this.currentTurn == 'white' ? this.fenPosition += ' w' : this.fenPosition += ' b';
    console.log(this.fenPosition);
  }

  addMovesToMoveHistory(i1, j1, i2, j2) {
   this.moveHistory += (this.translateJIndex(j1) + this.translateIIndex(i1) + this.translateJIndex(j2) + this.translateIIndex(i2) +  ', ');
   console.log(this.moveHistory);
  }

  translateJIndex(j) {
    if (j == 0) return 'a';
    if (j == 1) return 'b';
    if (j == 2) return 'c';
    if (j == 3) return 'd';
    if (j == 4) return 'e';
    if (j == 5) return 'f';
    if (j == 6) return 'g';
    if (j == 7) return 'h';
  }

  translateIIndex(i) {
    if (i == 0) return '8';
    if (i == 1) return '7';
    if (i == 2) return '6';
    if (i == 3) return '5';
    if (i == 4) return '4';
    if (i == 5) return '3';
    if (i == 6) return '2';
    if (i == 7) return '1';
  }

  clearPossibleMoves() {
    if (this.currentPossibleMoves) {
      while (this.currentPossibleMoves.length) {
        this.currentPossibleMoves.pop();
      }
    }
  }

  clearEngineReadableMoves() {
    if (this.engineReadablePositions) {
      while (this.engineReadablePositions.length) {
        this.engineReadablePositions.pop();
      }
    }
  }

  clearMovesAndBoardState() {
    if (this.MovesAndBoardState) {
      while (this.MovesAndBoardState.moves.length) {
        this.MovesAndBoardState.moves.pop();
      }
    }
  }

  pieceClicked: boolean;
  downClick() {
    this.pieceClicked = true;
  }
  upClick() {
    this.pieceClicked = false;
  }

  deselectPiece() {
    //console.log('deselect');
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        this.chessBoard2[i][j].showMove = false;
        this.chessBoard2[i][j].showCapture = false;
      }
    }
  }
}
