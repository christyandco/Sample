import tokenService from '@services/tokenService';

describe('Token Service', () => {
  beforeAll(() => {
    jest
      .spyOn(document, 'cookie', 'get')
      .mockReturnValue(
        'token=305084bc-858e-46ab-945c-c416874b7936; euser=libin@company1.com; selectedPlant=2; plant=[{"plantId":11,"plantName":"PLANTD","plantCode":"PLANTD","defaultPlant":false},{"plantId":14,"plantName":"Plant G","plantCode":"PLANTG","defaultPlant":false},{"plantId":2,"plantName":"Plant B","plantCode":"NJAMUN","defaultPlant":true},{"plantId":8,"plantName":"PLANT C","plantCode":"PLNTC","defaultPlant":false},{"plantId":15,"plantName":"plant H","plantCode":"PLANTH","defaultPlant":false}]; selectedLanguage=en; portalType=customer'
      );

    window.parent.refresh = jest.fn((cb) => {
      if (cb) cb();
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Check Platform service method.', () => {
    const platformContext = tokenService.getPlatformContext();
    expect(platformContext.auth_token).toBe(
      '305084bc-858e-46ab-945c-c416874b7936'
    );
  });

  it('Check the Get token method.', () => {
    const token = tokenService.getTokenDataFromCokiee();
    expect(token.token).toBe('305084bc-858e-46ab-945c-c416874b7936');
  });

  it('Check the user context method.', () => {
    const userContext = tokenService.getUserContext();
    expect(userContext.language).toBe('en');
  });

  it('Check the user context method without plant_name,portal_type and selected_language.', () => {
    jest
      .spyOn(document, 'cookie', 'get')
      .mockReturnValue(
        'token=305084bc-858e-46ab-945c-c416874b7936; euser=libin@company1.com; selectedPlant=2; plant=[{"plantId":11,"plantName":"PLANTD","plantCode":"PLANTD","defaultPlant":false},{"plantId":14,"plantName":"Plant G","plantCode":"PLANTG","defaultPlant":false},{"plantId":2,"plantName":"Plant B","plantCode":"NJAMUN","defaultPlant":true},{"plantId":8,"plantName":"PLANT C","plantCode":"PLNTC","defaultPlant":false},{"plantId":15,"plantName":"plant H","plantCode":"PLANTH","defaultPlant":false}]; selectedLanguage=en; portalType=customer'
      );
    const userContext = tokenService.getUserContext();
    expect(userContext.language).toBe('en');
    expect(userContext.plantName).toBe('Plant B');
    expect(userContext.parentApp).toBe('customer');
  });

  it('Check the refresh button.', () => {
    tokenService.refresh();
  });
});
