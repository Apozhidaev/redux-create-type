# redux-create-type

The helper to create redux actions

```javascript
import { action, createType, SELF, SYNC, ASYNC, FETCH } from 'redux-create-type';

const CUSTOM = ['UPDATE', 'REMOVE', 'SOMETHING_ELSE']

export const {
  INIT,
  EDIT,
  GET_COMPANY,
  OTHER,
} = createType('@namespace', 'PRODUCT')({
    INIT: {
      [SELF]: ASYNC,
      COMPANY: ASYNC,
    },
    EDIT: SYNC,
    GET_COMPANY: FETCH,
    OTHER: CUSTOM
  });

export const init = {
  begin: () => action(INIT.BEGIN),
  company: {
    begin: ({ values }) => action(INIT.COMPANY.BEGIN, { values }),
    end: ({ companyOptions }) => action(INIT.COMPANY.END, { companyOptions }),
  },
  end: ({ product }) => action(INIT.END, { product }),
};

export const edit = productId => action(EDIT, { productId });

export const getCompany = {
  request: ({ id }) => action(GET_COMPANY.REQUEST, { id }),
  success: ({ value }) => action(GET_COMPANY.SUCCESS, { value }),
  failure: error => action(GET_COMPANY.FAILURE, { error }),
};

console.log(INIT);
// {
//   BEGIN: '@namespace/PRODUCT_INIT_BEGIN',
//   END: '@namespace/PRODUCT_INIT_END',
//   COMPANY: {
//     BEGIN: '@namespace/PRODUCT_INIT_COMPANY_BEGIN',
//     END: '@namespace/PRODUCT_INIT_COMPANY_END'
//   }
// }

console.log(EDIT);
// '@namespace/PRODUCT_EDIT'


console.log(GET_COMPANY);
// {
//   REQUEST: '@namespace/PRODUCT_GET_COMPANY_REQUEST',
//   SUCCESS: '@namespace/PRODUCT_GET_COMPANY_SUCCESS',
//   FAILURE: '@namespace/PRODUCT_GET_COMPANY_FAILURE'
// }

console.log(OTHER);
// {
//   UPDATE: '@namespace/PRODUCT_OTHER_UPDATE',
//   REMOVE: '@namespace/PRODUCT_OTHER_REMOVE',
//   SOMETHING_ELSE: '@namespace/PRODUCT_OTHER_SOMETHING_ELSE'
// }


console.log(init.company.end({ companyOptions: [] }));
// {
//   type: '@namespace/PRODUCT_INIT_COMPANY_END',
//   companyOptions: []
// }

```