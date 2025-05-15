import type { Promotion } from '@type/promotion.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance, FindOptions } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';
import { queryBuilder } from '@helper/query.helper';

export class PromotionService {
  async get(id: number): ReturnPromiseWithErr<Promotion> {
    try {
      const { data } = await axios.get<Promotion | HttpExceptionInstance>(
        Endpoint.Promotion.replace(':id', id.toString()),
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

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

  async getAll(options?: FindOptions<Promotion>): ReturnPromiseWithErr<Promotion[]> {
    const queries = queryBuilder(options);

    try {
      const { data } = await axios.get<Promotion[] | HttpExceptionInstance>(
        Endpoint.Promotions + queries,
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

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
