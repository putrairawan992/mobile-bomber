import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  PayloadBookingInvitationInterface,
  PayloadClaimCouponInterface,
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
  getDjList: async ({
    club_id,
  }: {
    club_id: string;
  }): Promise<APIResponse<any>> => {
    const response = await ax.get(`event/get_dj_list?club_id=${club_id}`);
    return response.data;
  },
  getBookingReminder: async ({
    customer_id,
  }: {
    customer_id: string;
  }): Promise<APIResponse<any>> => {
    const response = await ax.get(
      `${URL}/booking_reminder?customer_id=${customer_id}`,
    );
    console.log('getBookingReminder', response);

    return response.data;
  },
  getInvitedOrder: async ({id}: {id: string}): Promise<APIResponse<any>> => {
    const response = await ax.get(`${URL}/get_invited_order?invited_id=${id}`);
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
      `${URL}/get_category_page/${params.category_id}?keywords=${params.keyword}`,
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
  postClaimCoupon: async ({
    payload,
  }: {
    payload: PayloadClaimCouponInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(`${URL}/post_claim_coupon`, payload);
    return response.data;
  },
  getClaimedCoupon: async ({
    customer_id,
  }: {
    customer_id: string;
  }): Promise<APIResponse<CouponInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_claimed_coupon_list/${customer_id}`,
    );
    return response.data;
  },
  getCouponAvaibility: async ({
    coupon_id,
  }: {
    coupon_id: string;
  }): Promise<APIResponse<CouponInterface[]>> => {
    const response = await ax.get(
      `${URL}/check_is_coupon_available/${coupon_id}`,
    );
    return response.data;
  },
  putConfirmUseCoupon: async ({
    id,
  }: {
    id: string;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.put(`${URL}/confirmed_use_this_coupon`, {id});
    return response.data;
  },
  getPlaceByName: async ({
    place_name,
  }: {
    place_name: string;
  }): Promise<APIResponse<PlaceInterface[]>> => {
    const response = await ax.get(
      `${URL}/search_engine_for_place/${place_name}`,
    );
    return response.data;
  },
};
