const popupEdit = document.querySelector('.edit')
const popupAdd = document.querySelector('.add')
const popupCard = document.querySelector('.card')

function popupOpen (popupName) {
    popupName.classList.add('popup_opened')
}

function popupClose (popupName) {
  popupName.classList.remove('popup_opened')
}

const profileEditButton = document.querySelector('.profile__edit-button')
profileEditButton.addEventListener('click', function() {popupOpen(popupEdit)})



const cardAddButton = document.querySelector('.profile__add-button')
cardAddButton.addEventListener('click', () => popupOpen(popupAdd))

// Находим форму в DOM
const formElement = document.querySelector('.popup__form') 
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.name_input')    // Воспользуйтесь инструментом .querySelector()
const jobInput =  formElement.querySelector('.job_input')     // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    const nameInput = formElement.querySelector('.name_input')  
    const jobInput =  formElement.querySelector('.job_input')


    const name = formElement.querySelector('.name_input').value
    const job = formElement.querySelector('.job_input').value
    
   
    const profileName = document.querySelector('.profile__name')
    const profileSubscription = document.querySelector('.profile__subscription')
    
    profileName.textContent = name
    profileSubscription.textContent = job
    
    
     popupClose(popupEdit)
    
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const closeButton = document.querySelectorAll('.popup__close')
closeButton.forEach((btn) => btn.addEventListener('click', function(evt) {
    const closeButton = evt.target;
    const popup = closeButton.closest('.popup')
    popup.classList.remove('popup_opened')
}))

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
  
  
  
  
  const cardContainer = document.querySelector('.table__list');

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

function generateInitialCards(defaultCardsArray) {
  defaultCardsArray.forEach((cardData) => {
    addCard(cardData, cardContainer);
  });
}

generateInitialCards(initialCards);

// Находим форму в DOM
const cardForm = document.querySelector('.card-form') 
// Находим поля формы в DOM
const titleInput = cardForm.querySelector('.title_input')    // Воспользуйтесь инструментом .querySelector()
const linkInput =  cardForm.querySelector('.link_input')     // Воспользуйтесь инструментом .querySelector()

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  addCard({name: titleInput.value,
  link: linkInput.value}, cardContainer);
  evt.target.reset();
  popupClose(popupAdd)
})

