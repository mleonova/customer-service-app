/*
  Dashboard Component

  This component renders the main dashboard layout.
  The layout includes a sidebar for navigation and a main content area that switches between different tabs.
*/

import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import DashboardTab from "./Dashboard/DashboardTab";
import CustomerTab from "./Customers/CustomerTab";
import InteractionsTab from "./Interactions/InteractionTab";

const DashboardContainer = styled.div`
    padding: 20px 10px;
    display: flex;
`;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <DashboardContainer>
            <SideBar activeTab={activeTab} handleTabClick={handleTabClick} />
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'customers' && <CustomerTab />}
            {activeTab === 'interactions' && <InteractionsTab />}
        </DashboardContainer>
    );
};

export default Dashboard;
