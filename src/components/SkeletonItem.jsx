import React from 'react';

function SkeletonItem() {
  return (
    <div className='talk-item skeleton-card'>
      <div className='skeleton skeleton-category'></div>
      <div className='skeleton skeleton-title'></div>
      <div className='skeleton skeleton-body'></div>
      <div className='skeleton skeleton-body short'></div>
      <div className='talk-item__footer'>
        <div className='talk-item__user-info'>
          <div className='skeleton skeleton-avatar'></div>
          <div className='skeleton skeleton-text'></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonItem;