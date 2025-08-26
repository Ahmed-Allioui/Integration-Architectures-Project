const mongoose = require('mongoose')
const { Schema } = mongoose;

const salesmanSchema = new Schema({
  employeeId: {
    type: String,
    required: [true, "can't be blank"],
  },
  orangeHRMId: {
    type: String,
    required: [true, "can't be blank"],
  },
  firstName: {
    type: String,
    required: [true, "can't be blank"],
  },
  lastName: {
    type: String,
    required: [true, "can't be blank"],
  },
  jobTitle: {
    type: String,
    required: [true, "can't be blank"],
  },
  department: {
    type: String,
    default: 'Sales'
  },
  records: [{
    year: {
      type: Number,
      required: [true, "can't be blank"],
    },
    orders: [{
      productName: {
        type: String,
        required: [true, "can't be blank"],
      },
      client: {
        type: String,
        required: [true, "can't be blank"],
      },
      clientRanking: {
        type: Number,
        required: [true, "can't be blank"],
      },
      items: {
        type: Number,
        required: [true, "can't be blank"],
      },
      unitPrice: {
        type: Number,
        required: [true, "can't be blank"],
      },
      bonus: {
        type: Number,
        default: null
      },
    }],
    socialPerformances: [{
      goalDescription: String,
      targetValue: {
        type: Number,
        required: [true, "can't be blank"],
      },
      actualValue: {
        type: Number,
        required: [true, "can't be blank"],
      },
      bonus: {
        type: Number,
        default: null
      },
    }],
    remarks: {
      type: String,
      default: ''
    },
    validatedByCEO: {
      type: Boolean,
      default: null
    },
    validatedByHR: {
      type: Boolean,
      default: null
    },
    validatedBySalesman: {
      type: Boolean,
      default: null
    }
  }],
});

module.exports = mongoose.model('Salesman', salesmanSchema);