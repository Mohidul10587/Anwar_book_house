import RootLayout from "@/components/layouts/RootLayout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaMoneyBillAlt,
  FaCoins,
  FaClock,
} from "react-icons/fa";
import React from "react";

const Success = ({
  title,
  cus_name,
  cus_email,
  cus_phone,
  pay_status,
  amount,
  currency,
  pay_time,
}) => {
  return (
    <div className="container mx-auto mt-5 border-2 p-5 pt-24 min-h-screen w-1/2">
      <h2 className="text-center text-3xl font-bold mb-5">{title}</h2>
      <div className="flex justify-between p-5 border-t border-b">
        <div className="w-1/2">
          <Row icon={<FaUser />} label="Name" value={cus_name} />
          <Row icon={<FaEnvelope />} label="Email" value={cus_email} />
          <Row icon={<FaPhone />} label="Phone" value={cus_phone} />
        </div>
        <div className="w-1/2">
          <Row icon={<FaCheck />} label="Status" value={pay_status} />
          <Row icon={<FaMoneyBillAlt />} label="Amount" value={amount} />
          <Row icon={<FaCoins />} label="Currency" value={currency} />
          <Row icon={<FaClock />} label="Pay Time" value={pay_time} />
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon, label, value }) => (
  <div className="flex mb-3 items-center">
    <div className="w-1/12 text-end">{icon}</div>
    <div className="w-5/12 text-end">{label}:</div>
    <div className="w-6/12 text-start">{value}</div>
  </div>
);

Success.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Success;
