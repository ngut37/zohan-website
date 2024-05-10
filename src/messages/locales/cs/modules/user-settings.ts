import { MessageObject } from '../../../types';

export const userSettingsMessages: MessageObject = {
  // TABS
  'user_settings.tab.basic_info': 'Základní informace',
  'user_settings.tab.password': 'Změna hesla',
  'user_settings.tab.bookings': 'Rezervace',
  'user_settings.tab.active': 'Aktivní',
  'user_settings.tab.historic': 'Historické',

  // BASIC INFO TAB
  // labels
  'user_settings.basic_info.input.name.label': 'Jméno',
  'user_settings.basic_info.input.email.label': 'Email',
  'user_settings.basic_info.input.phone_number.label': 'Telefonní číslo',

  // placeholders
  'user_settings.basic_info.input.name.placeholder': 'např. Jan Novák',
  'user_settings.basic_info.input.email.placeholder': 'zadejte email',
  'user_settings.basic_info.input.phone_number.placeholder': 'zadejte telefon',

  // toasts
  'user_settings.basic_info.toast.success': 'Změny byly uloženy',
  'user_settings.basic_info.toast.success_and_verify_email':
    'Změny byly uloženy, potvrďte svůj nový emailovou adresu',

  // errors
  'user_settings.basic_info.input.name.error.min': `Jméno musí obsahovat nejméně {length} {length, plural, 
    one {znak}
    few {znaky}
    other {znaků}
    }`,
  'user_settings.basic_info.input.name.error.max': `Jméno přesahuje maximální délku {length} {length, plural, 
    one {znak}
    few {znaky}
    other {znaků}
    }`,
  'user_settings.basic_info.input.name.error.required':
    'Doplňte prosím své jméno',
  'user_settings.basic_info.input.email.error.format':
    'E-mailová adresa není ve správném tvaru',
  'user_settings.basic_info.input.email.error.required':
    'E-mailová adresa nemůže být prázdná',
  'user_settings.basic_info.input.phone_number.error.format':
    'Zadejte platné číslo',

  // PASSWORD TAB
  // labels
  'user_settings.change_password.input.old_password.label': 'Stávající heslo',
  'user_settings.change_password.input.new_password.label': 'Nové heslo',

  // placeholders
  'user_settings.change_password.input.old_password.placeholder':
    'Zadejte heslo',
  'user_settings.change_password.input.new_password.placeholder':
    'Zadejte nové heslo',
  'user_settings.change_password.input.new_password_confirm.placeholder':
    'Zadejte nové heslo znovu',

  // toasts
  'user_settings.change_password.toast.success': 'Nové heslo bylo uloženo',

  // errors
  'user_settings.change_password.input.old_password.error.invalid':
    'Zadané heslo není správné',
  'user_settings.change_password.input.old_password.error.required':
    'Zadejte heslo',
  'user_settings.change_password.input.new_password.error.min':
    'Heslo je příliš krátké',
  'user_settings.change_password.input.new_password.error.max':
    'Heslo je příliš dlouhé',
  'user_settings.change_password.input.new_password.error.required':
    'Zadejte heslo',
  'user_settings.change_password.input.new_password_confirm.error.match':
    'Zadaná hesla nesouhlasí',
};
