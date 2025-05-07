import type { Discount } from '@type/benefit.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpError, returnError } from '@helper/response.helper';

export class DiscountService {
  async get(id: number): ReturnPromiseWithErr<Discount> {
    try {
      const { data } = await axios.get<Discount | HttpError>(
        Endpoint.Discount.replace(':id', id.toString()),
        {
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const discount = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [discount, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Discount[]> {
    try {
      const { data } = await axios.get<Discount[] | HttpError>(Endpoint.Discounts, {
        validateStatus: () => true,
      });

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const discounts = data.map(discount => ({
        ...discount,
        createdAt: new Date(discount.createdAt),
        updatedAt: new Date(discount.updatedAt),
      }));

      return [discounts, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
