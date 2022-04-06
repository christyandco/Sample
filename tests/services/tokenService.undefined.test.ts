/**
 * @jest-environment node
 */
 
import tokenService from '@services/tokenService';

describe('Token Service with window undefined', () => {
  it('Check the refresh with window undefined.', () => {
      tokenService.refresh();
  });

  it('Check Platform service method with document as undefined', () => {
    //let temp = window.document;
    //jest.spyOn(window,'document','get').mockReturnValue(undefined);
    const platformContext = tokenService.getPlatformContext();
    expect(platformContext.auth_token).toBe(undefined);
    //jest.spyOn(window,'document','get').mockReturnValue(temp);
  });
});