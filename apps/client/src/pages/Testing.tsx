import Sticky from 'react-stickynode';

export const TestingPage = () => {
  return (
    <div style={{ height: '200vh', padding: '20rem' }}>
      <Sticky enabled={true} top={50} bottomBoundary={1200}>
        <button>test</button>
      </Sticky>
      ;
    </div>
  );
};
