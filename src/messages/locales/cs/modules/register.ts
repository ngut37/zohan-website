import { MessageObject } from '../../../types';

export const registerMessages: MessageObject = {
  /* HEADING */
  'register.heading': 'Registrace',
  'register.sub_heading': 'Rychle, jednoduše a zdarma.',

  /* INPUT LABELS */
  'register.input.name.label': 'Jméno',
  'register.input.email.label': 'Emailová adresa',
  'register.input.password.label': 'Heslo',
  'register.input.password_confirm.label': 'Heslo znovu',
  'register.input.gender.label': 'Pohlaví',
  'register.input.birth_year.label': 'Rok narození',

  /* INPUT PLACEHOLDERS */
  'register.input.first_name.placeholder': 'Křesní',
  'register.input.last_name.placeholder': 'Příjmení',
  'register.input.email.placeholder': 'E-mailová adresa',
  'register.input.password.placeholder': 'Heslo',
  'register.input.password_confirm.placeholder': 'Heslo znovu',

  /* ERRORS */
  'register.input.name.error.min': `Jméno musí obsahovat nejméně {length} {length, plural, 
    one {znak}
    few {znaky}
    other {znaků}
  }`,
  'register.input.name.error.max': `Jméno přesahuje maximální délku {length} {length, plural, 
      one {znak}
      few {znaky}
      other {znaků}
    }`,
  'register.input.first_name.error.required': 'Doplňte prosím křesní jméno',
  'register.input.last_name.error.required': 'Doplňte prosím přijmení',
  'register.input.email.error.format':
    'E-mailová adresa není ve správném tvaru',
  'register.input.email.error.required': 'E-mailová adresa nemůže být prázdná',
  'register.input.email.error.conflict':
    'Učet s touto e-mailovou adresou již existuje',
  'register.input.password.error.required': 'Heslo nemůžse být prázdné',
  'register.input.password.error.min': 'Heslo musí obsahovat nejméně 6 znaků',
  'register.input.password.error.max': 'Heslo je příliš dlouhé',
  'register.input.password_confirm.error.match': 'Zadaná hesla nesouhlasí',
  'register.input.gender.error.required': 'Heslo nemůžse být prázdné',
  'register.input.birth_year.error.min':
    'Rok narození nesmí být starší než 1900',
  'register.input.birth_year.error.max':
    'Rok narození nesmí být po {maxBirthYear}',
  'register.error.general': 'Při registraci došlo k chybě',

  /* BUTTONS */
  'register.input.button': 'Registrovat se',

  /* LINKS */
  'register.link.login': 'Už máš účet? Přejdi na přihlašování.',
};
