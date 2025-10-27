const STORAGE_KEY = "checkout-address-book";

const demoAddresses = [
  {
    id: "home",
    label: "home",
    firstName: "Ayşe",
    lastName: "Yılmaz",
    phone: "+90 532 000 00 00",
    email: "ayse@example.com",
    line1: "Gül Sokak No:12",
    line2: "Daire 4",
    city: "İstanbul",
    state: "Kadıköy",
    postalCode: "34710",
    country: "TR",
  },
  {
    id: "office",
    label: "office",
    firstName: "Ayşe",
    lastName: "Yılmaz",
    phone: "+90 212 000 00 00",
    email: "ayse@example.com",
    line1: "Maslak Mah. Teknoloji Cad. No:5",
    line2: "",
    city: "İstanbul",
    state: "Sarıyer",
    postalCode: "34398",
    country: "TR",
  },
];

const isBrowser = () => typeof window !== "undefined";

export const loadAddressBook = () => {
  if (!isBrowser()) return [...demoAddresses];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...demoAddresses];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      return parsed;
    }
    return [...demoAddresses];
  } catch (error) {
    return [...demoAddresses];
  }
};

export const persistAddressBook = (addresses) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    // ignore persistence errors in demo mode
  }
};

export const createAddressFromForm = (shipping) => ({
  id: `addr-${Date.now()}`,
  label: shipping.label || "saved",
  firstName: shipping.firstName,
  lastName: shipping.lastName,
  phone: shipping.phone,
  email: shipping.email,
  line1: shipping.line1,
  line2: shipping.line2,
  city: shipping.city,
  state: shipping.state,
  postalCode: shipping.postalCode,
  country: shipping.country,
});
