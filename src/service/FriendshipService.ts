import {APIResponse} from '../interfaces/BaseApiResponse';
import {FriendInterface} from '../interfaces/UserInterface';
import ax from './axios';

const URL_Global = 'global_api';

export const FriendshipService = {
  getFriendship: async ({
    userId,
  }: {
    userId: string;
  }): Promise<APIResponse<FriendInterface[]>> => {
    const response = await ax.get(`${URL_Global}/get_friendship/${userId}`);

    return response.data;
  },
};
