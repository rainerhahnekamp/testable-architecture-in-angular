/**
 * VR is done via storybook. Run following commands in sequential order:
 * - `npm run storybook:static`
 * - `npm run test:vr`
 */

describe('Holidays visual regression test', () => {
  it.each([
    'default',
    'minimal',
    'overflown',
    'sold-out',
    'empty',
    'tiny-image',
    'on-sale',
    'sale-and-sold'
  ])('should do visual regression for holidays - %s', async (story) => {
    await page.goto(`http://localhost:8080/iframe.html?id=eternal-holidaycard--${story}`, {
      waitUntil: 'networkidle2'
    });
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
