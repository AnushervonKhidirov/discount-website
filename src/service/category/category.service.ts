import type { Category } from '@type/category.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';

export class CategoryService {
  async get(id: number): ReturnPromiseWithErr<Category> {
    try {
      const { data } = await axios.get<Category | HttpExceptionInstance>(
        Endpoint.Category.replace(':id', id.toString()),
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

  async getAll(): ReturnPromiseWithErr<Category[]> {
    try {
      const { data } = await axios.get<Category[] | HttpExceptionInstance>(Endpoint.Categories, {
        validateStatus: () => true,
      });

      if (isHttpException(data)) throw new HttpError(data);
      return [data, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
