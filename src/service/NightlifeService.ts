import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  PayloadGetWalkInTicketInterface,
  TicketInterface,
} from '../interfaces/BookingInterface';
import {
  ResponseGetBanner,
  ResponseGetPlaceDetailInterface,
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
  getWalkInTicket: async (
    payload: PayloadGetWalkInTicketInterface,
  ): Promise<APIResponse<TicketInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_walk_in_ticket_list/${payload.club_id}?year_month_day=${payload.date}`,
    );
    return response.data;
  },
  getPlaceDetail: async ({
    club_id,
  }: {
    club_id: number;
  }): Promise<ResponseGetPlaceDetailInterface> => {
    const response = await ax.get(`${URL}/get_place_detail/${club_id}`);
    return response.data;
  },
};
