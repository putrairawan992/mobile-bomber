import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  PayloadGetWalkInTicketInterface,
  PayloadPostBookingTableInterface,
  PayloadPostBookingWalkInInterface,
  TicketInterface,
} from '../interfaces/BookingInterface';
import {
  BannerInterface,
  GalleryCategoryInterface,
  ResponseGetPlaceDetailInterface,
  ResponseGetTableInterface,
} from '../interfaces/PlaceInterface';
import ax from './axios';

const URL = 'event';

export const MyEventService = {
  getEventAllBookingHistory: async ({
    club_id,
    status,
    tab,
  }: {
    club_id?: string;
    status: string;
    tab: string;
  }): Promise<APIResponse<{clubId: string}[]>> => {
    const response = await ax.get(
      `${URL}/get_all_booking_history/${club_id}?status=${status}&tab=${tab}`,
    );
    return response.data;
  },
  getBanner: async ({
    city_id,
  }: {
    city_id: number;
  }): Promise<APIResponse<BannerInterface[]>> => {
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
    club_id: string;
  }): Promise<APIResponse<ResponseGetPlaceDetailInterface>> => {
    const response = await ax.get(`${URL}/get_place_detail/${club_id}`);
    return response.data;
  },
  getTableList: async ({
    club_id,
    date,
  }: {
    club_id: string;
    date: string;
  }): Promise<APIResponse<ResponseGetTableInterface>> => {
    const response = await ax.get(
      `${URL}/get_all_table_base_on_date/${club_id}?year_month_day=${date}`,
    );
    return response.data;
  },
  getPlaceGallery: async ({
    club_id,
  }: {
    club_id: string;
  }): Promise<APIResponse<GalleryCategoryInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_gallery_base_on_club_id/${club_id}`,
    );
    return response.data;
  },
  postTableBoking: async ({
    payload,
  }: {
    payload: PayloadPostBookingTableInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/post_table_booking_order`, payload);
    return response.data;
  },
  postWalkInBoking: async ({
    payload,
  }: {
    payload: PayloadPostBookingWalkInInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/post_walk_in_booking`, payload);
    return response.data;
  },
};
