import {ResponseGetPlaceInterface} from '../interfaces/PlaceInterface';
import ax from './axios';

const URL = 'nightlife';

export const NightlifeService = {
  getTopFiveNightClub: async (): Promise<ResponseGetPlaceInterface> => {
    const response = await ax.get(`${URL}/get_nightclub_information/`);
    return response.data;
  },
};
