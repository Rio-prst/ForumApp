import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TalkItem from './TalkItem';
import SkeletonItem from './SkeletonItem'; 

function TalksList({ talks }) {
  const loadingBar = useSelector((state) => state.loadingBar);
  const isFetching = loadingBar && loadingBar.default > 0;

  if (isFetching && talks.length === 0) {
    return (
      <div className='talks-list'>
        {[1, 2, 3, 4].map((index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='talks-list'>
      {talks.map((talk) => (
        <TalkItem key={talk.id} {...talk} />
      ))}
    </div>
  );
}

TalksList.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default TalksList;