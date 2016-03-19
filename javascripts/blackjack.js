var M = {},
  V = {},
  C = {};


M = {
  data: {

  },
  Deck: function(n) {
    numDecks = n;
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
  Player: function() {
    this.score = 0;
    this.hand = [];
  },
  shuffle: function(v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  },
  deal: function() {
    for (j = 0; j < 3; j++) {
      //$('#view').append("<br>" + C.model.this.data.deck[j].toString());
      topCard = this.data.deck.pop();
      if (j % 2 == 0) {
        $('#cards .player').append('<li><div class="card rank-' + topCard.rankcss + ' ' + topCard.suit + '"><span class="rank">' + topCard.rank + '</span><span class="suit">&' + topCard.suit + ';</span></div></li>');
        this.data.player.hand.push(topCard);
        this.data.player.score += topCard.r;
        console.log(this.data.player.score);
      } else {
        $('#cards .dealer').append('<li><div class="card rank-' + topCard.rankcss + ' ' + topCard.suit + '"><span class="rank">' + topCard.rank + '</span><span class="suit">&' + topCard.suit + ';</span></div></li>');
        this.data.dealer.hand.push(topCard);
        this.data.dealer.score += topCard.r;
        console.log(this.data.dealer.score);
      }
    }
    $('#cards .dealer').append('<li><div class="card back"></div></li>');
    topCard = this.data.deck.pop();
    this.data.dealer.hand.push(topCard);
    this.data.dealer.score += topCard.r;
    console.log(this.data.dealer.score);
  },
  hit: function() {},
  stand: function() {},
}

V = {
  btnDeal: $('#deal'),
  btnHit: $('#hit'),
  btnStand: $('#stand')
}

C = {
  model: M,
  view: V,
  run: function() {
    this.model.Deck(1);
    this.model.shuffle(this.model.data.deck);
    this.model.data.dealer = new this.model.Player();
    this.model.data.player = new this.model.Player();
  }

}

C.run();
C.view.btnDeal.click(function() {
  C.view.btnDeal.hide();
  C.model.deal();
  console.log(C.model.data.dealer);
})
