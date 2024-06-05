/*
  Sidebar Component
  
  This component represents the sidebar navigation for the application. 
  It includes tabs for navigating to different sections of the application and a logout button.
  
  Props:
  - activeTab: String representing the active tab.
  - handleTabClick: Function to handle tab clicks.
  
  Methods:
  - handleLogout: Function to handle logout actions, removing agent_id from local storage and navigating to the login page.
*/

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { FaUsers, FaComment, FaSignOutAlt, FaChartLine } from 'react-icons/fa';

const SidebarContainer = styled.div`
    min-width: 220px;
    height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
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
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate("/login");
    };

    return (
        <SidebarContainer>
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
                <Tab onClick={() => handleLogout()}>
                    <FaSignOutAlt className="tab-icon" />
                    <span>Logout</span>
                </Tab>
            </Tabs>
        </SidebarContainer>
    );
};

export default Sidebar;
