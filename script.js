const popupEdit = document.querySelector('.edit')
const popupAdd = document.querySelector('.add')
const popupCard = document.querySelector('.card')
const profileEditButton = document.querySelector('.profile__edit-button')
const formElement = document.querySelector('.popup__form')
const cardAddButton = document.querySelector('.profile__add-button')
const nameInput = formElement.querySelector('.name_input')    
const jobInput =  formElement.querySelector('.job_input')   
const closeButtons = document.querySelectorAll('.popup__close')
const cardContainer = document.querySelector('.table__list');
const cardForm = document.querySelector('.card-form') 

const titleInput = cardForm.querySelector('.title_input')    
const linkInput =  cardForm.querySelector('.link_input')   

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function popupOpen (popupName) {
    popupName.classList.add('popup_opened')
}

function popupClose (popupName) {
  popupName.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    

    const name = formElement.querySelector('.name_input').value
    const job = formElement.querySelector('.job_input').value
    
   
    const profileName = document.querySelector('.profile__name')
    const profileSubscription = document.querySelector('.profile__subscription')
    
    profileName.textContent = name
    profileSubscription.textContent = job
    
    
     popupClose(popupEdit)
    
    
}

function createCard(cardData) {
  const cardElement = document.querySelector('.table-template').content.cloneNode(true);
  const cardImage = cardElement.querySelector('.table__image')
  const cardName = cardElement.querySelector('.table__title')
  cardElement.querySelector('.table__title').textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  const popupCaption = popupCard.querySelector('.popup__caption')
  const popupImage = popupCard.querySelector('.popup__image')
  cardImage.addEventListener('click', () => {
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardName.textContent;
    popupImage.alt = cardName.textContent;
    popupOpen(popupCard)
  })
  
  cardElement.querySelector('.table__button').addEventListener('click', (evt) => evt.target.classList.toggle('table__button_active'))
  cardElement.querySelector('.table__delete').addEventListener('click', function (evt) {evt.target.closest('.table__element').remove()})
  return cardElement
}

function addCard(cardData, container){
  const card = createCard(cardData);
  container.prepend(card)
}


formElement.addEventListener('submit', formSubmitHandler);


closeButtons.forEach((btn) => btn.addEventListener('click', function(evt) {
    const closeButton = evt.target;
    const popup = closeButton.closest('.popup')
    popupClose(popup)
}))

cardAddButton.addEventListener('click', () => popupOpen(popupAdd))
  
profileEditButton.addEventListener('click', function() {popupOpen(popupEdit)})

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  addCard({name: titleInput.value,
  link: linkInput.value}, cardContainer);
  evt.target.reset();
  popupClose(popupAdd)
})

function generateInitialCards(defaultCardsArray) {
  defaultCardsArray.forEach((cardData) => {
    addCard(cardData, cardContainer);
  });
}
generateInitialCards(initialCards);