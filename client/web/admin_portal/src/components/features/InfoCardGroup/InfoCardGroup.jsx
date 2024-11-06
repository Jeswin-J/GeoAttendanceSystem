import React from 'react';
import './InfoCardGroup.css';
import IconCard from '../../common/IconCard/IconCard';

function InfoCardGroup({cardData}) {

  return (
    <div className='info-card'>
      {cardData.map((card, index) => (
        <IconCard 
          key={index} 
          title={card.title} 
          value={card.value} 
          icon={card.icon} 
        />
      ))}
    </div>
  );
}

export default InfoCardGroup;
