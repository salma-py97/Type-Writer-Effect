// Constructor function with a method called type that does everything, we are gonna initialize it and after that we are gonna change it to an ES6 class

const TypeWriter = function (txtElement, words, wait = 1500) {
  this.txtElement = txtElement
  this.words = words // the list of words in data-words in html
  this.txt = "" // this represents is whatever is currently displaying
  this.wordIndex=0 // we also need the index of the word to know which word we are on, the words are going to be in a format of an array, that's what we used in data-words in the html, by default we are gonna be on the first word
  this.wait = parseInt(wait, 10) // we are set this the its default value but we need to make sure that it is an integer
  this.type() // this is the method that's gonna be doing everything
  this.isDeleting = false // isDeleting is gonna show if we are deleting the word or not. We need to delete before we write the next word

}

// Type method
TypeWriter.prototype.type = function () {
  // GET THE CURRENT INDEX OF THE WORD
  let current = this.wordIndex % this.words.length
  // 0 divided by 3, the rest is 0
  // 1 divided by 3, the rest is 1
  // 2 divided by 3, the rest is 2
  // 3 divided by 3, the rest is 0

  // get full text of the current word
  const fullTxt = this.words[current]

  // check if deleting is true
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1)
    // whatever the txt length is, we are gonna remove 1 from it



  } else {
    // Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1)
    // whatever the txt length is, we are gonna add 1 to it
    // when it starts the length is 0 because in the constructo txt = ''
    
  }

  // output whatever is in this.txt int the html element which is the span with txt-type class whoch we set to txtElement
  this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`


  // Initial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2   // typeSpeed = typeSpeed /2 = 150ms
  }

  // check if the word is complete, we can do that by matching whatever is in this.txt with one of the word in the words array which is fullTxt
  if (!this.isDeleting && this.txt === fullTxt) {
    // Set typeSpeed to whatever the wait value is, because we want it to pause and it finishes a word before getting to the next word
    typeSpeed = this.wait

    // set isDeleting to true
    this.isDeleting = true

  } else if (this.isDeleting && this.txt === "") {
    // after it completely deletes the word, 
    // set isDeleting back to false
    this.isDeleting = false
    
    
    // we need to change the index, move to the next word
    this.wordIndex++

    // Pause before start typing
    typeSpeed = 400

  }




  // we want to type a new letter every 500ms so we need to use setTimeout() which takes in a callback function and a period of time. Every 500ms we are gonna run type()

  setTimeout(() => this.type(), typeSpeed)
}


// init on DOM load
document.addEventListener('DOMContentLoaded', init)

// init function that will init our app
function init () {
  // we need to grab the span and the attributes data-words data-wait
  const txtElement = document.querySelector('.txt-type')

  // we need to parse the words array because for now it is just a string by using JSON.parse()
  const words = JSON.parse(txtElement.getAttribute('data-words'))

  const wait = txtElement.getAttribute('data-wait')

  // init TypeWriter construction function
  new TypeWriter(txtElement, words, wait)
}