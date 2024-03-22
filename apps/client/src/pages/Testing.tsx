import { userGetFollowingKey } from '@tw/ui/data-access';
import Sticky from 'react-stickynode';

export const TestingPage = () => {
  const handleClick = () => {
    // useResetQuery(
    //   QueryAction.Invalidate,
    //   socialGetPublicProfileFollowersKey(userId)
    // );
    //
    console.log(userGetFollowingKey());
    // useResetQuery(QueryAction.Invalidate, userGetFollowingKey());

    //
    // useResetQuery(QueryAction.Invalidate, publicUserSocialStatsQueryKey(1));
  };
  return (
    <div style={{ height: '200vh', padding: '20rem' }}>
      <Sticky enabled={true} top={50} bottomBoundary={1200}>
        <button onClick={() => handleClick()}>test</button>
      </Sticky>
      ;
    </div>
  );
};
