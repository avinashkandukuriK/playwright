export interface OrderTestData {
  username: string;
  password: string;
  productName: string;
  countryCode: string;
  countryName: string;
}

export function buildOrderTestData(username: string, password: string): OrderTestData {
  return {
    username,
    password,
    productName: process.env.ORDER_PRODUCT_NAME || 'ZARA COAT 3',
    countryCode: process.env.ORDER_COUNTRY_CODE || 'ind',
    countryName: process.env.ORDER_COUNTRY_NAME || 'India'
  };
}
