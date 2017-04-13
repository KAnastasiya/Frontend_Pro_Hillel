import { $ } from './js/jQueryMock';
import './style.scss';

const onEvenItemClick = event => $(event.target).toggleClass((index) => `even_${index}`);
const onEvenItemClick_1 = event => console.log('Even items clicked');

const onItemClick = event => {
  $(event.target).toggleClass('is-clicked');
  $('#even').on('click', onEvenItemClick_1);
  $('.btn--remove')
    .attr('disabled', null)
    .attr({
      'type': 'button',
      'textContent': event.data.name
    })
    .on('click', onBtnClick);
}

const onBtnClick = event => {
  $(event.target).attr('disabled', true);
  $('li').removeClass('is-clicked')
  $('#even').off('click', onEvenItemClick);
  // $('#even').off('click');
  // $('#even').off();
  // $('ul').off('click');
}

$('ul')
  .on('click', 'li', {name: 'Remove listeners'}, onItemClick)
  .find('.list__item')
  .each((index, elem) => elem.textContent = `${elem.textContent}_${index}`)
  .attr('id', (index) => index % 2 ? 'odd' : 'even')
  .find( $('#even') )
  .on('click', onEvenItemClick);
