interface StatusProps {
  status: number;
  className?: string
}

const MasterStatus: React.FC<StatusProps> = ({status, className}) => {

  let title
  let cssClass

  if(status == 1) {
    title = 'В ожидании резюме'
    cssClass = 'pending_status'
  } else if (status == 2) {
    title = 'На модерации'
    cssClass = 'moderation_status'
  } else if (status == 3) {
    title = 'active_status'
  }

  const cssClasses = `${className} ${cssClass}`

  console.log('status', title)

  return (
    <small className={cssClasses}>{title}</small>
  );
};

export default MasterStatus;