export const visaFormat = (input: any) => {
  // Remove all non-numeric characters
  const cleanedInput = input.replace(/\D/g, '');

  // Apply the credit card format (XXXX-XXXX-XXXX-XXXX)
  let formattedInput = '';
  for (let i = 0; i < cleanedInput.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedInput += ' - ';
    }
    formattedInput += cleanedInput.charAt(i);
  }
  return formattedInput;
};

export const maskCreditCard = (creditCardNumber: string): string => {
  // Remove all non-numeric characters
  const cleanedInput = creditCardNumber.replace(/\D/g, '');

  // Check if the cleaned input is at least 4 characters long
  if (cleanedInput.length < 4) {
    return cleanedInput; // No need to mask if it's less than 4 digits
  }

  // Mask all digits except the last 4
  const maskedInput =
    cleanedInput.slice(0, 4) + ' **** **** ' + cleanedInput.slice(-4);

  return maskedInput;
};
