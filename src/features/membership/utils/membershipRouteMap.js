
import { membershipApi } from "../api/membershipApi";

export const membershipApiMap = Object.freeze({
  vendor: Object.freeze({
    price: membershipApi.getVendorPrice,
    upgrade: membershipApi.upgradeVendor,
  }),

  api_user: Object.freeze({
    price: membershipApi.getApiUserPrice,
    upgrade: membershipApi.upgradeApiUser,
  }),

  agent: Object.freeze({
    price: membershipApi.getAgentPrice,
    upgrade: membershipApi.upgradeAgent,
  }),
});

export default membershipApiMap;


/*
import { membershipApi } from "../api/membershipApi";

const membershipApiMap = {
    vendor: {
        price: membershipApi.getVendorPrice,
        upgrade: membershipApi.upgradeVendor,
    },

    api_user: {
        price: membershipApi.getApiUserPrice,
        upgrade: membershipApi.upgradeApiUser,
    },

    agent: {
        price: membershipApi.getAgentPrice,
        upgrade: membershipApi.upgradeAgent,
    },
};

export default membershipApiMap;

*/
