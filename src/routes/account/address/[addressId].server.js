import {CacheNone, gql} from '@shopify/hydrogen';

import {getApiErrorMessage} from '~/lib/utils';

export async function api(request, {params, session, queryShop}) {
    if(!session) {
        return new Response('session storage not available.', {
            status: 400,
        })
    }

    const {customerAccessToken} = await session.get();

    if(!customerAccessToken) return new Response(null, {status:401});

    if(request.method === 'PATCH')
        return updateAddress(customerAccessToken, request, params, queryShop);
    if(request.method === 'DELETE')
        return deleteAddress(customerAccessToken, params, queryShop);

    return new Response(null, {
        status: 405,
        header: {
            Allow: 'PATCH,DELETE'
        }
    })
}

async function deleteAddress(customerAccessToken, params, queryShop) {
    const {data, errors} = await queryShop({
        query:DELETE_ADDRESS_MUTATION,
        variables: {
            customerAccessToken,
            id: decodeURIComponent(params.addressId),
        },

        cache: CacheNone(),
    });

    const error = getApiErrorMessage('customerAddressDelete', data, errors);

    if (error) return new Response(JSON.stringify({error}), {status:400});

    return new Response(null);
}


async function updateAddress(customerAccessToken, request, params, queryShop) {
    const {
        firstName,
        lastName,
        company,
        address1,
        address2,
        country,
        province,
        city,
        zip,
        phone,
        isDefaultAddress,
      } = await request.json();

      const address = {};

      if(firstName) address.firstName = firstName;
      if(lastName) address.lastName = lastName;
      if(company) address.company = company;
      if(address1) address.address1 = address1;
      if(address2) address.address2 = address2;
      if(country) address.country = country;
      if(province) address.province = province;
      if(city) address.city = city;
      if(zip) address.zip = zip;
      if(phone) address.phone = phone;

      const {data, errors} = await queryShop({
          query:UPDATE_ADDRESS_MUTATION,
          variables: {
              address,
              customerAccessToken,
              id: decodeURIComponent(params.addressId)
          },
          cache: CacheNone(),
      });

      const error = getApiErrorMessage('customerAddressUpdate', data, errors);

      if(error) return new Response(JSON.stringify({error}), {status: 400});

      if(isDefaultAddress) {
        const {data, errors} = await setDefaultAddress(
            queryShop,
            decodeURIComponent(params.addressId),
            customerAccessToken,
        );

        const error = getApiErrorMessage(
            'customerDefaultAddressUpdate',
            data,
            errors,
        );

        if (error) return new Response(JSON.stringify({error}), {status: 400});
      }

      return new Response(null);
}

export function setDefaultAddress(queryShop, addressId, customerAccessToken) {
    return queryShop({
        query: UPDATE_DEFAULT_ADDRESS_MUTATION,
        variables: {
            customerAccessToken,
            addressId
        },

        cache: CacheNone(),
    });
}

const UPDATE_ADDRESS_MUTATION = gql`
    mutation customerAddressUpdate(
        $address: MailingAddressInput!,
        $customerAccessToken: String!,
        $id: ID!
    ) {
        customerAddressUpdate(
            address: $address,
            customerAccessToken: $customerAccessToken
            id: $id
        ) {
            customerUserError {
                code
                field
                message
            }
        }
    }
`;

const UPDATE_DEFAULT_ADDRESS_MUTATION = gql`
    mutation customerDefaultAddressUpdate(
        $addressId: ID!
        $customerAccessToken: String!
    ) {
        customerDefaultAddressUpdate(
            addressId: $addressId
            customerAccessToken: $customerAccessToken
        ) {
            customerUserError {
                code
                field
                message
            }
        }
    }
`;


const DELETE_ADDRESS_MUTATION = gql`
    mutation customerAddressDelete($customerAddressDelete:String!, $id: ID!) {
        customerAddressDelete(customerAccessToken: $customerAccessToken, id: $ID) {
            customerUserError {
                code
                field
                message
            }
            deletedCustomerAddressId
        }
    }
`;