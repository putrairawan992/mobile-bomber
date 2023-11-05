export interface RequestSongPayloadInterface {
  song_title: string;
  song_artist: string;
  ask_fee: string;
  requested_by: number;
  club_id: string;
}

export interface RequestSongResponseInterface {}

export interface DjRequestSongInterface {
  title: string;
  artis: string;
  fee: number;
  requestedName: string;
  requestedPhotoUrl: string;
}
