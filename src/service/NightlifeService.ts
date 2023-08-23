import {
  ResponseGetBanner,
  ResponseGetPlaceInterface,
} from '../interfaces/PlaceInterface';
import ax from './axios';

const URL = 'nightlife';

export const NightlifeService = {
  getTopFiveNightClub: async (): Promise<ResponseGetPlaceInterface> => {
    const response = await ax.get(`${URL}/get_top5_nightclub/`);
    return response.data;
  },
  getBanner: async ({
    city_id,
  }: {
    city_id: number;
  }): Promise<ResponseGetBanner> => {
    const response = await ax.get(`${URL}/get_banner/${city_id}`);
    return response.data;
  },
};
