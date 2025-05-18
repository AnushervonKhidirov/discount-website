import type { NotificationInstance } from 'antd/es/notification/interface';
import type { FC, Dispatch, SetStateAction } from 'react';
import type { Company, CreateCompany } from '@type/company.type';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Steps, Form, Input, Select, Card, List, notification, Upload } from 'antd/es';
import { Form as MyForm } from '@common/form/form';
import Grid from '@common/grid/grid';

import { CompanyService } from '@service/company/company.service';
import { CountryService } from '@service/country/country.service';
import { CategoryService } from '@service/category/category.service';

import classes from './create-company.module.css';
import { requestWithRefresh } from '@helper/request.helper';
import { isHttpException } from '@helper/response.helper';
import { PlusOutlined } from '@ant-design/icons';

const companyService = new CompanyService();
const countryService = new CountryService();
const categoryService = new CategoryService();

const CreateCompanyPage = () => {
  const [api, context] = notification.useNotification();
  const [searchParams] = useSearchParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const createCompanySteps = [
    { title: 'Create company' },
    { title: 'Upload logo' },
    { title: 'Step 3' },
  ];

  const stepsContent = [
    <CreateCompanyStep key="create-company-step" setCompany={setCompany} api={api} />,
    <UploadLogoStep key="upload-logo-step" companyData={company} api={api} />,
    <div key="create-company-step-3">step 3</div>,
  ];

  useEffect(() => {
    const step = searchParams.get('step');
    if (step) setCurrentStep(+step);
  }, [searchParams]);

  return (
    <div className={classes.create_company_page}>
      {context}

      <div className={classes.content}>{stepsContent[currentStep]}</div>

      <Steps className={classes.steps} current={currentStep} items={createCompanySteps} />
    </div>
  );
};

const CreateCompanyStep: FC<{
  setCompany: Dispatch<SetStateAction<Company | null>>;
  api: NotificationInstance;
}> = ({ setCompany, api }) => {
  const setSearchParams = useSearchParams()[1];

  const { data: countries } = useQuery({
    initialData: [],
    queryKey: ['county_options'],
    queryFn: async () => {
      const [countries, err] = await countryService.getAll();
      if (err) throw err;
      return countries;
    },
  });

  const { data: categories } = useQuery({
    initialData: [],
    queryKey: ['category_options'],
    queryFn: async () => {
      const [categories, err] = await categoryService.getAll();
      if (err) throw err;
      return categories;
    },
  });

  async function onSubmit(value: CreateCompany) {
    const [company, err] = await requestWithRefresh(() => companyService.create(value));

    if (err) {
      if (isHttpException(err) && err.statusCode === 409) {
        return api.error({ message: err.error, description: 'Company already exists' });
      }

      return api.error({ message: err.error, description: err.message });
    }

    setCompany(company);

    setSearchParams([
      ['step', '1'],
      ['companyId', company.id.toString()],
    ]);
  }

  return (
    <MyForm onSubmit={onSubmit}>
      <Form.Item
        name="name"
        label={null}
        rules={[{ required: true, message: 'Company name is required' }]}
      >
        <Input placeholder="Company name" />
      </Form.Item>

      <Form.Item name="about" label={null}>
        <Input placeholder="About company" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label={null}
        rules={[{ required: true, message: 'Category is required' }]}
      >
        <Select<number>
          placeholder="Select category"
          optionFilterProp="title"
          optionLabelProp="title"
          options={categories.map(category => ({ value: category.id, title: category.value }))}
          optionRender={option => option.data.title}
        />
      </Form.Item>

      <Form.Item
        name="countryIds"
        label={null}
        rules={[{ required: true, message: 'Select at least 1 country' }]}
      >
        <Select<number>
          placeholder="Select country"
          mode="multiple"
          optionFilterProp="title"
          optionLabelProp="title"
          options={countries.map(country => ({ value: country.id, title: country.value }))}
          optionRender={option => option.data.title}
        />
      </Form.Item>
    </MyForm>
  );
};

const UploadLogoStep: FC<{
  companyData: Company | null;
  api: NotificationInstance;
}> = ({ companyData, api }) => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('companyId');

  const { data: company } = useQuery({
    initialData: null,
    queryKey: ['createdCompanyInfo'],
    queryFn: async () => {
      if (!companyId) {
        api.error({ message: 'Not found', description: 'Company not found' });
        return null;
      }

      if (companyData) return companyData;
      const [company, err] = await companyService.get(+companyId);
      if (err) {
        api.error({ message: err.error, description: err.message });
        return null;
      }
      return company;
    },
  });

  async function uploadLogo(id: number, file: File) {
    const [company, err] = await requestWithRefresh(() => companyService.uploadLogo(id, file));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${company.name} logo uploaded` });
    }
  }

  return (
    company && (
      <Grid className={classes.step_2_wrapper}>
        <Grid>
          <Card title="Name">{company.name}</Card>
          <Card title="Category">{company.category.value}</Card>
          <Card title="About">{company.about ?? 'Not set'}</Card>
        </Grid>

        <List header={<h3>Selected countries:</h3>} bordered={true}>
          {company.countries.map(country => (
            <List.Item key={`country-${country.id}`}>{country.value}</List.Item>
          ))}
        </List>

        <Form className={classes.upload_form}>
          <Form.Item label={null} valuePropName="file" style={{ margin: 0 }}>
            <Upload
              beforeUpload={file => uploadLogo(company.id, file)}
              listType="picture-card"
              multiple={false}
              maxCount={1}
            >
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Grid>
    )
  );
};

export default CreateCompanyPage;
