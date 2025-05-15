export enum Endpoint {
  ServerPath = 'http://localhost:4000',
  SignIn = 'http://localhost:4000/auth/sign-in',
  SignUp = 'http://localhost:4000/auth/sign-up',
  RefreshToken = 'http://localhost:4000/auth/refresh-token',

  User = 'http://localhost:4000/users/:id',
  Users = 'http://localhost:4000/users',
  UserMe = 'http://localhost:4000/users/me',

  Bank = 'http://localhost:4000/banks/:id',
  Banks = 'http://localhost:4000/banks',
  UploadBankLogo = 'http://localhost:4000/banks/upload-logo/:id',
  
  Company = 'http://localhost:4000/companies/:id',
  Companies = 'http://localhost:4000/companies',
  UploadCompanyLogo = 'http://localhost:4000/companies/upload-logo/:id',
  
  Benefit = 'http://localhost:4000/benefits/:id',
  Benefits = 'http://localhost:4000/benefits',
  
  Discount = 'http://localhost:4000/discounts/:id',
  Discounts = 'http://localhost:4000/discounts',
  
  Cashback = 'http://localhost:4000/cashbacks/:id',
  Cashbacks = 'http://localhost:4000/cashbacks',
}
