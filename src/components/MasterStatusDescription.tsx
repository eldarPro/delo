interface StatusProps {
  status: number;
}

const MasterStatusDescription: React.FC<StatusProps> = ({status}) => {

  let title

  if(status == 1) {
    title = 'Вам нужно заполнить резюме, чтобы вы могли работать в этом сервисе'
  } else if (status == 2) {
    title = 'Аккаунт находится в модерации. Как только одобрят ваш профиль, вы станете активным'
  } else if (status == 3) {
    title = 'Аккаунт находится в каталоге'
  }
  return title
};

export default MasterStatusDescription;