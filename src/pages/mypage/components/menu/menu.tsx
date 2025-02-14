import styled from "styled-components";
import { mypageMenuType } from "../..";

interface MenuProps {
  selectedMenu: mypageMenuType;
  onClick: (option: mypageMenuType) => void;
}

const Menu = ({ selectedMenu, onClick }: MenuProps) => {
  return (
    <MenuContainer>
      <Options>
        <Option
          onClick={() => onClick("my stage")}
          $isSelected={selectedMenu === "my stage"}
        >
          My Stage
        </Option>
        <Option
          onClick={() => onClick("배우지원 현황")}
          $isSelected={selectedMenu === "배우지원 현황"}
        >
          배우지원 현황
        </Option>
        <Option
          onClick={() => onClick("공고 스크랩 리스트")}
          $isSelected={selectedMenu === "공고 스크랩 리스트"}
        >
          공고 스크랩 리스트
        </Option>
        <Divider />
        <Option
          onClick={() => onClick("프로필 관리")}
          $isSelected={selectedMenu === "프로필 관리"}
        >
          프로필 관리
        </Option>
        <Divider />
        <Option
          onClick={() => onClick("기본정보 변경")}
          $isSelected={selectedMenu === "기본정보 변경"}
        >
          기본정보 변경
        </Option>
        <Option
          onClick={() => onClick("비밀번호 재설정")}
          $isSelected={selectedMenu === "비밀번호 재설정"}
        >
          비밀번호 재설정
        </Option>
        <Option
          onClick={() => onClick("계정 탈퇴")}
          $isSelected={selectedMenu === "계정 탈퇴"}
        >
          계정 탈퇴
        </Option>
      </Options>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  width: 180px;
  height: 330.56px;
  padding: 12px 16px;
  border: 1px solid #eaebec;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
`;

const Divider = styled.div`
  height: 1px;
  width: 148px;
  background-color: #eaebec;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  padding: 4px 6px;
  cursor: pointer;
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: ${({ $isSelected }) => ($isSelected ? "#b81716" : "black")};
  background-color: white;
  border-radius: 5px;
  font-weight: ${({ $isSelected }) =>
    $isSelected ? "var(--font-semibold)" : "var(--font-regular)"};

  &:hover {
    background-color: #f6f6f6;
  }
`;
