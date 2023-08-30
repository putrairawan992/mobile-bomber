import {ResponseGetProductBasedOnClubIdInterface} from '../interfaces/PlaceInterface';
import ax from './axios';

const URL = 'event';

export const EventService = {
  getProductBasedOnClubId: async (
    clubId: string,
  ): Promise<ResponseGetProductBasedOnClubIdInterface> => {
    const response = await ax.get(
      `${URL}/get_product_based_on_club_id/${clubId}`,
    );
    return response.data;
  },
};
