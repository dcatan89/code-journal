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

  if (data.editing === null) {
    var entryValues = {
      titleValue,
      urlValue,
      notesValue,
      entryId: data.nextEntryId
    };
    data.entries.unshift(entryValues);
    data.nextEntryId++;
  }

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing) {
      entryValues = {
        titleValue,
        urlValue,
        notesValue,
        entryId: data.entries[i].entryId
      };

      var $li = document.querySelectorAll('li');
      var editValues = data.entries.splice(i, 1, entryValues);
      var editEntry = generateEntriesDOMTree(editValues[i]);
      $li[i].replaceWith(editEntry);
      data.editing = null;
    }
  }

  submitForm.reset();
  imgOnScreen.setAttribute('src', 'images/placeholder-image-square.jpg');
  $ulEntries.prepend(generateEntriesDOMTree(entryValues));
  dataView('entries');
}

submitForm.addEventListener('submit', submitHandler);

function generateEntriesDOMTree(entries) {
  var $liElement = document.createElement('li');
  $liElement.setAttribute('data-entry-id', entries.entryId);
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
  $editIcon.setAttribute('data-entry-id', entries.entryId);
  $divForEditIcon.className = ' edit-img';
  $editIcon.classList.add('edit-icon');
  $editIcon.setAttribute('src', 'images/pencil.png');
  $editIcon.setAttribute('data-view', 'entry-form');
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
  data.editing = null;
  editEntryH1.textContent = 'New Entry';
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
var editEntryH1 = document.querySelector('.new-entry-h1');
function editClick(event) {
  var viewName = event.target.getAttribute('data-view');
  var editEntryH1 = document.querySelector('.new-entry-h1');
  if (event.target.matches('.edit-icon')) {
    dataView(viewName);
    editEntryH1.textContent = 'Edit Entry';
    data.editing = parseInt(event.target.getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].entryId) {
        submitForm.elements.title.value = data.entries[i].titleValue;
        submitForm.elements.url.value = data.entries[i].urlValue;
        submitForm.elements.notes.value = data.entries[i].notesValue;
        data.entries.entryId = data.entries[i].entryId;
        imgOnScreen.setAttribute('src', data.entries[i].urlValue);
      }
    }
  }
}

$ulEntries.addEventListener('click', editClick);
