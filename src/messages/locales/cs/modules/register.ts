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
  'register.input.phone_number.label': 'Telefonní číslo',

  /* INPUT PLACEHOLDERS */
  'register.input.name.placeholder': 'např. Jan Novák',
  'register.input.email.placeholder': 'vas@email.cz',
  'register.input.password.placeholder': 'Heslo',
  'register.input.password_confirm.placeholder': 'Potvrďte heslo',

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
  'register.input.name.error.required': 'Doplňte prosím své jméno',
  'register.input.last_name.error.required': 'Doplňte prosím přijmení',
  'register.input.email.error.format':
    'E-mailová adresa není ve správném tvaru',
  'register.input.email.error.required': 'E-mailová adresa nemůže být prázdná',
  'register.input.email.error.conflict':
    'Učet s touto e-mailovou adresou již existuje',
  'register.input.password.error.required': 'Heslo nemůžse být prázdné',
  'register.input.password.error.min': 'Heslo musí obsahovat nejméně 6 znaků',
  'register.input.password.error.max': 'Heslo je příliš dlouhé',
  'register.input.password.error.format':
    'Heslo musí obsahovat alespoň jedno velké písmeno, jedno malé písmeno a jednu číslici',
  'register.input.password_confirm.error.match': 'Zadaná hesla nesouhlasí',
  'register.input.phone_number.error.format': 'Zadejte platné číslo',

  'register.error.general': 'Při registraci došlo k chybě',

  /* BUTTONS */
  'register.button.o_auth.google': 'Google',
  'register.button.o_auth.facebook': 'Facebook',

  /* LINKS */
  'register.link.login': 'Už máte účet? Přejděte na přihlašování.',

  /* TOASTS */
  'register.toast.verify_email': 'Na váš email byl odeslán ověřovací odkaz.',
};
