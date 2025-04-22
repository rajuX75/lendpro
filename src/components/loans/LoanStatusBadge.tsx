import React from 'react';
import Badge from '../ui/Badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface LoanStatusBadgeProps {
  status: 'active' | 'overdue' | 'fully-paid';
}

const LoanStatusBadge: React.FC<LoanStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="primary" size="sm">
          <Clock className="mr-1 h-3 w-3" />
          Active
        </Badge>
      );
    case 'overdue':
      return (
        <Badge variant="danger" size="sm">
          <AlertCircle className="mr-1 h-3 w-3" />
          Overdue
        </Badge>
      );
    case 'fully-paid':
      return (
        <Badge variant="success" size="sm">
          <CheckCircle className="mr-1 h-3 w-3" />
          Paid
        </Badge>
      );
    default:
      return null;
  }
};

export default LoanStatusBadge;