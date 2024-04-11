interface StatusProps {
  text: string;
}

const EmptyText: React.FC<StatusProps> = ({text}) => {

  return (
    <div style={{ color: 'gray', marginTop: '40vh', transform: 'translateY(-40%)', textAlign: 'center' }}>{text}</div>
  );
};

export default EmptyText;