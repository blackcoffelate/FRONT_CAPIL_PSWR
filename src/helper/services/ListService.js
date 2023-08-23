import { api } from "boot/axios";
import { createToken } from "boot/createToken";
import { LocalStorage } from "quasar";

const ListService = {
  getListKecamatan() {
    return api.get(`area/kecamatan/1809`);
  },
  getListDesa(params) {
    return api.get(`area/desa/${params}`);
  },
  getListDesaInput() {
    return api.get(`area/desa/`);
  },
  getListDusun(params) {
    return api.get(`/dusun/getByKelurahan/${params}`);
  },
};

export { ListService };
