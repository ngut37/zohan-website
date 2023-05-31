import { MessageObject } from '../../../types';

export const venueDetailMessages: MessageObject = {
  // VENUE DETAIL
  'venue_detail.create_booking.disabled':
    'Pro vytvoření rezervace se prosím přihlašte.',

  // CREATE BOOKING
  // drawer
  'venue_detail.create_booking.drawer.title':
    'Vytvořit rezervaci - {venueAddress}',

  // form errors
  'venue_detail.create_booking.input.venue.error.required':
    'Vyberte prosím pobočku',
  'venue_detail.create_booking.input.staff.error.required':
    'Vyberte prosím pracovníka',
  'venue_detail.create_booking.input.service.error.required':
    'Vyberte prosím službu',
  'venue_detail.create_booking.input.start.error.required':
    'Zadejte prosím začátek rezervace',
  'venue_detail.create_booking.input.start.error.invalid':
    'Zadejte prosím platný začátek rezervace',
  'venue_detail.booking_create_form.filter.input.service_type.no_available_slots':
    'Pro tento typ služby nejsou žádné termíny k dispozici',

  // labels
  'venue_detail.booking_create_form.filter.input.service_type.label':
    'Typ služby',
  'venue_detail.booking_create_form.filter.input.staff.label':
    'Vyberte pracovníka',
  'venue_detail.booking_create_form.filter.input.date_picker.label':
    'Vyberte datum',
  'venue_detail.booking_create_form.filter.input.slot_picker.label':
    'Vyberte čas',
  'venue_detail.booking_create_form.filter.input.slot_picker.loading':
    'Načítám volné termíny...',

  // placeholders
  'venue_detail.booking_create_form.filter.input.service_type.placeholder':
    'Vyberte typ služby',

  // CONFIRMATION MODAL
  'venue_detail.booking_confirmation_modal.title': 'Rezervace vytvořena!',
  'venue_detail.booking_confirmation_modal.subtitle':
    'Vaše rezervace byla úspěšně vytvořena.',
  'venue_detail.booking_confirmation_modal.description':
    'Váš termín je potvrzený a níže najdete rekapitulaci rezervace:',
};
