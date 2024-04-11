import { IonIcon } from '@ionic/react';
import './RatingIcon.css';
import { starHalfOutline } from 'ionicons/icons';

const RatingIcon: React.FC = () => {
  return (
    <div className='rating_icon_block'>
      <IonIcon icon={starHalfOutline} size="medium"></IonIcon>
    </div>
  );
};

export default RatingIcon;
