import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

type FooterProps = {
  buttonText: string;
  link: string;
}[];

export const Footer = ({ footerData }: { footerData: FooterProps }) => {
  return (
    <Wrapper>
      {footerData.map((el, index) => {
        return (
          <A key={index} href={el.link} target="_blank">
            {el.buttonText}
          </A>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${Colors.black};
  padding: 12px 0;
`;

const A = styled.a`
  padding: 2px 8px;
  font-size: small;
  color: ${Colors.graySecondary};
  white-space: nowrap;
`;
