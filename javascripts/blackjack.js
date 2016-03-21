var M = {},
  V = {},
  C = {};


M = {
  data: {

  },
  Deck: function(n) {
    this.data.deck = [];

    for (i = 0; i < n; i++) {
      for (j = 0; j < 52; j++) {
        this.data.deck[j] = new M.Card(j);
        this.data.deck[j].standardize();
      }
    }
  },
  Card: function(v) {
    this.rank = "";
    this.rankcss = "";
    this.suit = "";
    this.r = v % 13 + 1

    this.standardize = function() {

      if (this.r == 1) {
        this.rank = "A";
        this.rankcss = "a";
      } else if (this.r == 11) {
        this.rank = "J";
        this.rankcss = "j";
      } else if (this.r == 12) {
        this.rank = "Q";
        this.rankcss = "q";
      } else if (this.r == 13) {
        this.rank = "K";
        this.rankcss = "k";
      } else if (this.r == null) {
        this.rank = "";
      } else {
        this.rank = String(this.r);
        this.rankcss = this.rank;
      }

      if (v >= 0 && v < 13) {
        this.suit = "diams";
      } else if (v >= 13 && v < 26) {
        this.suit = "hearts";
      } else if (v >= 26 && v < 39) {
        this.suit = "spades";
      } else if (v >= 39 && v < 52) {
        this.suit = "clubs";
      } else {
        this.suit = "";
      }

      if (this.r > 10) {
        this.r = 10
      };
      if (this.r == 1) {
        this.r = 11
      };
    }


  },
  Player: function(s) {
    this.score = 0;
    this.hand = [];
    this.numAces = 0;
    this.refclass = s;

    this.refresh = function() {
    	this.score = 0;
    	this.hand = [];
    	this.numAces = 0;
    }
  },
  shuffle: function(v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  },
  deal: function() {
  	this.clearTable();
  	V.btnDeal.hide();
  	V.btnHit.show();
  	V.btnStand.show();
    for (j = 0; j < 3; j++) {
      //$('#view').append("<br>" + C.model.this.data.deck[j].toString());
      if (j % 2 == 0) {
        this.drawCard(this.data.player);        
      } else {
        this.drawCard(this.data.dealer);        
      }
    }
    this.drawCardBack(this.data.dealer);
  },
  hit: function(p) {  	  	
  	this.drawCard(p);
	if (p.score == 21) {this.stand();}
  	else if (p.score > 21 && !this.hasAce(p)) {this.stand();}
  },
  stand: function() {
  	V.btnHit.hide();
  	V.btnStand.hide();
  	this.showHand(this.data.dealer);
  	this.dealerAI();
  },
  drawCard: function(p) {
  	topCard = this.data.deck.pop();
  	$('#cards .' + p.refclass).append('<li><div class="card rank-' + topCard.rankcss + ' ' + topCard.suit + '"><span class="rank">' + topCard.rank + '</span><span class="suit">&' + topCard.suit + ';</span></div></li>');
  	p.hand.push(topCard);
  	p.score += topCard.r;
	
	if (topCard.rank == "A") {p.numAces += 1;}
  },
  drawCardBack: function(p) {
  	topCard = this.data.deck.pop();
  	$('#cards .' + p.refclass).append('<li><div class="card back"></div></li>');
  	p.hand.push(topCard);
  	p.score += topCard.r;

  	if (topCard.rank == "A") {p.numAces += 1;}
  },
  showHand: function(p) {
  	$('#cards .' + p.refclass).empty();
  	for (i = 0; i < p.hand.length; i++) {
  		topCard = p.hand[i];
  		$('#cards .' + p.refclass).append('<li><div class="card rank-' + topCard.rankcss + ' ' + topCard.suit + '"><span class="rank">' + topCard.rank + '</span><span class="suit">&' + topCard.suit + ';</span></div></li>');
  	}
  },
  hasAce: function(p) {
  	if (p.numAces > 0) {
  		p.numAces--;
  		p.score -= 10;
  		return true;
  	}
  	return false;
  },
  dealerAI: function() {
  	while (this.data.dealer.score < 17) {this.drawCard(this.data.dealer);}
  	this.calcWinner();
  },
  calcWinner: function() {
  	if (this.data.dealer.score > 21) {V.result.html(this.data.dealer.refclass + " busted. " + this.data.player.refclass + " wins!")}
 	else if (this.data.player.score > 21) {V.result.html(this.data.player.refclass + " busted. " + this.data.player.refclass + " loses...")}
  	else if (this.data.dealer.score > this.data.player.score) {V.result.html(this.data.player.refclass + " loses...");}
  	else if (this.data.dealer.score < this.data.player.score) {V.result.html(this.data.player.refclass + " wins!");}
  	else {V.result.html("tie");}
  	V.btnDeal.show();
  },
  clearTable: function() {
  	$('#cards .dealer').empty();
  	$('#cards .player').empty();
  	V.result.empty();
  	this.data.dealer.refresh();
  	this.data.player.refresh();
   	this.data.deck = [];

  	for (j = 0; j < 52; j++) {
	    this.data.deck[j] = new M.Card(j);
	    this.data.deck[j].standardize();
	}

	this.shuffle(this.data.deck);
  }
}

V = {
  btnDeal: $('#deal'),
  btnHit: $('#hit'),
  btnStand: $('#stand'),
  result: $('#result')
}

C = {
  model: M,
  view: V,
  run: function() {
  	this.view.btnHit.hide();
  	this.view.btnStand.hide();
    this.model.Deck(1); 
    this.model.shuffle(this.model.data.deck);
    this.model.data.dealer = new this.model.Player("dealer");
    this.model.data.player = new this.model.Player("player");
  }

}

C.run();
C.view.btnDeal.click(function() {
  C.model.deal();
})
C.view.btnHit.click(function() {
  C.model.hit(C.model.data.player);  
})
C.view.btnStand.click(function() {
  C.model.stand();  
})
