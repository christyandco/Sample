class TokenService {
  public refresh(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        try {
          window.parent.getNewRefreshToken((data: any) => {
            resolve(data);
            console.log(data);
          });
        } catch (err) {
          reject(err);
        }
      }
    });
  }

  public getUserContext() {
    const context = this.getPlatformContext();
    return {
      id: '',
      language: context.language_selected,
      parentApp: context.portal_type || process.env.NEXT_PUBLIC_PARENT_APP,
      plantId: context.plant_selected_id,
      plantName: context.plant_selected_name,
      name: '',
    };
  }

  public getTokenDataFromCokiee() {
    const context = this.getPlatformContext();
    return {
      token: context.auth_token,
    };
  }

  public getPlatformContext() {
    let platformContext: any = {};

    if (typeof document !== 'undefined') {
      platformContext = Object.fromEntries(
        document.cookie
          .split('; ')
          .map((v) => v.split('=').map(decodeURIComponent))
      );
    }

    return {
      auth_token: platformContext.token,
      euser: platformContext.euser,
      plant_selected_id: platformContext.selectedPlant,
      plant_selected_name: this.getSelectedPlantName(
        platformContext.selectedPlant,
        platformContext.plant
      ),
      language_selected: platformContext.selectedLanguage || 'en',
      portal_type: platformContext.platformType,
    };
  }

  private getSelectedPlantName(plantId: number, plant: string) {
    let plantArr = plant ? JSON.parse(plant) : [];
    let selectedPlant = plantArr.filter((p: any) => p.plantId == plantId);
    return selectedPlant.length ? selectedPlant[0].plantName : '';
  }
}

export default new TokenService();
