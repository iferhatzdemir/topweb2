export const shippingOptions = [
  {
    id: "standard",
    label: "standardShipping",
    description: "standardShippingDescription",
    days: 3,
    cost: 39.9,
  },
  {
    id: "express",
    label: "expressShipping",
    description: "expressShippingDescription",
    days: 1,
    cost: 79.9,
  },
  {
    id: "pickup",
    label: "storePickup",
    description: "storePickupDescription",
    days: 0,
    cost: 0,
  },
];

export const defaultShippingOption = shippingOptions[0];

export const findShippingOption = (id) =>
  shippingOptions.find((option) => option.id === id) || defaultShippingOption;
