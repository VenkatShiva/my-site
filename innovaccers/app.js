function Book(name) {
  this.name = name;
}
Book.prototype.getName = function () {
  console.log(this.name);
};

function Magagine(name, month){
  Book.call(this, name);
  this.month = month;
}

Magagine.prototype = Object.create(Book.prototype);

// Magagine.prototype.constructor = Magagine;