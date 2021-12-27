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
  $ulEntries.prepend(generateEntriesDOMTree(entryValues));
  dataView('entries');
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
  dataView(data.view);
}

window.addEventListener('DOMContentLoaded', domContentLoadedHandle);

var $view = document.querySelectorAll('.view');
var $entriesAnchor = document.querySelector('.entries-anchor');
var $noEntries = document.querySelector('.no-entries');
var $newButton = document.querySelector('.new-button');

function viewSwapEntries(event) {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  }
  var $dataViewEntries = event.target.getAttribute('data-view');
  for (var i = 0; i < $view.length; i++) {

    if ($dataViewEntries === $view[i].getAttribute('data-view')) {
      dataView($dataViewEntries);
    }
    var $viewEntryForm = event.target.getAttribute('data-view');
    for (i = 0; i < $view.length; i++) {

      if ($viewEntryForm === $view[i].getAttribute('data-view')) {
        dataView($viewEntryForm);
      }
    }
  }

}
$newButton.addEventListener('click', viewSwapEntries);
$entriesAnchor.addEventListener('click', viewSwapEntries);

function dataView(string) {
  data.view = string;
  if (data.entries.length !== 0) {
    $noEntries.classList.add('hidden');
  }
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }

}
