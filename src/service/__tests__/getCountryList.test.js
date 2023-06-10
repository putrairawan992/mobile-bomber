/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { CountryService } = require('../CountryService');

describe('should fire getCountryList', () => {
  it('Mocking and returning correct data', async () => {
    const result = await CountryService.getCountryList('ind');
    expect(Array.isArray(result)).toBe(true);
  }, 30000);
});
