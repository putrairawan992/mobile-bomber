import {APIResponse} from '../interfaces/BaseApiResponse';
import {
  RequestSongPayloadInterface,
  RequestSongResponseInterface,
} from '../interfaces/SongInterface';
import ax from './axios';

export const SongService = {
  postRequestSong: async (
    payload: RequestSongPayloadInterface,
  ): Promise<APIResponse<RequestSongResponseInterface>> => {
    console.log(payload);
    
    const response = await ax.post('/event/post_request_song', payload);
    return response.data;
  },
};
