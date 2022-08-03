import mongoose from 'mongoose';

const successPaymentSchema = new mongoose.Schema({
  status: Boolean,
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  date: String,
  email: { type: String, require: true },
  cart: [{ id: String, qty: Number }],
  amount: Number,
  paymentType: String
});

const failedPaymentSchema = new mongoose.Schema({
  status: Boolean,
  description: String,
  reason: String,
  order_id: String,
  razorpayPaymentId: String,
  date: String,
  email: { type: String, require: true },
  cart: [{ id: String, qty: Number }],
  amount: Number,
  paymentType: String,
});

const successBookingPaymentSchema = new mongoose.Schema({
  status: Boolean,
  razorpayOrderId: String,
  razorpaySignature: String,
  razorpayPaymentId: String,
  date: String,
  email: { type: String, require: true },
  bookingData: {
    contactData: {
      fName: { type: String, require: true },
      lName: String,
      place: { type: String, require: true },
      district: { type: String, require: true },
      phone: { type: String, require: true },
      email: { type: String, require: true },
      billingfName: { type: String, require: true },
      billinglName: String,
      billingplace: { type: String, require: true },
      billingdistrict: { type: String, require: true },
      billingphone: { type: String, require: true },
      billingemail: { type: String, require: true },
    },
    bookingItems: {
      eventDate: { type: String, require: true },
      eventTime: { type: String, require: true },
      eventName: { type: String, require: true },
      comments: String,
      pawattage: String,
      onstage: Boolean,
      openstage: Boolean,
      pasystem: Boolean,
      illumination: Boolean,
      powersystem: Boolean,
      items: [{ category: String, subCategory: String, qty: Number, price: Number }],
    }
  },
  amount: Number,
  paymentType: String
})

const failedBookingPaymentSchema = mongoose.Schema(
  {
    status: Boolean,
    description: String,
    reason: String,
    order_id: String,
    razorpayPaymentId: String,
    date: String,
    email: { type: String, require: true },
    bookingData: {
      contactData: {
        fName: { type: String, require: true },
        lName: String,
        place: { type: String, require: true },
        district: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        billingfName: { type: String, require: true },
        billinglName: String,
        billingplace: { type: String, require: true },
        billingdistrict: { type: String, require: true },
        billingphone: { type: String, require: true },
        billingemail: { type: String, require: true },
      },
      bookingItems: {
        eventDate: { type: String, require: true },
        eventTime: { type: String, require: true },
        eventName: { type: String, require: true },
        comments: String,
        pawattage: String,
        onstage: Boolean,
        openstage: Boolean,
        pasystem: Boolean,
        illumination: Boolean,
        powersystem: Boolean,
        items: [{ category: String, subCategory: String, qty: Number, price: Number }],
      }
    },
    amount: Number,
    paymentType: String,
  }
)


const userDetailsSchema = mongoose.Schema(
  {
    gId: { type: String, require: true },
    fName: { type: String, require: true },
    lName: String,
    imgUrl: String,
    email: { type: String, require: true },
    isAdmin: { type: Boolean, default: false, },
  }
)

const itemDetailsSchema = mongoose.Schema(
  {
    refId: { type: String, require: true },
    modelName: { type: String, require: true },
    subCategory: { type: String, require: true },
    brand: { type: String, require: true },
    breif: String,
    power: String,
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    onStage: Boolean,
    openStage: Boolean,
    paSystem: Boolean,
    illuminary: Boolean,
    powerSystem: Boolean,
  }
)

const successPaymentItems = mongoose.model('successPaymentItems', successPaymentSchema);
const failedPaymentItems = mongoose.model('failedPaymentItems', failedPaymentSchema);
const successBookingPayments = mongoose.model('successBookingPayments', successBookingPaymentSchema);
const failedBookingPayments = mongoose.model('failedBookingPayments', failedBookingPaymentSchema);
const userDetails = mongoose.model('userDetails', userDetailsSchema);
const itemDetails = mongoose.model('itemDetails', itemDetailsSchema);


export default failedPaymentItems
export { successPaymentItems, successBookingPayments, failedBookingPayments, userDetails, itemDetails }