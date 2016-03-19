var M = {},
  V = {},
  C = {};


M = {
  Deck: function(n) {
    this.numDecks = n;
    this.cardArray = [];

    for (i = 0; i < n; i++) {
      for (j = 0; j < 52; j++) {
        this.cardArray[j] = new M.Card(j);
        this.cardArray[j].standardize();
      }
    }
  },
  Card: function(v) {
    this.rank = "";
    this.rankcss = "";
    this.suit = "";

    r = v % 13 + 1

    this.standardize = function() {

      if (r == 1) {
        this.rank = "A";
        this.rankcss = "a";
      } else if (r == 11) {
        this.rank = "J";
        this.rankcss = "j";
      } else if (r == 12) {
        this.rank = "Q";
        this.rankcss = "q";
      } else if (r == 13) {
        this.rank = "K";
        this.rankcss = "k";
      } else if (r == null) {
        this.rank = "";
      } else {
        this.rank = String(r);
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
    }
  },
  shuffle: function(v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  },
  deal: function(d) {},
  hit: function(c) {},
  stand: function() {}
}

V = {

}

C = {
  model: M,
  view: V,
  run: function() {
    this.model.Deck(1);
    this.model.shuffle(this.model.cardArray);
  }
}

C.run();
console.log(C.model.cardArray[0].suit);
console.log(C);

for (j = 0; j < 2; j++) {
  //$('#view').append("<br>" + C.model.cardArray[j].toString());
  $('#cards .player').append('<li><div class="card rank-' + C.model.cardArray[j].rank + ' ' + C.model.cardArray[j].suit + '"><span class="rank">' + C.model.cardArray[j].rank + '</span><span class="suit">&' + C.model.cardArray[j].suit + ';</span></div></li>');
}
