import { validateAddress } from './validate-address';

describe('parse address', () => {
  it('should provide a validate method', () => {
    const address = validateAddress('Domgasse 5');
    expect(address).toEqual({ street: 'Domgasse', streetNumber: '5' });
  });

  it('should validate a German address format with city and zip', () => {
    const address = validateAddress('Domgasse 5, 1010 Wien');
    expect(address).toEqual({
      street: 'Domgasse',
      streetNumber: '5',
      city: 'Wien',
      zip: '1010'
    });
  });

  it('should validate cities with spaces', () => {
    const address = validateAddress('Domgasse 5, 2700 Wiener Neustadt');
    expect(address).toMatchObject({ city: 'Wiener Neustadt' });
  });
});
