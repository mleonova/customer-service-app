/*
  DashboardTab Component
 
  This component renders a simple welcome message within a styled container.
 */

import React from 'react';
import { Container, TableHeader } from '../TabStyles';

const DashboardTab = () => {
    return (
        <Container>
            <TableHeader>
                <h3>&#x1F44B; Welcome to Your Dashboard!</h3>
            </TableHeader>
        </Container>
    );
};

export default DashboardTab;
