/* eslint-disable @typescript-eslint/no-unused-vars */
import Config from 'react-native-config';
import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  InviteNotificationInterface,
  PayloadActionInvitationInterface,
  PayloadPushNotificationInterface,
  PayloadReadNotificationInterface,
  RequestFriendNotificationInterface,
} from '../interfaces/NotificationInterface';
import {AppDispatch} from '../store';
import {
  setFriendRequest,
  setFriendRequestCount,
  setInvitation,
  setInvitationCount,
} from '../store/notification';
import ax from './axios';
import {getStorage} from './mmkvStorage';

const URL = 'notification';

export const NotificationService = {
  getInvitationNotification: async (
    user_id: string,
    dispatch: AppDispatch,
  ): Promise<APIResponse<Array<InviteNotificationInterface>>> => {
    const response = await ax.get(`${URL}/get_table_invitation/${user_id}`);
    const invitationData = response.data.data;
    dispatch(setInvitation(invitationData));
    dispatch(
      setInvitationCount(
        invitationData.filter(
          (item: InviteNotificationInterface) =>
            item.isRead === 0 || item.status === 'waiting_for_response',
        ).length,
      ),
    );
    return response.data;
  },
  putActionInvitation: async (
    payload: PayloadActionInvitationInterface,
    dispatch: AppDispatch,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.put(
      `${URL}/accept_or_reject_table_invitation`,
      payload,
    );
    const authData = await getStorage('userAuth');
    const {id} = JSON.parse(authData as string);
    const updateNotification = await ax.get(
      `${URL}/get_table_invitation/${id}`,
    );
    const invitationData = updateNotification.data.data;
    dispatch(setInvitation(invitationData));
    dispatch(
      setInvitationCount(
        invitationData.filter(
          (item: InviteNotificationInterface) =>
            item.isRead === 0 || item.status === 'waiting_for_response',
        ).length,
      ),
    );
    return response.data;
  },
  putReadNotification: async (
    payload: PayloadReadNotificationInterface,
  ): Promise<APIResponse<unknown>> => {
    const response = await ax.put(
      `${URL}/read_notification_invitation`,
      payload,
    );
    return response.data;
  },
  getRequestFriendNotification: async (
    user_id: string,
    dispatch: AppDispatch,
  ): Promise<APIResponse<RequestFriendNotificationInterface[]>> => {
    const response = await ax.get(
      `${URL}/get_invitation_request_new_friend/${user_id}`,
    );
    const friendRequestData = response.data.data;
    dispatch(setFriendRequest(friendRequestData));
    dispatch(setFriendRequestCount(friendRequestData.length));
    return response.data;
  },
  pushNotification: async (
    payload: PayloadPushNotificationInterface,
  ): Promise<APIResponse<unknown>> => {
    const result = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      body: JSON.stringify({
        to: payload.target,
        notification: {
          title: payload.title,
          body: payload.body,
          mutable_content: true,
          sound: 'Tri-tone',
        },
        data: {
          url: '<url of media image>',
          dl: '<deeplink action on tap of notification>',
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `key=${Config.FCM_KEY}`,
      },
    });
    const data = await result.json();
    return data;
  },
};
