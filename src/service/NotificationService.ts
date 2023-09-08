/* eslint-disable @typescript-eslint/no-unused-vars */
import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  InviteNotificationInterface,
  PayloadActionInvitationInterface,
  PayloadReadNotificationInterface,
} from '../interfaces/NotificationInterface';
import {AppDispatch} from '../store';
import {setCount, setInvitation} from '../store/notification';
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
      setCount(
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
      setCount(
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
};
