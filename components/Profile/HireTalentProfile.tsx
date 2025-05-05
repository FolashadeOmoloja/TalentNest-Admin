"use client";
import Profile from "./Profile";
import ClientProvider from "@/components/Client/ClientProvider";
import { userCompanyObject } from "@/utilities/typeDefs";

const CompanyProfile = ({ user }: { user: userCompanyObject }) => {
  return (
    <ClientProvider>
      <Profile skillsBool={false} user={user} />
    </ClientProvider>
  );
};

export default CompanyProfile;
