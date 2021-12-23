/* global data */
/* exported data */
var photoUrl = document.querySelector('#url-entry');
var imgOnScreen = document.querySelector('img');

function urlHandler(event) {

  imgOnScreen.setAttribute('src', event.target.value);
}

photoUrl.addEventListener('input', urlHandler);

var submitForm = document.querySelector('#entry-form');
var inputs = submitForm.elements;
var titleValue = inputs.title.value;
var urlValue = inputs.url.value;
var notesValue = inputs.notes.value;

function submitHandler(event) {
  event.preventDefault();
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

function generateEntriesDOMTree(entries) {
  var $liElement = document.createElement('li');
  $liElement.className = 'row';

  var $divColImg = document.createElement('div');
  $divColImg.className = 'column-half img-4-entries';

  var $img4Entry = document.createElement('img');
  $img4Entry.setAttribute('src', entries.urlValue);

  $liElement.appendChild($divColImg);
  $divColImg.appendChild($img4Entry);

  var $divColEntriesInfo = document.createElement('div');
  $divColEntriesInfo.className = 'column-half entries-info';

  $liElement.appendChild($divColEntriesInfo);

  var $h2EntryElement = document.createElement('h2');
  var $entryTitle = document.createTextNode(entries.titleValue);
  $h2EntryElement.appendChild($entryTitle);
  $divColEntriesInfo.appendChild($h2EntryElement);

  var $pEntryElement = document.createElement('p');
  var $pEntryText = document.createTextNode(entries.notesValue);

  $pEntryElement.appendChild($pEntryText);
  $divColEntriesInfo.appendChild($pEntryElement);

  return $liElement;
}

var $ulEntries = document.querySelector('#entries-list');

function domContentLoadedHandle(event) {

  for (var i = 0; i < data.entries.length; i++) {
    var $EntriesList = generateEntriesDOMTree(data.entries[i]);
    $ulEntries.appendChild($EntriesList);
  }
}

document.addEventListener('DOMContentLoaded', domContentLoadedHandle);
