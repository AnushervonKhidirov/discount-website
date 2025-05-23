import type { Company, CreateCompany, UpdateCompany } from '@type/company.type';
import type { Token } from '@type/auth.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import axios from 'axios';
import { CookieService } from '@service/cookie/cookie.service';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';

export class CompanyService {
  private readonly cookieService = new CookieService();

  async get(id: number): ReturnPromiseWithErr<Company> {
    try {
      const { data } = await axios.get<Company | HttpExceptionInstance>(
        Endpoint.Company.replace(':id', id.toString()),
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Company[]> {
    try {
      const { data } = await axios.get<Company[] | HttpExceptionInstance>(Endpoint.Companies, {
        validateStatus: () => true,
      });

      if (isHttpException(data)) throw new HttpError(data);

      const companies = data.map(company => ({
        ...company,
        createdAt: new Date(company.createdAt),
        updatedAt: new Date(company.updatedAt),
      }));

      return [companies, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async create(companyDto: CreateCompany): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.post<Company | HttpExceptionInstance>(
        Endpoint.Companies,
        companyDto,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async update(id: number, companyDto: UpdateCompany): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.put<Company | HttpExceptionInstance>(
        Endpoint.Company.replace(':id', id.toString()),
        companyDto,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async uploadLogo(id: number, file: File): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<Company | HttpExceptionInstance>(
        Endpoint.UploadCompanyLogo.replace(':id', id.toString()),
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async archive(id: number): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.patch<Company | HttpExceptionInstance>(
        Endpoint.CompanyArchive.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpException(data)) throw new HttpError(data);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
