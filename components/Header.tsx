import styled from "styled-components";
import Link from "next/link";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light_green};
  padding: ${({ theme }) => theme.sizes.xxl}
}
`;

const Nav = styled.nav`
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.sizes.xl};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.sizes.l};
  color: ${({ theme }) => theme.colors.black};
`;
export const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/converter">Converter</NavLink>
      </Nav>
    </HeaderContainer>
  );
};
