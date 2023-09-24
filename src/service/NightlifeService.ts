import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  PayloadBookingInvitationInterface,
  PayloadGetWalkInTicketInterface,
  PayloadPostBookingTableInterface,
  PayloadPostBookingWalkInInterface,
  PayloadWaitingListInterface,
  TicketInterface,
} from '../interfaces/BookingInterface';
import {
  BannerInterface,
  CouponInterface,
  GalleryCategoryInterface,
  ParamsGetClubEventInterface,
  ParamsGetPlaceByCategoryInterface,
  PlaceEventsInterface,
  PlaceInterface,
  ResponseGetPlaceDetailInterface,
  ResponseGetTableInterface,
} from '../interfaces/PlaceInterface';
import ax from './axios';

const URL = 'nightlife';

export const NightlifeService = {
  getTopFiveNightClub: async (): Promise<APIResponse<PlaceInterface[]>> => {
    const response = await ax.get(`${URL}/get_top5_nightclub/`);
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
  getClubEventSchedule: async ({
    params,
  }: {
    params: ParamsGetClubEventInterface;
  }): Promise<APIResponse<PlaceEventsInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_operational_schedule/${params.club_id}?year_month=${params.year_month}`,
    );
    return response.data;
  },
  getPlaceByCategory: async ({
    params,
  }: {
    params: ParamsGetPlaceByCategoryInterface;
  }): Promise<APIResponse<PlaceInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_category_page/${params.category_id}?limit=${params.limit}`,
    );
    return response.data;
  },
  getCouponList: async (): Promise<APIResponse<CouponInterface[]>> => {
    const response = await ax.get(`${URL}/get_coupon_list`);
    return response.data;
  },
  postWaitingList: async ({
    payload,
  }: {
    payload: PayloadWaitingListInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/join_waiting_list`, payload);
    return response.data;
  },
  postBookingInvitation: async ({
    payload,
  }: {
    payload: PayloadBookingInvitationInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/post_table_invitation`, payload);
    return response.data;
  },
};
