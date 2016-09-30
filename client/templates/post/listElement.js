var elementDesc = {
  "place": "장소",
  "playDates": "공연시간",
  "price": "입장권",
  "duration": "소요시간",
  "contact": "문의",
  "ageGrade": "관람연령",
  "sponsor": "주최",
  "production": "제작",
  "director": "연출",
  "original": "작",
  "cast": "출연",
  "arrange": "각색",
  "description": "작품소개",
  "synopsis": "시놉시스",
  "staffs": "스태프",
};


Template.listElement.created = function() {
  
};


Template.listElement.rendered = function() {
	// console.log("LISTELEMENT - RENDERED");
	// var li = this.find('[name=list]');
	// console.log(li);
	// // console.log(li.id);

	// var tit_p = this.find('#tit');
	// tit_p.innerHTML = elementDesc[li.id];
	// // return "hallo";
	// // console.log(this.find('li').id);
	// // console.log(elementDesc[this.find('li').id]);
	// // return elementDesc[this.find('li').id];

};


Template.listElement.helpers({
	// getTitle: function() {
	// 	console.log("LISTELEMENT - GETTITLE()");
	// 	var li = document.getElementsByTagName('li');
	// 	console.log(li);
	// 	console.log(li.id);
	// 	return li.id;
	// 	// return "hallo";
	// 	// console.log(this.find('li').id);
	// 	// console.log(elementDesc[this.find('li').id]);
	// 	// return elementDesc[this.find('li').id];
	// }

});

Template.listElement.events({

});