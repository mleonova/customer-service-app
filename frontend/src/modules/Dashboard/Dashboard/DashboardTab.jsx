import React from 'react';
import styled from 'styled-components';
import TabContainer from '../../../components/Containers/TabContainer';

const TableHeader = styled.div`
    padding: 20px;
    margin: 20px 0px 0px;

    h3 {
        font-weight: 500;
    }
`;

const DashboardTab = () => {
    return (
        <TabContainer>
            <TableHeader>
                <h3>&#x1F44B; Welcome to Your Dashboard!</h3>
            </TableHeader>
        </TabContainer>
    );
};

export default DashboardTab;
