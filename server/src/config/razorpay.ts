import Razorpay from 'razorpay';

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_NoireCafeDemo2026';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'demo_secret_key_noire_cafe_987654';

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export const getRazorpayKeyId = (): string => keyId;
export const getRazorpayKeySecret = (): string => keySecret;
