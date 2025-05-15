import type { Bank } from '@type/bank.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';

export class BankService {
  async get(id: number): ReturnPromiseWithErr<Bank> {
    try {
      const { data } = await axios.get<Bank | HttpExceptionInstance>(
        Endpoint.Bank.replace(':id', id.toString()),
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Bank[]> {
    try {
      const { data } = await axios.get<Bank[] | HttpExceptionInstance>(Endpoint.Banks, {
        validateStatus: () => true,
      });

      if (isHttpException(data)) throw new HttpError(data);

      const banks = data.map(bank => ({
        ...bank,
        createdAt: new Date(bank.createdAt),
        updatedAt: new Date(bank.updatedAt),
      }));

      return [banks, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
