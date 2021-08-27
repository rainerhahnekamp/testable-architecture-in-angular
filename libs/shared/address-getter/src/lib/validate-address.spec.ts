import { validateAddress } from './validate-address';

describe('parse address', () => {
  it('should fail if city and zip are not given', () => {
    const address = validateAddress('Domgasse 5');
    expect(address).toEqual({ address: true });
  });

  it('should validate a German address format with city and zip', () => {
    const address = validateAddress('Domgasse 5, 1010 Wien');
    expect(address).toEqual({});
  });

  it('should validate cities with spaces', () => {
    expect(validateAddress('Domgasse 5, 2700 Wiener Neustadt')).toEqual({});
  });
});
