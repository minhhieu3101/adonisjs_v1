import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const messages = {
  string: 'The {{ field }} field must be a string',
  email: 'The {{ field }} field must be a valid email address',
  regex: 'The {{ field }} field format is invalid',
  url: 'The {{ field }} field must be a valid URL',
  activeUrl: 'The {{ field }} field must be a valid URL',
  alpha: 'The {{ field }} field must contain only letters',
  alphaNumeric: 'The {{ field }} field must contain only letters and numbers',
  minLength: 'The {{ field }} field must have at least {{ min }} characters',
  maxLength: 'The {{ field }} field must not be greater than {{ max }} characters',
  fixedLength: 'The {{ field }} field must be {{ size }} characters long',
  confirmed: 'The {{ field }} field and {{ otherField }} field must be the same',
  endsWith: 'The {{ field }} field must end with {{ substring }}',
  startsWith: 'The {{ field }} field must start with {{ substring }}',
  sameAs: 'The {{ field }} field and {{ otherField }} field must be the same',
  notSameAs: 'The {{ field }} field and {{ otherField }} field must be different',
  in: 'The selected {{ field }} is invalid',
  notIn: 'The selected {{ field }} is invalid',
  ipAddress: 'The {{ field }} field must be a valid IP address',
  uuid: 'The {{ field }} field must be a valid UUID',
  ascii: 'The {{ field }} field must only contain ASCII characters',
  creditCard: 'The {{ field }} field must be a valid {{ providersList }} card number',
  hexCode: 'The {{ field }} field must be a valid hex color code',
  iban: 'The {{ field }} field must be a valid IBAN number',
  jwt: 'The {{ field }} field must be a valid JWT token',
  coordinates: 'The {{ field }} field must contain latitude and longitude coordinates',
  mobile: 'The {{ field }} field must be a valid mobile phone number',
  passport: 'The {{ field }} field must be a valid passport number',
  postalCode: 'The {{ field }} field must be a valid postal code',
}

vine.messagesProvider = new SimpleMessagesProvider(messages)
