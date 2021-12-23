/* global data */
/* exported data */
var photoUrl = document.querySelector('#url-entry');
var imgOnScreen = document.querySelector('img');

function urlHandler(event) {

  imgOnScreen.setAttribute('src', event.target.value);
}

photoUrl.addEventListener('input', urlHandler);

var submitForm = document.querySelector('#entry-form');

function submitHandler(event) {
  event.preventDefault();
  var inputs = submitForm.elements;
  var titleValue = inputs.title.value;
  var urlValue = inputs.url.value;
  var notesValue = inputs.notes.value;
  var entryValues = {
    titleValue,
    urlValue,
    notesValue
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  submitForm.reset();
  imgOnScreen.setAttribute('src', 'images/placeholder-image-square.jpg');
}

submitForm.addEventListener('submit', submitHandler);
