import { MessageObject } from '../../types';

export const globalMessages: MessageObject = {
  brand_name: 'ZOHAN',
  lorem: 'The quick brown fox jumps over the lazy dog.',

  // GENDERS
  'gender.male': 'Muž',
  'gender.female': 'Žena',
  'gender.other': 'Jiné',

  // UNITS
  'unit.minutes':
    '{minutes} {minutes, plural, one {minuta} few {minuty} other {minut}}',
  'unit.czech_crowns': '{crowns} Kč',

  // COMMON WORDS
  'countable.next': `{count} {count, plural, 
        one {další}
        few {další}
        other {dalších}
      }`,
  'word.services': 'Služby',
  'word.price': 'Cena',
  'word.duration': 'Délka',

  google: 'Google',
  facebook: 'Facebook',

  // ERRORS
  'error.api': 'Došlo k chybě, zkuste to prosím později',

  // BUTTONS
  'button.back': 'zpět',
  'button.close': 'zavřít',
  'button.filter': 'filtrovat',
  'button.book': 'rezervovat',
  'button.show': 'zobrazit',
  'button.save': 'uložit',
  'button.hide': 'skrýt',
  'button.login': 'přihlásit se',
  'button.register': 'registrovat se',
  'button.try': 'vyzkoušet',
  'button.reset_filter': 'smazat filtry',
  'button.create_booking': 'vytvořit rezervaci',
  'button.confirm_booking': 'potvrdit rezervaci',
  'button.understood': 'rozumím',
  'button.look_up_services': 'vyhledat služby',
};
