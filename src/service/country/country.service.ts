import type { Country } from '@type/country.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';

export class CountryService {
  async get(id: number): ReturnPromiseWithErr<Country> {
    try {
      const { data } = await axios.get<Country | HttpExceptionInstance>(
        Endpoint.Country.replace(':id', id.toString()),
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);
      return [data, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Country[]> {
    try {
      const { data } = await axios.get<Country[] | HttpExceptionInstance>(Endpoint.Countries, {
        validateStatus: () => true,
      });

      if (isHttpException(data)) throw new HttpError(data);
      return [data, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
