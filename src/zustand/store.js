import create from 'zustand'

const cartCountStore = create(set => ({
    countVar: 0,
    cartCount: (count) => set({ countVar: count })
}))

export const userStore = create(set => ({
    user: { loginState: false, data: "" },
    logInUser: (state, data) => set(() => ({ user: { loginState: state, data: data } })),
    logOutUser: () => set(() => ({ user: { loginState: false, data: "" } }))
}))

export const bookingStore = create(set => ({
    bookingGlobalState: "personal",
    setGlobalState: (state) => set(() => ({ bookingGlobalState: state })),
}))

export const bookingDataStore = create(set => ({
    bookingData: { contactData: "", bookingItems: "", amount: "" },
    setContactData: (data) => set({ bookingData: { contactData: data, bookingItems: "", amount: "" } }),
    setBookingItems: (data, items, amount) => set({ bookingData: { contactData: data, bookingItems: items, amount: amount } }),
}))

export const adminStore = create(set => ({
    adminGlobalState: "Add Item",
    setAdminGlobalState: (state) => set(() => ({ adminGlobalState: state })),
}))


export default cartCountStore;