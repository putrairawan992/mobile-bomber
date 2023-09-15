import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  AcceptFriendRequestInterface,
  FriendInterface,
  PayloadAddFriendInterface,
  RequestFriendHistoryInterface,
} from '../interfaces/UserInterface';
import ax from './axios';

const URL_Global = 'friendship';
const URL_Notification = 'notification';

export const FriendshipService = {
  getFriendship: async ({
    userId,
  }: {
    userId: string;
  }): Promise<APIResponse<FriendInterface[]>> => {
    const response = await ax.get(`${URL_Global}/get_friendship/${userId}`);
    return response.data;
  },
  getAllUsers: async ({
    userId,
  }: {
    userId: string;
  }): Promise<APIResponse<FriendInterface[]>> => {
    const response = await ax.get(`${URL_Global}/get_all_users/${userId}`);
    return response.data;
  },
  postAddFriend: async ({
    payload,
  }: {
    payload: PayloadAddFriendInterface;
  }): Promise<APIResponse<unknown>> => {
    const response = await ax.post(
      `${URL_Global}/post_request_new_friend`,
      payload,
    );
    return response.data;
  },
  getSendRequestHistory: async ({
    userId,
  }: {
    userId: string;
  }): Promise<APIResponse<RequestFriendHistoryInterface[]>> => {
    const response = await ax.get(
      `${URL_Global}/get_sent_request_new_friend_history/${userId}`,
    );
    return response.data;
  },
  putAcceptFriendRequest: async (
    payload: AcceptFriendRequestInterface,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.put(
      `${URL_Notification}/accept_invitation_request_new_friend`,
      payload,
    );
    return response.data;
  },
};