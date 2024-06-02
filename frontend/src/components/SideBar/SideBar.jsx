import React from 'react';
import styled from 'styled-components';
import { FaUser, FaUsers, FaComment, FaSignOutAlt, FaChartLine } from 'react-icons/fa';

const SidebarContainer = styled.div`
    min-width: 220px;
    height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const AgentInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    padding: 20px 20px;
    margin: 20px 0px 0px;
    color: #0A2463;

    h3 {
        margin-left: 10px;
        font-weight: 500;
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: #ccc;
    margin-top: 20px;
`;

const Tabs = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    color: #0A2463;
`;

const Tab = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.active ? '#E6E6E6' : 'inherit'};
    border-radius: 10px;
    padding: 10px 20px;
    margin: 10px 0px;

    span {
        font-size: 1rem;
        padding-left: 10px;
    }
`;

const Sidebar = ({ activeTab, handleTabClick }) => {
    return (
        <SidebarContainer>
            <AgentInfo>
                <FaUser className="tab-icon" />
                <h3>Last Name</h3>
            </AgentInfo>
            <Divider />
            <Tabs>
                <Tab active={activeTab === 'dashboard'} onClick={() => handleTabClick('dashboard')}>
                    <FaChartLine className="tab-icon" />
                    <span>Dashboard</span>
                </Tab>
                <Tab active={activeTab === 'customers'} onClick={() => handleTabClick('customers')}>
                    <FaUsers className="tab-icon" />
                    <span>Customers</span>
                </Tab>
                <Tab active={activeTab === 'interactions'} onClick={() => handleTabClick('interactions')}>
                    <FaComment className="tab-icon" />
                    <span>Interactions</span>
                </Tab>
                <Divider />
                <Tab onClick={() => handleTabClick('logout')}>
                    <FaSignOutAlt className="tab-icon" />
                    <span>Logout</span>
                </Tab>
            </Tabs>
        </SidebarContainer>
    );
};

export default Sidebar;
