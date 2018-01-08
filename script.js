$(document).ready(function(){


	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};


	function initSortable() {
		//sortowanie za pomoca metody przeciagnij i upusc:
		$('.column-card-list').sortable({
			//obiekt konfguracyjny:
			connectWith: '.column-card-list',//wybieranie listy wktorej dziala sortowanie
			placeholder: 'card-placeholder'//trzyma nazwe klasy po najechaniu na puste pole
		}).disableSelection();//usuwa mozliwosc zaznaczania tekstu
	};




	function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

	function Column(name) {
		var self = this; //zeby nie bylo konfliktow

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn(){
			//kod do tworzenia kolumny
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelate = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');			
			
			//dodawanie zdarzen/eventow:
			$columnDelate.click(function() {
				self.removeColumn();
			});

			//dodawanie tekst po kliknięciu w button:
			$columnAddCard.click(function(){
				self.addCard(new Card(prompt("Enter the name of the card")));
			});

			//buduje elementy kolumn:
			$column.append($columnTitle)
			       .append($columnDelate)
			       .append($columnAddCard)
			       .append($columnCardList);

			//zwraca stworzona kolumne:
			return $column;
			};


	};

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);	
		},
		removeColumn: function() {
			this.$element.remove();
		},
		
	},


		//zdarzenie kliknęcia obsl dodawanie nowej kolumny do tablicy:
		$('.create-column')
		.click(function(){
			var name = prompt('Enter a column name');
			var column = new Column(name);
			board.addColumn(column);
		});	
		

	function Card(description) {
			var self = this;

			this.id = randomString();
			this.description = description;
			this.$element = createCard();

				//tworzenie elementow karty:
	function createCard() {
		// tworzy bloki
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelate = $('<button>').addClass('btn-delate').text('x');
	
		//wiaze po kliknieciu eventy:
		$cardDelate.click(function(){
			self.removeCard();
		});

		//laczy bloki i zwraca karty:
		
		$card.append($cardDelate)
			 .append($cardDescription);

		return $card;
	}
	}

	Card.prototype = {
		removeCard: function(){
			this.$element.remove();
		}
	}


// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);

});