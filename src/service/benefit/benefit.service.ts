import type { Benefit as TBenefit } from '@type/benefit.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { FindOptions } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpError, returnError } from '@helper/response.helper';
import { queryBuilder } from '@helper/query.helper';

export class BenefitService {
  async get(id: number): ReturnPromiseWithErr<TBenefit> {
    try {
      const { data } = await axios.get<TBenefit | HttpError>(
        Endpoint.Benefit.replace(':id', id.toString()),
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

  async getAll(options?: FindOptions<TBenefit>): ReturnPromiseWithErr<TBenefit[]> {
    const queries = queryBuilder(options);

    try {
      const { data } = await axios.get<TBenefit[] | HttpError>(Endpoint.Benefits + queries, {
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
