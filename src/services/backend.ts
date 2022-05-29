import axios from "axios";

import { Album } from "../model/album";
import { Photo } from "../model/photo";

const API_URL = "https://jsonplaceholder.typicode.com";
const USER_ID = 1;

export function GetAlbums(userId: number = USER_ID) {
  return axios.get<Album[]>(API_URL + "/users/" + userId + "/albums");
}

export function GetPhotos(albumId: number) {
  return axios.get<Photo[]>(API_URL + "/albums/" + albumId + "/photos");
}
