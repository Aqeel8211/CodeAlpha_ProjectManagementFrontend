interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const styles: Record<string, string> = {
    Low: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    High: 'bg-red-100 text-red-700 border-red-200',
  };

  const style = styles[priority] || styles.Medium;

  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border ${style}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;