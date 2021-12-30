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

var dataEntryId = 1;

function generateEntriesDOMTree(entries) {
  var $liElement = document.createElement('li');
  $liElement.setAttribute('data-entry-id', dataEntryId);
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
  var $editIcon = document.createElement('img');
  var $entryTitle = document.createTextNode(entries.titleValue);
  var $divRowContainsH2 = document.createElement('div');
  var $divForH2 = document.createElement('div');
  var $divForEditIcon = document.createElement('div');
  $divForEditIcon.setAttribute('data-entry-id', dataEntryId);
  $divForEditIcon.className = ' edit-img';
  $editIcon.classList.add('edit-icon');
  $editIcon.setAttribute('src', 'images/pencil.png');
  $editIcon.setAttribute('data-view', 'edit-entry');
  $divRowContainsH2.className = 'row h2-edit-section';
  $divForH2.appendChild($h2EntryElement);
  $h2EntryElement.appendChild($entryTitle);
  $divColEntriesInfo.appendChild($divRowContainsH2);
  $divForEditIcon.appendChild($editIcon);
  $divRowContainsH2.appendChild($divForH2);
  $divRowContainsH2.appendChild($divForEditIcon);

  var $pEntryElement = document.createElement('p');
  var $pEntryText = document.createTextNode(entries.notesValue);

  $pEntryElement.appendChild($pEntryText);
  $divColEntriesInfo.appendChild($pEntryElement);
  dataEntryId++;

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

function handleViewSwap(event) {
  var viewName = event.target.getAttribute('data-view');
  dataView(viewName);
}

$newButton.addEventListener('click', handleViewSwap);
$entriesAnchor.addEventListener('click', handleViewSwap);

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
$ulEntries.addEventListener('click', handleViewSwap);
