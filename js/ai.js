Game.AI = {}

Game.AI.findBestPosition = function(pit, piece) {
	pit = pit.clone();
	piece = piece.clone();
	piece.center();
	
	/* shift leftwards */
	var left = new XY(-1, 0);
	while (piece.fits(pit)) { piece.setXY(piece.getXY().plus(left)); }
	piece.setXY(piece.getXY().minus(left));
	
	/* move rightwards, test scores */
	var bestScore = Infinity;
	var bestPositions = [];

	while (piece.fits(pit)) {
		var tmpPit = pit.clone();
		tmpPit.drop(piece.clone());
		var score = tmpPit.getScore();
		
		if (score < bestScore) { 
			bestScore = score;
			bestPositions = [];
		}
		
		if (score == bestScore) {
			bestPositions.push(piece.getXY().x);
		}

		piece.setXY(piece.getXY().minus(left));
	}
	
	var x = bestPositions.random();
	
	return {
		score: bestScore,
		x: x
	}
}

Game.AI.findBestPositionRotation = function(pit, piece) {
	var bestScore = Infinity;
	var bestRotations = [];

	for (var i=0;i<4;i++) {
		var tmpPiece = piece.clone();
		for (var j=0;j<i;j++) { tmpPiece.rotate(1); }
		var current = this.findBestPosition(pit, tmpPiece);
		current.rotation = i;
		
		if (current.score < bestScore) {
			bestScore = current.score;
			bestRotations = [];
		}
		
		if (current.score == bestScore) {
			bestRotations.push(current);
		}
	}
	
	return bestRotations.random();
}